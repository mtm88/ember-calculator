import Ember from 'ember';

export default Ember.Component.extend({

  genTypes: ['Heat Pump', 'Condensing Boiler', 'Other'],
  selectedGenType: '',

  confirmTempOpts: ['YES', 'NO'],
  selectedTempOpts: 'PLEASE SELECT',

  installationDate: new Date(),
  extraPickadateOptions: {},

  MCSStandardsOptions: ['MCS Compliant', 'Not MCS Complaint', 'Not Applicable'],
  selectedMCSStandardOpt: 'Please select',

  signDate: new Date(),

  DETForHeatLoss: Ember.computed('siteInputsConfig.@each.value', function DETForHeatLoss()
  {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'DETinC');

    if (reqField) {
      return reqField.value;
    }

    return 'N/A';
  }),

  totalHeatLoss: Ember.computed(
    'rooms.@each.heatLoss',
    'rooms.groundFloors.@each.heatLoss',
    'rooms.walls.@each.heatLoss',
    'rooms.windows.@each.heatLoss',
    function totalHeatLoss()
    {
      let heatLoss = 0;
      this.get('rooms').forEach((room) => {
        if (room.combinedHeatLoss && !isNaN(room.combinedHeatLoss)) {
          heatLoss += room.heatLoss;
        }
      });

      return heatLoss;
    }
  ),

  typeOfHeating: Ember.computed('siteInputsConfig.@each.value', function typeOfHeating()
  {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration');

    if (reqField) {
      return reqField.value;
    }

    return 'N/A';
  }),

  upliftFactor: Ember.computed('siteInputsConfig.@each.value', function upliftFactor()
  {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration');

    if (reqField && reqField.value === 'Intermittent') {
      return '';
    }

    return 'N/A';
  }),

  MWT: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay()
  {
    // const reqField = this.get('roomInputsConfig').find(field => field.name = '<field name>');

    // if (reqField) {
    //   return reqField.value;
    // }

    return 'N/A';
  }),

  oversizeFactor: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay()
  {
    // const reqField = this.get('roomInputsConfig').find(field => field.name = '<field name>');

    // if (reqField) {
    //   return reqField.value;
    // }

    return 'N/A';
  }),

  underfloorHeating: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay()
  {
    // const reqField = this.get('roomInputsConfig').find(field => field.name = '<field name>');

    // if (reqField) {
    //   return reqField.value;
    // }

    return 'N/A';
  }),

  designFlowTemp: Ember.computed('siteInputsConfig.@each.value', function designFlowTemp()
  {
    const MWT = this.get('MWT');

    if (MWT && !isNaN(MWT)) {
      return Math.round(14 / 13 * MWT);
    }

    return 0;
  }),

  blendingValve: Ember.computed('siteInputsConfig.@each.value', function blendingValve()
  {
    return 'TO BE DEFINED';
  }),

});
