import Ember from 'ember';

export default Ember.Component.extend({

  roomFields: Ember.computed.alias('chosenRoom.fields'),

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
