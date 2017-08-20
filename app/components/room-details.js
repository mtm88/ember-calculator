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

    // this.remapWalls();
    // this.remapGroundFloors();
    this.remapWindows();

  },

  // remapWalls() {
  //   const walls = this.get('walls');
  //   const remappedWalls = [];
  //   if (walls && !Ember.isEmpty(walls)) {
  //     walls.forEach((wall) => {
  //       const mappedWall = new Ember.Object();
  //       wall.fields.forEach((field) => {
  //         mappedWall[field.name] = field;
  //       });
  //       remappedWalls.pushObject(mappedWall);

  //       this.set('remappedWalls', remappedWalls);
  //     });
  //   }

  // },

  // remapGroundFloors() {
  //   const groundFloors = this.get('groundFloors');
  //   const remappedGroundFloors = [];

  //   if (groundFloors && !Ember.isEmpty(groundFloors)) {
  //     groundFloors.forEach((groundFloor) => {
  //       const mappedGroundFloor = new Ember.Object();
  //       groundFloor.fields.forEach((field) => {
  //         mappedGroundFloor[field.name] = field;
  //       });
  //       remappedGroundFloors.pushObject(mappedGroundFloor);

  //       this.set('remappedGroundFloors', remappedGroundFloors);
  //     });
  //   }

  // },

  remapWindows() {
    const windows = this.get('windows');
    const remappedWindows = [];

    if (windows && !Ember.isEmpty(windows)) {
      windows.forEach((window) => {
        const mappedWindow = new Ember.Object();
        window.fields.forEach((field) => {
          mappedWindow[field.name] = field;
        });
        remappedWindows.pushObject(mappedWindow);

        this.set('remappedWindows', remappedWindows);
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
    function combinedHeatLoss()
    {
  }),

});
