import Ember from 'ember';

export default Ember.Component.extend({

  rooms: [],
  selectedDFT: null,
  totalRadConv: null,

  // Define currently active tab for template conditionals needs
  currentInputTab: 'siteInputs', // roomInputs
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
  },

  /* siteInputsConfig used in Site Input component, kept in top-level component so we can
  observe it from certificate component, TODO: can be imported from a JSON file */
  siteInputsConfig: Ember.computed(function siteInputsConfig()
  {
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
