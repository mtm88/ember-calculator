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
        walls: [],
        groundFloors: [],
        windows: [],
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

    add(type, i) {
      const _this = this;
      const room = this.get('rooms').find((room, index) => index === i);
      switch (type) {
        case 'wall': {
          const newWall = {
            fields: [
              {
                name: 'description',
                label: 'Description',
                type: 'text',
                value: '',
              },
              {
                name: 'spaceType',
                label: 'Space type on other side of construction',
                options: [
                  'Outside',
                  'Living room',
                  'Dining room',
                  'Bedsitting room',
                  'Bedroom',
                  'Hall and landing',
                  'Kitchen',
                  'Bathroom',
                  'Toilet',
                  'Unheated space',
                  'Adjoining dwelling',
                ],
                type: 'select',
                value: '',
              },
              {
                name: 'heightOrLength',
                label: 'Height or length (m)',
                type: 'number',
                value: 0,
              },
              {
                name: 'width',
                label: 'Width (m)',
                type: 'number',
                value: 0,
              },
              {
                name: 'construction',
                label: 'Construction',
                options: (async () => {
                  const { constructionOptions } = this.get('model');
                  return constructionOptions.map(field => field.name);
                })(),
                type: 'select',
                value: '',
              },
              {
                name: 'U-value',
                label: 'U-value (W/m2K)',
                type: 'number',
                value: 0,
              },
            ]
          }
          Ember.set(room, 'walls', [...room.walls, newWall]);
          break;
        }
        case 'groundFloor': {
          const newGroundFloor = {
            fields: [
              {
                name: 'shortLength',
                label: 'Short length (m)',
                type: 'number',
                value: 0,
              },
              {
                name: 'longLength',
                label: 'Long length (m)',
                type: 'number',
                value: 0,
              },
              {
                name: 'edgesExposed',
                label: 'Edges exposed',
                type: 'select',
                options: [
                  'One Edge (short)',
                  'One Edge (long)',
                  'Two opposite Edges',
                  'Three Edges (short outer edge)',
                  'Three Edges (long outer edge)',
                ],
                value: '',
              },
              {
                name: 'U-value',
                label: 'U-value (W/m2K)',
                type: 'number',
                value: 0,
              },
            ],
          };
          Ember.set(room, 'groundFloors', [...room.groundFloors, newGroundFloor]);
          break;
        }
        case 'window': {
          const relatedWalls = room.walls;
          const wallDescriptions = relatedWalls.map(wall => wall.fields.find(field => field.name === 'description').value);
          if (relatedWalls && !Ember.isEmpty(relatedWalls) && wallDescriptions) {
            const newWindow = {
              fields: [
                {
                  name: 'typeOfWall',
                  label: 'In which wall/ceiling/door',
                  type: 'select',
                  options: wallDescriptions,
                  value: '',
                },
                {
                  name: 'windowHeight',
                  label: 'Window/door height (m)',
                  type: 'number',
                  value: 0,
                },
                {
                  name: 'windowWidth',
                  label: 'Window/door width (m)',
                  type: 'number',
                  value: 0,
                },
                {
                  name: 'glazingType',
                  label: 'Frame/glazing type',
                  type: 'select',
                  options: [
                    'Wood/PVC Single',
                    'Wood/PVC Double',
                    'Wood/PVC Double, low-E glass',
                    'Wood/PVC Double, low-E glass, argon filled',
                    'Wood/PVC Triple',
                    'Wood/PVC Triple, low-E glass',
                    'Wood/PVC Triple, low-E glass, argon filled',
                    'Metal Single',
                    'Metal Double',
                    'Metal Double, low-E glass',
                    'Metal Double, low-E glass, argon filled',
                    'Metal Triple',
                    'Metal Triple, low-E glass',
                    'Metal Triple, low-E glass, argon filled',
                    'Secondary glazing',
                    'solid wood door (external)',
                    'Solid wood door to unheated corridor',
                  ],
                },
                {
                  name: 'U-value',
                  label: 'U-value (W/m2K)',
                  type: 'number',
                  value: 0,
                },
              ],
            };
            Ember.set(room, 'windows', [...room.windows, newWindow]);
          }
          break;

        }
      }
      return;
    },

    showDetails(i) {
      this.toggleProperty('showDetailsComp');
      this.set('chosenRoom', this.get('rooms')[i]);
    }
  },
});
