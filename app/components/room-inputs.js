import Ember from 'ember';

export default Ember.Component.extend({

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
            emiterSpec: true,
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
            emiterSpec: true,
          },
          {
            name: 'temperatureFactor',
            label: 'Temperature factor (convectors only)',
            value: 0.85,
            type: 'constant',
            emiterSpec: false,
          },
          {
            name: 'n-coefficient',
            label: 'n-coefficient (radiators only)',
            value: 1.30,
            type: 'constant',
            emiterSpec: false,
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
            emiterSpec: false,
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
            emiterSpec: false,
          },
          {
            name: 'floorTOGvalue',
            label: 'Floor TOG value (underfloor only)',
            value: 0.25,
            type: 'constant',
            emiterSpec: false,
          },
          {
            name: 'activeFloorArea',
            label: 'Active floor area in m² (underfloor only)',
            value: 0,
            type: 'number',
            emiterSpec: false,
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
            emiterSpec: false,
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
            emiterSpec: false,
          },
          {
            name: 'roomLength',
            label: 'Room Length',
            type: 'text',
            value: '',
            emiterSpec: false,
          },
          {
            name: 'roomWidth',
            label: 'Room Width',
            type: 'text',
            value: '',
            emiterSpec: false,
          },
          {
            name: 'roomHeight',
            label: 'Room Height',
            type: 'text',
            value: '',
            emiterSpec: false,
          },
          {
            name: 'roomVolume',
            label: 'Room Volume',
            type: 'constant',
            value: 0,
            emiterSpec: false,
          },
          {
            name: 'ventilationRate',
            label: 'Design room ventilation rate (air changes per hour)',
            type: 'constant',
            value: 0,
            emiterSpec: false,
          },
          {
            name: 'DRT',
            label: 'Design room temperature °C',
            type: 'constant',
            value: 0,
            emiterSpec: true,
          },
          {
            name: 'DTD',
            label: 'Design temperature difference',
            type: 'constant',
            value: 0,
            emiterSpec: false,
          },
          {
            name: 'heatLoss',
            label: 'Heat loss (W)',
            type: 'constant',
            value: 0,
            emiterSpec: true,
          },

        ],
      });
    },

    add(type, i) {
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
                  'Living Room',
                  'Dining Room',
                  'Bedsitting Room',
                  'Bedroom',
                  'Hall and Landing',
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
                options: (() => {
                  const { constructionOptions } = this.get('model');
                  return constructionOptions.map(field => field.name);
                })(),
                type: 'select',
                value: '',
              },
              {
                name: 'U-value',
                label: 'U-value',
                type: 'number',
                value: 0,
              },
              {
                label: 'area',
                name: 'area',
                type: 'constant',
                value: 0,
              },
              {
                name: 'DTD',
                label: 'Design temperature difference',
                type: 'constant',
                value: 0,
              },
              {
                name: 'heatLoss',
                label: 'Heat loss (W)',
                type: 'constant',
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
                options: (() => {
                  const { edgesExposed } = this.get('model');
                  return edgesExposed.map(field => field.name);
                })(),
                value: '',
              },
              {
                name: 'insulationType',
                label: 'Insulation type and thickness',
                type: 'select',
                options: (() => {
                  const { insulationTypeThickness } = this.get('model');
                  return insulationTypeThickness.map(field => field.name);
                })(),
              },
              {
                name: 'U-value',
                label: 'U-value (W/m2K)',
                type: 'number',
                value: 0,
              },
              {
                label: 'area',
                name: 'area',
                type: 'constant',
                value: 0,
              },
              {
                name: 'DTD',
                label: 'Design temperature difference',
                type: 'constant',
                value: 0,
              },
              {
                name: 'edge',
                label: 'Edge value',
                type: 'constant',
                value: 0,
              },
              {
                name: 'insulation',
                label: 'Insulation',
                type: 'constant',
                value: 0,
              },
              {
                name: 'column',
                label: 'Column',
                type: 'constant',
                value: 0,
              },
              {
                name: 'heatLoss',
                label: 'Heat Loss',
                type: 'constant',
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
                  options: this.get('model.windowsDoors').map(windowDoor => windowDoor.name),
                },
                {
                  name: 'U-value',
                  label: 'U-value',
                  type: 'number',
                  value: 0,
                },
                {
                  name: 'wall-U-value',
                  label: 'Wall/roof U-value (W/m²K)',
                  type: 'constant',
                  value: 0,
                },
                {
                  label: 'area',
                  name: 'area',
                  type: 'constant',
                  value: 0,
                },
                {
                  name: 'DTD',
                  label: 'Design temperature difference',
                  type: 'constant',
                  value: 0,
                },
                {
                  name: 'heatLoss',
                  label: 'Heat Loss',
                  type: 'constant',
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
