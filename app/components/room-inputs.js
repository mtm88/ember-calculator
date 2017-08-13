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
                  const { constructionOptions } = await Ember.$.getJSON('/constructionOpts.json');
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

  // constructionOptions: [
  //   {
  //     name: 'Brick 102 mm, plaster',
  //     value: 2.97,
  //   },
  //   {
  //     name: 'Brick 228 mm, plaster',
  //     value: 2.11,
  //   },
  //   {
  //     name: 'Brick 343 mm, plaster',
  //     value: 1.64,
  //   },
  // 'Stone 305mm (12in)',
  // 'Stone 457mm (18in)',
  // 'Stone 610mm (24 in)',
  // 'Concrete 102mm, plaster',
  // 'Concrete 152mm, plaster',
  // 'Concrete 204mm, plaster',
  // 'Concrete 254 mm, plaster',
  // 'Render 19mm, high performance aerated block (k=0.11) 215mm, 13mm plaster',
  // 'Tiles, airspace, high performance aerated block, 215mm, 13mm plaster',
  // 'Brick 102mm, cavity, brick 102mm, 13mm plaster',
  // 'Brick 102mm, cavity, brick 102mm, 12.5mm plasterboard on dab',
  // 'Brick 102mm, 50mm  mineral slab, brick 102mm, 13mm plaster',
  // 'Brick 102mm, 50mm mineral slab, brick 102mm, 12.5mm plasterboard on dabs',
  // 'Brick 102mm, cavity, 100mm standard aerated block (k=0.17), 13mm plaster',
  // 'Brick 102mm, cavity, 125mm standard aerated block (k=0.17), 13mm plaster',
  // 'Brick 102mm, cavity, 100mm standard aerated block (k=0.17), 12.5mm plasterboard on dabs',
  // 'Brick 102mm, cavity, 125mm standard aerated block (k=0.17), 12.5mm plasterboard on dabs',
  // 'Brick 102mm, mineral wool slab in cavity 50mm, 100mm standard aerated block (k=0.17), 13mm plaster',
  // 'Brick 102mm, mineral wool slab in cavity 50mm, 120mm standard aerated block (k=0.17), 13mm plaster',
  // 'Brick 102mm, mineral wool slab in cavity 50mm,100mm standard aerated block (k=0.17), 12.5mm plasterboard on dabs',
  // 'Brick 102mm, mineral wool slab in cavity 50mm,125mm standard aerated block (k=0.17), 12.5mm plasterboard on dabs',
  // 'Brick 102mm, cavity, 100mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Brick 102mm, cavity, 125mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Brick 102mm, cavity, 100mm high performance aerated block (k=0.11), 12.5mm plasterboard on dabs',
  // 'Brick 102mm, cavity, 125mm high performance aerated block (k=0.11), 12.5mm plasterboard on dabs',
  // 'Brick 102mm, mineral wool slab in cavity 50mm, 100mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Brick 102mm, mineral wool slab in cavity 50mm, 120mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Brick 102mm, mineral wool slab in cavity 50mm,100mm high performance aerated block (k=0.11), 12.5mm plasterboard on dabs',
  // 'Brick 102mm, mineral wool slab in cavity 50mm,125mm high performance aerated block (k=0.11), 12.5mm plasterboard on dabs',
  // 'Render 19mm, brick 102mm, cavity, brick 102mm, 13mm plaster',
  // 'Render 19mm, brick 102mm, 50mm mineral wool slab,  brick 102mm, 13mm plaster',
  // 'Render 19mm, brick 102mm, cavity, brick 102mm, 12.5mm plasterboard on dabs',
  // 'Render 19mm, brick 102mm, 50mm mineral wool slab, brick 102mm, 12.5mm plasterboard on dabs',
  // 'Render 19mm, brick 102mm, cavity, 100mm standard aerated block, 13mm plaster',
  // 'Render 19mm, brick 102mm, cavity, 125mm standard aerated block, 13mm plaster',
  // 'Render 19mm, brick 102mm, mineral wool slab in cavity 50mm, 100mm standard aerated block, 13mm plaster',
  // 'Render 19mm, brick 102mm, mineral wool slab in cavity 50mm, 125mm standard aerated block, 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, cavity, 100mm standard aerated block, 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, cavity, 125mm standard aerated block, 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, mineral wool slab in cavity 50mm, 100mm standard aerated block, 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, mineral wool slab in cavity 50mm, 125mm standard aerated block, 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, cavity, 100mm  high performance aerated block (k=0.11), 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, cavity, 125mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, mineral wool slab in cavity 50mm, 100mm  high performance aerated block (k=0.11), 13mm plaster',
  // 'Render 19mm, standard aerated block 100mm, mineral wool slab in cavity 50mm, 125mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Tiles, airspace, standard aerated block 100mm, 13mm plaster',
  // 'Tiles, airspace, standard aerated block 125mm, 13mm plaster',
  // 'Tiles, airspace, standard aerated block 100mm, mineral wool slab in cavity 50mm, 100mm standard aerated block, 13mm plaster',
  // 'Tiles, airspace, standard aerated block 100mm, mineral wool slab in cavity 50mm, 120mm standard aerated block, 13mm plaster',
  // 'Tiles, airspace, standard aerated block 100mm, cavity, 100mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Tiles, airspace, standard aerated block 100mm, cavity, 125mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Tiles, airspace, standard aerated block 100mm, mineral wool slab in cavity 50mm, 100mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Tiles, airspace, standard aerated block 100mm, mineral wool slab in cavity 50mm, 125mm high performance aerated block (k=0.11), 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 100mm, cavity, standard aerated block 100mm, 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 100mm, cavity, standard aerated block 125mm, 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 100mm, mineral wool slab in cavity 50mm, standard aerated block 100mm, 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 100mm, mineral wool slab in cavity 50mm, standard aerated block 125mm, 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 100mm, cavity, 100mm high performance block (K=0.11), 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 100mm, cavity, 125mm high performance block (K=0.11), 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 125mm, mineral wool slab in cavity 50mm, 100mm high performance block (K=0.11), 13mm plaster',
  // 'Shiplap boards, airspace, standard aerated block 100mm, mineral wool slab in cavity 50mm, 125mm high performance block (K=0.11), 13mm plaster',
  // 'Brick 102.5mm, cavity, membrane, plywood 10mm, studding 100mm, with infill insulation 60mm, vapour membrane, plasterboard 12.5mm',
  // 'Brick 102.5mm, cavity, membrane, plywood 10mm, studding 100mm, with infill insulation 80mm, vapour membrane, plasterboard 12.5mm',
  // 'Brick 102.5mm, cavity, membrane, plywood 10mm, studding 100mm, with infill  insulation 80mm, vapour membrane, plasterboard 12.5mm',
  // 'Tiles, airspace, cavity, membrane, plywood 10mm, studding 100mm, with infill insulation 60mm, vapour membrane, plasterboard 12.5mm',
  // 'Tiles, airspace, cavity, membrane, plywood 10mm, studding 100mm, with infill insulation 80mm, vapour membrane, plasterboard 12.5mm',
  // 'Tiles, airspace, cavity, membrane, plywood 10mm, studding 100mm, with infill  insulation 80mm, vapour membrane, plasterboard 12.5mm',
  // 'shiplap boards, airspace, cavity, membrane, plywood 10mm, studding 100mm, with infill insulation 60mm, vapour membrane, plasterboard 12.5mm',
  // 'shiplap boards, airspace, cavity, membrane, plywood 10mm, studding 100mm, with infill insulation 80mm, vapour membrane, plasterboard 12.5mm',
  // 'shiplap boards, airspace, cavity, membrane, plywood 10mm, studding 100mm, with infill  insulation 80mm, vapour membrane, plasterboard 12.5mm',
  // 'Plasterboard 12.5mm, studding 75mm, plasterboard 12.5mm',
  // 'Plaster 13mm, block 10mm, cavity, block 100mm, plaster 13mm',
  // 'Plaster 13mm, brick 102.5mm, plaster 13mm',
  // 'Plaster 13mm, brick 215mm, plaster 13mm',
  // 'Plaster, breeze block 100mm, plaster',
  // 'Plaster 13mm, standard aerated block 100mm, plaster 13mm',
  // 'Plaster 13mm, standard aerated block 125mm, plaster 13mm',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, no insulation, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 50mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 100mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 200mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 300mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, , ventilated air space, no insulation, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, , ventilated air space, 50mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, , ventilated air space, 100mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, , ventilated air space, 200mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, , ventilated air space, 300mm insulation between joists, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 50mm insulation between rafters, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 100mm insulation between rafters, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 200mm insulation between rafters, 9.5 mm plasterboard',
  // 'Pitched roof - Slates or tiles, sarking felt, ventilated air space, 300mm insulation between rafters, 9.5 mm plasterboard',
  // 'Chippings, 3 layers of felt, boarding, air space, no insulation, 9.5 mm plasterboard',
  // 'Chippings, 3 layers of felt, boarding, air space, 50mm insulation, 9.5 mm plasterboard',
  // 'Chippings, 3 layers of felt, boarding, air space, 100mm insulation, 9.5 mm plasterboard',
  // 'Chippings, 3 layers of felt, boarding, air space, 200mm insulation, 9.5 mm plasterboard',
  // 'Chippings, 3 layers of felt, boarding, air space, 300insulation, 9.5 mm plasterboard',
  // 'Boarding 19mm, airspace between joists, no insulation, 6mm sheeting - heat flow downward exposed to outside air or unheated space',
  // 'Boarding 19mm, airspace between joists, 100mm insulation, 6mm sheeting - heat flow downward exposed to outside air or unheated space',
  // 'Boarding 19mm, airspace between joists, 150mm insulation, 6mm sheeting - heat flow downward exposed to outside air or unheated space',
  // 'Screed 50mm, concrete slab 150mm, no insulation between battens, 6mm sheeting, heat flow downward - exposed to outside air or unheated space',
  // 'Screed 50mm, concrete slab 150mm, 100mm insulation between battens, 6mm sheeting, heat flow downward - exposed to outside air or unheated space',
  // 'Intermediate floors, boarding 19mm, airspace between joists, 9.5mm plasterboard heat flow upward',
  // 'Intermediate floors, boarding 19mm, airspace 100mm insulation between joists, 9.5mm plasterboard heat flow upward',
  // 'Intermediate floors, boarding 19mm, airspace between joists, 9.5mm plasterboard heat flow downward',
  // 'Intermediate floors, boarding 19mm, airspace 100mm insulation between joists, 9.5mm plasterboard heat flow downward',
  // ],
});
