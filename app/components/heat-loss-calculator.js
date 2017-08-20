import Ember from 'ember';

export default Ember.Component.extend({

  rooms: [],

  currentInputTab: 'roomInputs', //siteInputs
  currentResultsTab: 'emitterSpecifications', //certificate

  siteInputsTab: Ember.computed.equal('currentInputTab', 'siteInputs'),
  roomInputTab: Ember.computed.equal('currentInputTab', 'roomInputs'),

  certificateTab: Ember.computed.equal('currentResultsTab', 'certificate'),
  emitterSpecTab: Ember.computed.equal('currentResultsTab', 'emitterSpecifications'),

  actions: {
    setTab(tabType, chosenTab) {
      this.set(tabType, chosenTab);
    },
  },

  // configs to be moved to config files && imported
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
