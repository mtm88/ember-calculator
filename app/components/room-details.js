import Ember from 'ember';

export default Ember.Component.extend({

  roomFields: Ember.computed.alias('room.fields'),
  walls: Ember.computed.alias('room.walls'),
  groundFloors: Ember.computed.alias('room.groundFloors'),
  windows: Ember.computed.alias('room.windows'),

  ventilationRate: Ember.observer('roomFields.@each.value', function ventilationRate()
  {
    const roomFields = this.get('roomFields');
    const chimneyField = roomFields.find(field => field.name === 'chimneyType').value;
    const roomType = roomFields.find(field => field.name === 'roomType').value;

    if (roomType) {
      // define at which index in the array is the 'ventRate' property we want to set
      const ventRateIndex = roomFields.findIndex(field => field.name === 'ventilationRate');
      const ventRateField = roomFields.objectAt(ventRateIndex);

      const { ventilationTable, altVentRates } = this.get('model');

      if (chimneyField === 'No chimney or open fire') {

        if (ventilationTable) {
          Ember.set(ventRateField, 'value', ventilationTable[roomType].VCR.pre2000);
        }

      }
      else if (chimneyField) {

        if (altVentRates) {
          Ember.set(ventRateField, 'value', Math.max(...altVentRates[chimneyField]));
        }

      }
    }
  }),

  DRT: Ember.observer('roomFields.@each.value', function DRT()
  {
    const roomFields = this.get('roomFields');

    const roomType = roomFields.find(field => field.name === 'roomType').value;
    const { ventilationTable } = this.get('model');

    if (roomType && ventilationTable) {
      // define at which index in the array is the 'DRT' property we want to set
      const roomTypeIndex = roomFields.findIndex(field => field.name === 'DRT');
      const roomTypeField = roomFields.objectAt(roomTypeIndex);

      Ember.set(roomTypeField, 'value', parseInt(ventilationTable[roomType].DRT, 10));
    }

  }),

  roomVolume: Ember.observer('roomFields.@each.value', function roomVolume()
  {
    const roomFields = this.get('roomFields');

    const width = roomFields.find(field => field.name === 'roomWidth').value;
    const height = roomFields.find(field => field.name === 'roomHeight').value;
    const length = roomFields.find(field => field.name === 'roomLength').value;

    if (width && height && length) {
      // define at which index in the array is the 'roomVolume' property we want to set
      const roomVolIndex = roomFields.findIndex(field => field.name === 'roomVolume');
      const roomVolField = roomFields.objectAt(roomVolIndex);

      Ember.set(roomVolField, 'value', width * height * length);
    }

  }),

  DTD: Ember.observer(
    'roomFields.@each.value',
    'siteInputsConfig.@each.value',
    'ventilationRate',
    function DTD()
    {
    const roomFields = this.get('roomFields');

    const DRT = roomFields.find(field => field.name === 'DRT').value;
    const DETinC = this.get('siteInputsConfig').find(field => field.name === 'DETinC').value;

    if (DRT && DETinC) {
      // define at which index in the array is the 'DTD' property we want to set
      const DTDIndex = roomFields.findIndex(field => field.name === 'DTD');
      const DTDField = roomFields.objectAt(DTDIndex);

      Ember.set(DTDField, 'value', DRT - DETinC);
    }

  }),

  heatLoss: Ember.observer('roomFields.@each.value', function heatLoss()
  {
    const room = this.get('room');
    const roomFields = this.get('roomFields');

    const roomVolume = roomFields.find(field => field.name === 'roomVolume').value;
    const DTD = roomFields.find(field => field.name === 'DTD').value;
    const ventilationRate = roomFields.find(field => field.name === 'ventilationRate').value;

    if (!isNaN(roomVolume) && !isNaN(ventilationRate) && !isNaN(DTD)) {
      // define at which index in the array is the 'heatLoss' property we want to set
      const heatLossIndex = roomFields.findIndex(field => field.name === 'heatLoss');
      const heatLossField = roomFields.objectAt(heatLossIndex);

      // set it also as top level prop so we don't need to observe with double @each from parent
      Ember.set(room, 'heatLoss', Math.round(0.33 * roomVolume * ventilationRate * DTD, 2));
      Ember.set(heatLossField, 'value', Math.round(0.33 * roomVolume * ventilationRate * DTD, 2));
    }

  }),

  isConvOrRad: Ember.observer('roomFields.@each.value', function isConvOrRad() {
    const room = this.get('room');
    const roomFields = this.get('roomFields');

    const emitterType = roomFields.find(field => field.name === 'emitterType').value;

    if (emitterType === 'Convector' || emitterType === 'Radiator') {
      // we need that property to calculate emitter size in spec
      Ember.set(room, 'isConvOrRad', true);
      Ember.set(room, 'emitterType', emitterType);
    }

  }),

  combinedHeatLoss: Ember.computed(
    'roomFields.@each.value',
    'walls.@each.heatLoss',
    'groundFloors.@each.heatLoss',
    'windows.@each.heatLoss',
    function combinedHeatLoss()
    {
      const room = this.get('room');
      const roomFields = this.get('roomFields');

      const roomHeatLoss = roomFields.find(field => field.name === 'heatLoss').value;

      let wallsHeatLoss = 0;
      let groundFloorsHeatLoss = 0;
      let windowsHeatLoss = 0;

      this.get('walls').forEach(wall => !isNaN(wall.heatLoss) ? wallsHeatLoss += wall.heatLoss : null);
      this.get('groundFloors').forEach(groundFloor => !isNaN(groundFloor.heatLoss) ? wallsHeatLoss += groundFloor.heatLoss : null);
      this.get('windows').forEach(window => !isNaN(window.heatLoss) ? wallsHeatLoss += window.heatLoss : null);

      // set it also as top level prop so we don't need to observe with double @each from parent
      Ember.set(room, 'combinedHeatLoss', roomHeatLoss + wallsHeatLoss + groundFloorsHeatLoss + windowsHeatLoss);

      return roomHeatLoss + wallsHeatLoss + groundFloorsHeatLoss + windowsHeatLoss;
  }),

});
