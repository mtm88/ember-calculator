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
    'rooms.@each.combinedHeatLoss',
    'rooms.groundFloors.@each.heatLoss',
    'rooms.walls.@each.heatLoss',
    'rooms.windows.@each.heatLoss',
    function totalHeatLoss()
    {
      let heatLoss = 0;

      // get combinedHeatLoss that's defined on each room and give a sum
      this.get('rooms').forEach((room) => {
        if (room.combinedHeatLoss && !isNaN(room.combinedHeatLoss)) {
          heatLoss += room.combinedHeatLoss;
        }
      });

      return heatLoss;
    }
  ),

  // find 'heatingDuration' field in siteInputsConfig and return the value if it exists
  typeOfHeating: Ember.computed('siteInputsConfig.@each.value', function typeOfHeating()
  {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration');

    if (reqField) {
      return reqField.value;
    }

    return 'N/A';
  }),

  // find 'heatingDuration' field in siteInputsConfig and check for the type of heating
  upliftFactor: Ember.computed('siteInputsConfig.@each.value', function upliftFactor()
  {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration');

    if (reqField && reqField.value === 'Intermittent') {
      return '';
    }

    return 'N/A';
  }),

  MWT: Ember.computed('selectedDFT.value', function totalHeatLossDay()
  {
    return this.get('selectedDFT.value');
  }),

  // check for totalRadConv passed from heatLossCalculator component and return if if it's > 0
  oversizeFactor: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay()
  {
    const totalRadConv = this.get('totalRadConv');

    if (totalRadConv) {
      return totalRadConv;
    }

    return 0;
  }),

  underfloorHeating: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay()
  {
    return 'N/A';
  }),

  // check for MWT passed from heatLossCalculator component and calculate the designFlowTemp based on XML data
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
    return 'N/A';
  }),

});
