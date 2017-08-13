import Ember from 'ember';

export default Ember.Component.extend({

  rooms: new Ember.A(),

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

});
