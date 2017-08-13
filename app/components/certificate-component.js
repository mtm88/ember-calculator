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

  DETForHeatLoss: Ember.computed('siteInputsConfig.@each.value', function DETForHeatLoss() {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'DETinC');
    if (reqField) {
      return reqField.value;
    }
    return 'N/A';
  }),

  totalHeatLossDay: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay() {
    const reqField = this.get('roomInputsConfig').find(field => field.name = '<field name>');
    if (reqField) {
      return reqField.value;
    }
    return 'N/A';
  }),

  typeOfHeating: Ember.computed('siteInputsConfig.@each.value', function typeOfHeating() {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration');
    if (reqField) {
      return reqField.value;
    }
    return 'N/A';
  }),

  upliftFactor: Ember.computed('siteInputsConfig.@each.value', function upliftFactor() {
    const reqField = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration');
    if (reqField && reqField.value === 'Intermittent') {
      return '';
    }
    return 'N/A';
  }),

  MWT: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay() {
    const reqField = this.get('roomInputsConfig').find(field => field.name = '<field name>');
    if (reqField) {
      return reqField.value;
    }
    return 'N/A';
  }),

  oversizeFactor: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay() {
    const reqField = this.get('roomInputsConfig').find(field => field.name = '<field name>');
    if (reqField) {
      return reqField.value;
    }
    return 'N/A';
  }),

  underfloorHeating: Ember.computed('roomInputsConfig.@each.value', function totalHeatLossDay() {
    const reqField = this.get('roomInputsConfig').find(field => field.name = '<field name>');
    if (reqField) {
      return reqField.value;
    }
    return 'N/A';
  }),

  designFlowTemp: Ember.computed('siteInputsConfig.@each.value', function designFlowTemp() {
    const MWT = this.get('MWT');
    if (MWT && !isNaN(MWT)) {
      return Math.round(14 / 13 * MWT);
    }
    return 0;
  }),

  blendingValve: Ember.computed('siteInputsConfig.@each.value', function blendingValve() {
    return 'TO BE DEFINED';
  }),


  // date: new Date(),

  // certificateFields: Ember.computed('siteInputsConfig.@each.value', function certificateFields() {
  //   return [
  //     {
  //       name: 'installationDate',
  //       label: 'Date installation was commissioned',
  //       date: new Date(),
  //       type: 'pickADate',
  //     },
  //     {
  //       name: 'typeOfHeatGen',
  //       label: 'Type of heat generator (boiler/heat pump/other)',
  //       options: [
  //         'Heat Pump',
  //         'Condensing Boiler',
  //         'Other',
  //       ],
  //       value: '',
  //       type: 'select',
  //     },
  //     {
  //       name: 'heatLossCalcForDesign',
  //       label: 'Heat loss calculator used for the design (must conform to UK National Annex of EN12831)',
  //       value: 'BRE Calculation tool for design of low temperature domestic heating systems',
  //       type: 'constant',
  //     },
  //     {
  //       name: 'assumedDesignExTemp',
  //       label: 'Assumed Design External Temperature (DET) for heat loss calculations',
  //       type: 'siteInputValue',
  //       relatedField: 'DETinC',
  //     },
  //     {
  //       name: 'confirmMatch',
  //       label: 'Confirm that assumed internal temperatures were as given in Table 2 of the guide*. If there are any exceptions they should be listed here.',
  //       options: [
  //         'Yes',
  //         'No',
  //       ],
  //       type: 'select',
  //     },
  //     {
  //       name: 'totalHeatLoss',
  //       label: 'Total building heat loss on the design day, in kW',
  //       value: 1.86, // to be changed to dynamic
  //       type: 'constant',
  //     },
  //     {
  //       name: 'typeOfHeating',
  //       label: 'Has the installation has been designed for intermittent heating or continuous heating?',
  //       type: 'siteInputValue',
  //       relatedField: 'heatingDuration',
  //     },
  //     {
  //       name: 'upliftFactor',
  //       label: 'If the installation has been designed for intermittent heating, (a) the uplift factor applied to the building heat loss, and (b) the uplift factor applied to the heat generator',
  //       value: Ember.computed(function upliftFactor() {
  //         const heatingDuration = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration');
  //         if (heatingDuration === 'Intermittent') {
  //           return '';
  //         }
  //         return 'N/A';
  //       }),
  //       type: 'computedProp',
  //     }
  //   ]
  // }),

});
