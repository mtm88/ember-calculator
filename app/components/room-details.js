import Ember from 'ember';

export default Ember.Component.extend({

  roomFields: Ember.computed.alias('room.fields'),
  walls: Ember.computed.alias('room.walls'),
  groundFloors: Ember.computed.alias('room.groundFloors'),
  windows: Ember.computed.alias('room.windows'),

  didReceiveAttrs() {
    this.bindFields();
  },

  observeFields: Ember.observer('roomFields.@each.value', function observeFields()
  {
    this.bindFields();
  }),

  bindFields() {
    const roomFields = this.get('roomFields');

    if (roomFields && !Ember.isEmpty(roomFields)) {
      roomFields.forEach((room) => {
        this.set(room.name, room.value);
      });
    }
  },

  ventilationRate: Ember.computed('room.fields.@each.value', function ventilationRate()
  {
    const roomFields = this.get('roomFields');
    const chimneyField = roomFields.find(field => field.name === 'chimneyType');
    const roomType = this.get('roomType');

    if (roomType) {
      const { ventilationTable, altVentRates } = this.get('model');

      if (chimneyField.value === 'No chimney or open fire') {

        if (ventilationTable) {
          return ventilationTable[roomType].VCR.pre2000;
        }

      }
      else if (chimneyField.value) {

        if (altVentRates) {
          return Math.max(...altVentRates[chimneyField.value]);
        }

      }
    }
  }),

  DRT: Ember.computed('room.fields.@each.value', function DRT()
  {
    const roomType = this.get('roomType');

    const { ventilationTable } = this.get('model');

    if (roomType.length > 0 && ventilationTable) {
      return parseInt(ventilationTable[roomType].DRT, 10);
    }

    return null;
  }),

  roomVolume: Ember.computed('room.fields.@each.value', function roomVolume()
  {
    const width = this.get('roomWidth');
    const height = this.get('roomHeight');
    const length = this.get('roomLength');

    if (width && height && length) {
      return width * height * length;
    }

    return null;
  }),

  DTD: Ember.computed('siteInputsConfig.@each.value', 'ventilationRate', function DTD()
  {
    const DRT = this.get('DRT');
    const DETinC = this.get('siteInputsConfig').find(field => field.name === 'DETinC').value;

    if (DRT && DETinC) {
      return DRT - DETinC;
    }

    return null;
  }),

  heatLoss: Ember.computed('roomVolume', function heatLoss()
  {
    const roomVolume = this.get('roomVolume');
    const ventilationRate = this.get('ventilationRate');
    const DTD = this.get('DTD');

    if (roomVolume && roomVolume > 0 && ventilationRate && DTD) {
      return Math.round(0.33 * roomVolume * ventilationRate * DTD, 2);
    }

    return 0;
  }),

  combinedHeatLoss: Ember.computed(
    'roomVolume',
    'walls.@each.heatLoss',
    'groundFloors.@each.heatLoss',
    'windows.@each.heatLoss',
    function combinedHeatLoss()
    {
      let totalHeatLoss = 0;
      const roomHeatLoss = this.get('heatLoss');

      let wallsHeatLoss = 0;
      let groundFloorsHeatLoss = 0;
      let windowsHeatLoss = 0;

      this.get('walls').forEach(wall => !isNaN(wall.heatLoss) ? wallsHeatLoss += wall.heatLoss : null);
      this.get('groundFloors').forEach(groundFloor => !isNaN(groundFloor.heatLoss) ? wallsHeatLoss += groundFloor.heatLoss : null);
      this.get('windows').forEach(window => !isNaN(window.heatLoss) ? wallsHeatLoss += window.heatLoss : null);

      return roomHeatLoss + wallsHeatLoss + groundFloorsHeatLoss + windowsHeatLoss;
  }),

});
