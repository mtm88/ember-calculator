import Ember from 'ember';

export default Ember.Component.extend({

  roomFields: Ember.computed.alias('chosenRoom.fields'),
  walls: Ember.computed.alias('chosenRoom.walls'),

  didReceiveAttrs() {
    this.bindFields();
  },

  observeFields: Ember.observer('chosenRoom.fields.@each.value', function observeFields() {
    this.bindFields();
  }),

  bindFields() {
    const roomFields = this.get('roomFields');

    if (roomFields && !Ember.isEmpty(roomFields)) {
      roomFields.forEach((room) => {
        this.set(room.name, room.value);
      });

      const walls = this.get('walls');
      const remappedWalls = [];
      if (walls && !Ember.isEmpty(walls)) {
        walls.forEach((wall, i) => {
          remappedWalls[i] = {};
          wall.fields.forEach((field) => {
            remappedWalls[i][field.name] = field;
          });
        });
      }

      this.set('remappedWalls', remappedWalls);
    }
  },

  ventilationRate: Ember.computed('chosenRoom.fields.@each.value', function ventilationRate() {
    const roomFields = this.get('roomFields');
    const chimneyField = roomFields.find(field => field.name === 'chimneyType');
    const roomType = this.get('roomType');

    if (roomType) {
      if (chimneyField.value === 'No chimney or open fire') {
        const ventilationTable = this.get('ventilationTable');
        if (ventilationTable) {
          return ventilationTable[roomType].VCR.pre2000;
        }
      } else if (chimneyField.value) {
        const alternativeVentRates = this.get('alternativeVentRates');
        if (alternativeVentRates) {
          return Math.max(...alternativeVentRates[chimneyField.value]);
        }
      }
    }
  }),

  DRT: Ember.computed('chosenRoom.fields.@each.value', function DRT() {
    const roomType = this.get('roomType');
    const ventilationTable = this.get('ventilationTable');
    if (roomType && ventilationTable) {
      return ventilationTable[roomType].DRT;
    }
    return null;
  }),

  roomVolume: Ember.computed('chosenRoom.fields.@each.value', function roomVolume() {
    const width = this.get('roomWidth');
    const height = this.get('roomHeight');
    const length = this.get('roomLength');
    if (width && height && length) {
      return width * height * length;
    }
    return null;
  }),

  DTD: Ember.computed('siteInputsConfig.@each.value', function DTD() {
    return this.get('siteInputsConfig').find(field => field.name === 'DETinC').value;
  }),

  heatLoss: Ember.computed('roomVolume', function heatLoss() {
    const roomVolume = this.get('roomVolume');
    const ventilationRate = this.get('ventilationRate');
    const DTD = this.get('DTD');

    if (roomVolume && roomVolume > 0 && ventilationRate && DTD) {
      return Math.round(0.33 * roomVolume * ventilationRate * DTD, 2);
    }
    return 0;
  }),

  ventilationTable: {
    'Living Room': {
      DRT: 21,
      VCR: {
        pre2000: 1.5,
        '2000': 1,
        past2006: 0.5,
      }
    },
    'Dining Room': {
      DRT: 21,
      VCR: {
        pre2000: 1.5,
        '2000': 1,
        past2006: 0.5,
      }
    },
    'Bedsitting Room': {
      DRT: 21,
      VCR: {
        pre2000: 1.5,
        '2000': 1,
        past2006: 0.5,
      }
    },
    'Bedroom': {
      DRT: 18,
      VCR: {
        pre2000: 1,
        '2000': 1,
        past2006: 0.5,
      }
    },
    'Hall and Landing': {
      DRT: 18,
      VCR: {
        pre2000: 2,
        '2000': 1,
        past2006: 0.5,
      }
    },
    'Kitchen': {
      DRT: 18,
      VCR: {
        pre2000: 2,
        '2000': 1.5,
        past2006: 1.5,
      }
    },
    'Bathroom': {
      DRT: 22,
      VCR: {
        pre2000: 3,
        '2000': 1.5,
        past2006: 0.5,
      }
    },
    'Toilet': {
      DRT: 18,
      VCR: {
        pre2000: 3,
        '2000': 1.5,
        past2006: 1.5,
      }
    },
  },

  alternativeVentRates: {
    'Without throat restrictor fitted to flue': [5, 4],
    'With throat restrictor fitted to flue': [3, 2],
  },

});
