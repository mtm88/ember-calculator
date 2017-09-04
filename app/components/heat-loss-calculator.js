import Ember from 'ember';

export default Ember.Component.extend({

  rooms: [],
  selectedDFT: null,
  totalRadConv: null,

  // Define currently active tab for template conditionals needs
  currentInputTab: 'roomInputs', // siteInputs
  currentResultsTab: 'emitterSpecifications', //certificate

  // define which tab to show between Site Inputs and Room Inputs
  siteInputsTab: Ember.computed.equal('currentInputTab', 'siteInputs'),
  roomInputTab: Ember.computed.equal('currentInputTab', 'roomInputs'),

  // define which tab to show between Certificate Tab and Emitter Specification Tab
  certificateTab: Ember.computed.equal('currentResultsTab', 'certificate'),
  emitterSpecTab: Ember.computed.equal('currentResultsTab', 'emitterSpecifications'),

  actions: {
    setTab(tabType, chosenTab) {
      this.set(tabType, chosenTab);
    },

    setupDemo() {
      // push a pre-defined room from XML example to rooms array 
      this.get('rooms').pushObject({
        name: `Room 0`,
        walls: [{
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              value: 'External wall',
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
              value: 'Outside',
            },
            {
              name: 'heightOrLength',
              label: 'Height or length (m)',
              type: 'number',
              value: 2.4,
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
              value: ''
            },
            {
              name: 'U-value',
              label: 'U-value',
              type: 'number',
              value: 0.2,
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
        },
        {
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              value: 'External wall',
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
              value: 'Outside',
            },
            {
              name: 'heightOrLength',
              label: 'Height or length (m)',
              type: 'number',
              value: 2.4,
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
              value: ''
            },
            {
              name: 'U-value',
              label: 'U-value',
              type: 'number',
              value: 0.2,
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
        ],
        groundFloors: [
          {
            fields: [
              {
                name: 'shortLength',
                label: 'Short length (m)',
                type: 'number',
                value: 5,
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
                value: 'Two adjacent edges',
              },
              {
                name: 'insulationType',
                label: 'Insulation type and thickness',
                type: 'select',
                options: (() => {
                  const { insulationTypeThickness } = this.get('model');
                  return insulationTypeThickness.map(field => field.name);
                })(),
                value: 'Solid floor - Enter a U-value',
              },
              {
                name: 'U-value',
                label: 'U-value (W/m2K)',
                type: 'number',
                value: 0.15,
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
          }
        ],
        windows: [
          {
            fields: [
              {
                name: 'typeOfWall',
                label: 'In which wall/ceiling/door',
                type: 'select',
                options: [
                  'External Wall',
                  'External Wall',
                ],
                value: 'External Wall',
              },
              {
                name: 'windowHeight',
                label: 'Window/door height (m)',
                type: 'number',
                value: 0.9,
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
                value: 'Wood/PVC Triple',
              },
              {
                name: 'U-value',
                label: 'U-value',
                type: 'number',
                value: 2.1,
              },
              {
                name: 'wall-U-value',
                label: 'Wall/roof U-value (W/m²K)',
                type: 'constant',
                value: 0.37,
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
          },
        ],
        reqEmitterSize: null,
        fields: [
          {
            name: 'roomName',
            label: 'Room Name',
            type: 'text',
            value: 'Kitchen',
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
            value: 'Underfloor heating (UFH)',
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
              'Specify Maximum Floor Surface Temperature (°C) - Overwrite here',
            ],
            type: 'select',
            value: 'Specify Maximum Floor Surface Temperature (°C) - Overwrite here',
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
            value: 'Floating screed floor',
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
            value: 25,
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
            value: 'Kitchen',
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
            value: 'No chimney or open fire',
            emiterSpec: false,
          },
          {
            name: 'roomLength',
            label: 'Room Length',
            type: 'text',
            value: 5,
            emiterSpec: false,
          },
          {
            name: 'roomWidth',
            label: 'Room Width',
            type: 'text',
            value: 5,
            emiterSpec: false,
          },
          {
            name: 'roomHeight',
            label: 'Room Height',
            type: 'text',
            value: 0,
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
          {
            name: 'radSurfFinFactor',
            value: 1,
            emiterSpec: true,
          },
          {
            name: 'radEncFactor',
            value: 1,
            emiterSpec: true,
          },
          {
            name: 'nCoefficient',
            value: 1.3,
            emiterSpec: true,
          },
          {
            name: 'convTempFactor',
            value: 0.85,
            emiterSpec: true,
          },
          {
            name: 'radTempFactor',
            value: '',
            emiterSpec: true,
          },
        ],
      });

      this.get('rooms').pushObject({
        name: `Room 1`,
        walls: [{
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              value: 'External wall',
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
              value: 'Outside',
            },
            {
              name: 'heightOrLength',
              label: 'Height or length (m)',
              type: 'number',
              value: 2.4,
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
              value: ''
            },
            {
              name: 'U-value',
              label: 'U-value',
              type: 'number',
              value: 0.3,
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
        },
        {
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              value: 'External wall',
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
              value: 'Outside',
            },
            {
              name: 'heightOrLength',
              label: 'Height or length (m)',
              type: 'number',
              value: 2.4,
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
              value: ''
            },
            {
              name: 'U-value',
              label: 'U-value',
              type: 'number',
              value: 0.3,
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
        },
        {
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              value: 'Internal wall',
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
              value: 'Kitchen',
            },
            {
              name: 'heightOrLength',
              label: 'Height or length (m)',
              type: 'number',
              value: 2.4,
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
              value: 'Plasterboard 12.5mm, studding 75mm, plasterboard 12.5mm'
            },
            {
              name: 'U-value',
              label: 'U-value',
              type: 'number',
              value: 1.72,
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
        ],
        groundFloors: [
          {
            fields: [
              {
                name: 'shortLength',
                label: 'Short length (m)',
                type: 'number',
                value: 3,
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
                value: 'Two adjacent edges',
              },
              {
                name: 'insulationType',
                label: 'Insulation type and thickness',
                type: 'select',
                options: (() => {
                  const { insulationTypeThickness } = this.get('model');
                  return insulationTypeThickness.map(field => field.name);
                })(),
                value: 'Solid floor - Enter a U-value',
              },
              {
                name: 'U-value',
                label: 'U-value (W/m2K)',
                type: 'number',
                value: 0.15,
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
          }
        ],
        windows: [
          {
            fields: [
              {
                name: 'typeOfWall',
                label: 'In which wall/ceiling/door',
                type: 'select',
                options: [
                  'External Wall',
                  'External Wall',
                  'Internal Wall',
                ],
                value: 'External Wall',
              },
              {
                name: 'windowHeight',
                label: 'Window/door height (m)',
                type: 'number',
                value: 0.9,
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
                value: 'Wood/PVC Double, low-E glass, argon filled',
              },
              {
                name: 'U-value',
                label: 'U-value',
                type: 'number',
                value: 2.1,
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
          },
        ],
        reqEmitterSize: null,
        fields: [
          {
            name: 'roomName',
            label: 'Room Name',
            type: 'text',
            value: 'Living room test',
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
            value: 'Convector',
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
              'Specify Maximum Floor Surface Temperature (°C) - Overwrite here',
            ],
            type: 'select',
            value: 'Specify Maximum Floor Surface Temperature (°C) - Overwrite here',
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
            value: 'Floating screed floor',
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
            value: 25,
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
            value: 'Living Room',
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
            value: 'No chimney or open fire',
            emiterSpec: false,
          },
          {
            name: 'roomLength',
            label: 'Room Length',
            type: 'text',
            value: 3,
            emiterSpec: false,
          },
          {
            name: 'roomWidth',
            label: 'Room Width',
            type: 'text',
            value: 4,
            emiterSpec: false,
          },
          {
            name: 'roomHeight',
            label: 'Room Height',
            type: 'text',
            value: 0,
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
          {
            name: 'radSurfFinFactor',
            value: 1,
            emiterSpec: true,
          },
          {
            name: 'radEncFactor',
            value: 1,
            emiterSpec: true,
          },
          {
            name: 'nCoefficient',
            value: 1.3,
            emiterSpec: true,
          },
          {
            name: 'convTempFactor',
            value: 0.85,
            emiterSpec: true,
          },
          {
            name: 'radTempFactor',
            value: '',
            emiterSpec: true,
          },
        ],
      });

      this.get('rooms').pushObject({
        name: `Room 2`,
        walls: [{
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              value: 'External Wall',
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
              value: 'Outside',
            },
            {
              name: 'heightOrLength',
              label: 'Height or length (m)',
              type: 'number',
              value: 2,
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
              value: ''
            },
            {
              name: 'U-value',
              label: 'U-value',
              type: 'number',
              value: 0.3,
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
        },
        {
          fields: [
            {
              name: 'description',
              label: 'Description',
              type: 'text',
              value: 'Ceiling',
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
              value: 'Outside',
            },
            {
              name: 'heightOrLength',
              label: 'Height or length (m)',
              type: 'number',
              value: 3,
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
              value: ''
            },
            {
              name: 'U-value',
              label: 'U-value',
              type: 'number',
              value: 0.2,
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
        },
        ],
        groundFloors: [
        ],
        windows: [
          {
            fields: [
              {
                name: 'typeOfWall',
                label: 'In which wall/ceiling/door',
                type: 'select',
                options: [
                  'External Wall',
                ],
                value: 'External Wall',
              },
              {
                name: 'windowHeight',
                label: 'Window/door height (m)',
                type: 'number',
                value: 0.9,
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
                value: 'Wood/PVC Double, low-E glass, argon filled',
              },
              {
                name: 'U-value',
                label: 'U-value',
                type: 'number',
                value: 2.1,
              },
              {
                name: 'wall-U-value',
                label: 'Wall/roof U-value (W/m²K)',
                type: 'constant',
                value: 0.3,
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
          },
        ],
        reqEmitterSize: null,
        fields: [
          {
            name: 'roomName',
            label: 'Room Name',
            type: 'text',
            value: 'Bedroom 1',
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
            value: 'Radiator',
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
              'Specify Maximum Floor Surface Temperature (°C) - Overwrite here',
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
            value: 25,
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
            value: 'Bedroom',
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
            value: 'No chimney or open fire',
            emiterSpec: false,
          },
          {
            name: 'roomLength',
            label: 'Room Length',
            type: 'text',
            value: 3,
            emiterSpec: false,
          },
          {
            name: 'roomWidth',
            label: 'Room Width',
            type: 'text',
            value: 3,
            emiterSpec: false,
          },
          {
            name: 'roomHeight',
            label: 'Room Height',
            type: 'text',
            value: 0,
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
          {
            name: 'radSurfFinFactor',
            value: 1,
            emiterSpec: true,
          },
          {
            name: 'radEncFactor',
            value: 1,
            emiterSpec: true,
          },
          {
            name: 'nCoefficient',
            value: 1.3,
            emiterSpec: true,
          },
          {
            name: 'convTempFactor',
            value: 0.85,
            emiterSpec: true,
          },
          {
            name: 'radTempFactor',
            value: 0.2,
            emiterSpec: true,
          },
        ],
      });



      // setup site Inputs Config to values from the example
      this.set('siteInputsConfig', [
        {
          name: 'heatingDuration',
          label: 'Heating duration',
          options: [
            'Intermittent',
            'Continuous'
          ],
          value: 'Continuous',
          type: 'select',
        },
        {
          name: 'localCity',
          label: 'Local City (to determine DET)',
          options: this.get('model.cities').map(city => city.name),
          value: 'Manchester',
          type: 'select',
        },
        {
          name: 'DETinC',
          label: 'Design External Temperature (DET) in °C',
          value: -3.8,
          type: 'number',
        },
        {
          name: 'Height',
          label: 'Height (m) above mean sea level',
          type: 'number',
          value: 100
        },
        {
          name: 'buildingRegCriteria',
          label: 'Building Regulation criteria',
          options: [
            'Built after 2006 and complies with all current Building Regulations',
            'Built in 2000 or later with double glazing and regulatory minimum insulation',
            'Built before 2000',
          ],
          value: 'Built after 2006 and complies with all current Building Regulations',
          type: 'select',
        }
      ]);
      setTimeout(() => {

        //room 0
        const roomToggleField = this.get('rooms')[0].fields.objectAt(12);
        const wall1ToggleField = this.get('rooms')[0].walls[0].fields.objectAt(3);
        const wall2ToggleField = this.get('rooms')[0].walls[1].fields.objectAt(3);
        const groundFloorToggleField = this.get('rooms')[0].groundFloors[0].fields.objectAt(1);
        const windowToggleField = this.get('rooms')[0].windows[0].fields.objectAt(2);


        //room 1
        const roomToggleField2 = this.get('rooms')[1].fields.objectAt(12);
        const wall1ToggleField2 = this.get('rooms')[1].walls[0].fields.objectAt(3);
        const wall2ToggleField2 = this.get('rooms')[1].walls[1].fields.objectAt(3);
        const wall3ToggleField2 = this.get('rooms')[1].walls[2].fields.objectAt(3);
        const groundFloorToggleField2 = this.get('rooms')[1].groundFloors[0].fields.objectAt(1);
        const windowToggleField2 = this.get('rooms')[1].windows[0].fields.objectAt(2);

        //room 2
        const roomToggleField3 = this.get('rooms')[2].fields.objectAt(12);
        const wall1ToggleField3 = this.get('rooms')[2].walls[0].fields.objectAt(3);
        const wall2ToggleField3 = this.get('rooms')[2].walls[1].fields.objectAt(3);
        const windowToggleField3 = this.get('rooms')[2].windows[0].fields.objectAt(2);

        Ember.set(roomToggleField, 'value', 2.4);
        Ember.set(wall1ToggleField, 'value', 5);
        Ember.set(wall2ToggleField, 'value', 5);
        Ember.set(groundFloorToggleField, 'value', 5);
        Ember.set(windowToggleField, 'value', 1.6);

        Ember.set(roomToggleField2, 'value', 2.4);
        Ember.set(wall1ToggleField2, 'value', 3);
        Ember.set(wall2ToggleField2, 'value', 4);
        Ember.set(wall3ToggleField2, 'value', 4);
        Ember.set(groundFloorToggleField2, 'value', 4);
        Ember.set(windowToggleField2, 'value', 1.2);

        Ember.set(roomToggleField3, 'value', 2.4);
        Ember.set(wall1ToggleField3, 'value', 3);
        Ember.set(wall2ToggleField3, 'value', 3);
        Ember.set(windowToggleField3, 'value', 1.2);
      }, 500);
    }
  },

  /* siteInputsConfig used in Site Input component, kept in top-level component so we can
  observe it from certificate component, TODO: can be imported from a JSON file */
  siteInputsConfig: Ember.computed(function siteInputsConfig() {
    return [
      {
        name: 'heatingDuration',
        label: 'Heating duration',
        options: [
          'Intermittent',
          'Continuous'
        ],
        value: '',
        type: 'select',
      },
      {
        name: 'localCity',
        label: 'Local City (to determine DET)',
        options: this.get('model.cities').map(city => city.name),
        value: '',
        type: 'select',
      },
      {
        name: 'DETinC',
        label: 'Design External Temperature (DET) in °C',
        value: 0,
        type: 'number',
      },
      {
        name: 'Height',
        label: 'Height (m) above mean sea level',
        type: 'number',
      },
      {
        name: 'buildingRegCriteria',
        label: 'Building Regulation criteria',
        options: [
          'Built after 2006 and complies with all current Building Regulations',
          'Built in 2000 or later with double glazing and regulatory minimum insulation',
          'Built before 2000',
        ],
        value: '',
        type: 'select',
      }
    ];
  }),

});
