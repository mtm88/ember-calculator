import Ember from 'ember';

export default Ember.Component.extend({

  currentInputTab: 'siteInputs',
  currentResultsTab: 'certificate',

  actions: {
    setTab(tabType, chosenTab) {
      this.set(tabType, chosenTab);
    },
  },

  siteInputsObserver: Ember.observer('siteInputsConfig.@each.value', function () {
    // logic for updating results
  }),

  siteInputsConfig: [
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
      name: 'DET',
      label: 'Source for Design External Temperature (DET)',
      options: [
        'City and altitude',
        'Specify Value'
      ],
      value: '',
      type: 'select',
    },
    {
      name: 'localCity',
      label: 'Local City (to determine DET)',
      options: [
        'Manchester',
        'London'
      ],
      value: '',
      type: 'select',
    },
    {
      name: 'Height',
      label: 'Height (m) above mean sea level',
      type: 'number',
    },
    {
      name: 'DETinC',
      label: 'Design External Temperature (DET) in °C',
      value: -3.8,
      type: 'constant',
    },
    {
      name: 'specDETinC',
      label: 'Enter specified Design External Temperature (DET) in °C',
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
  ],

  roomInputsConfig: [
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
      value: 0,
      type: 'constant',
    },
    {
      name: 'floorConstruction',
      label: 'Floor construction (underfloor only)',
      value: 0,
      type: 'constant',
    },
    {
      name: 'floorTOGvalue',
      label: 'Floor TOG value (underfloor only)',
      value: 0,
      type: 'constant',
    },
    {
      name: 'activeFloorArea',
      label: 'Active floor area in m² (underfloor only)',
      value: 0,
      type: 'constant',
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
  ],
});
