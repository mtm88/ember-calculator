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
              value: 'Bedroom',
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
              value: 'Render 19mm, standard aerated block 100mm, mineral wool slab in cavity 50mm, 100mm standard aerated block, 13mm plaster',
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
        groundFloors: [],
        windows: [],
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
          value: 'Belfast',
          type: 'select',
        },
        {
          name: 'DETinC',
          label: 'Design External Temperature (DET) in °C',
          value: -1.4,
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
        const roomToggleField = this.get('rooms')[0].fields.objectAt(12);
        const wall1ToggleField = this.get('rooms')[0].walls[0].fields.objectAt(3);
        const wall2ToggleField = this.get('rooms')[0].walls[1].fields.objectAt(3);
        Ember.set(roomToggleField, 'value', 2.4);
        Ember.set(wall1ToggleField, 'value', 5);
        Ember.set(wall2ToggleField, 'value', 5);
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
