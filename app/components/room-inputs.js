import Ember from 'ember';

export default Ember.Component.extend({

  showDetailsComp: false,
  chosenRoom: null,

  actions: {
    addRoom() {
      const rooms = this.get('rooms');
      const currentRoomsCount = rooms.length;
      rooms.pushObject({
        name: `Room ${currentRoomsCount + 1}`,
        fields: [
          {
            name: 'roomName',
            label: 'Room Name',
            type: 'text',
            value: 'Default room name',
          },
          {
            name: 'emitterType',
            label: 'Emitter type',
            options: [
              'Underfloor heating (UFH)',
              'Convector',
              'Radiator'
            ],
            type: 'select',
            value: '',
          },
          {
            name: 'temperatureFactor',
            label: 'Temperature factor (convectors only)',
            value: 0.85,
            type: 'constant',
          },
          {
            name: 'n-coefficient',
            label: 'n-coefficient (radiators only)',
            value: 1.30,
            type: 'constant',
          },
          {
            name: 'floorSurfaceType',
            label: 'Floor surface type or temperature limit (°C) [underfloor only]',
            options: [
              'Peripheral Zones',
              'Normally occupied space',
              'Vinyl floor finish',
            ],
            type: 'select',
            value: '',
          },
          {
            name: 'floorConstruction',
            label: 'Floor construction (underfloor only)',
            options: [
              'Floating screed floor',
              'Floating dry floor inc. 18mm chipboard',
              'Floating dry floor inc. 18mm gypsum fibreboard',
            ],
            type: 'select',
            value: '',
          },
          {
            name: 'floorTOGvalue',
            label: 'Floor TOG value (underfloor only)',
            value: 0.25,
            type: 'constant',
          },
          {
            name: 'activeFloorArea',
            label: 'Active floor area in m² (underfloor only)',
            value: 0,
            type: 'number',
          },
          {
            name: 'roomType',
            label: 'Room Type',
            options: [
              'Living Room',
              'Dining Room',
              'Bedsitting Room',
              'Bedroom',
              'Hall and Landing',
              'Kitchen',
              'Bathroom',
              'Toilet',
            ],
            type: 'select',
            value: '',
          },
          {
            name: 'chimneyType',
            label: 'Chimney Type',
            options: [
              'No chimney or open fire',
              'Without throat restrictor fitted to flue',
              'With throat restrictor fitted to flue',
            ],
            type: 'select',
            value: '',
          },
          {
            name: 'roomLength',
            label: 'Room Length',
            type: 'text',
            value: '',
          },
          {
            name: 'roomWidth',
            label: 'Room Width',
            type: 'text',
            value: '',
          },
          {
            name: 'roomHeight',
            label: 'Room Height',
            type: 'text',
            value: '',
          },

        ],
      });
    },

    showDetails(i) {
      this.toggleProperty('showDetailsComp');
      this.set('chosenRoom', this.get('rooms')[i]);
    }
  },

});
