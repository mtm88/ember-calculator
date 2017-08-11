import Ember from 'ember';

export default Ember.Component.extend({
  date: new Date(),

  certificateFields: Ember.computed('siteInputsConfig.@each.value', function certificateFields() {
    return [
      {
        name: 'installationDate',
        label: 'Date installation was commissioned',
        date: new Date(),
        type: 'pickADate',
      },
      {
        name: 'typeOfHeatGen',
        label: 'Type of heat generator (boiler/heat pump/other)',
        options: [
          'Heat Pump',
          'Condensing Boiler',
          'Other',
        ],
        value: '',
        type: 'select',
      },
      {
        name: 'heatLossCalcForDesign',
        label: 'Heat loss calculator used for the design (must conform to UK National Annex of EN12831)',
        value: 'BRE Calculation tool for design of low temperature domestic heating systems',
        type: 'constant',
      },
      {
        name: 'assumedDesignExTemp',
        label: 'Assumed Design External Temperature (DET) for heat loss calculations',
        type: 'siteInputValue',
        relatedField: 'DETinC',
      },
      {
        name: 'confirmMatch',
        label: 'Confirm that assumed internal temperatures were as given in Table 2 of the guide*. If there are any exceptions they should be listed here.',
        options: [
          'Yes',
          'No',
        ],
        type: 'select',
      },
      {
        name: 'totalHeatLoss',
        label: 'Total building heat loss on the design day, in kW',
        value: 1.86, // to be changed to dynamic
        type: 'constant',
      },
      {
        name: 'typeOfHeating',
        label: 'Has the installation has been designed for intermittent heating or continuous heating?',
        type: 'siteInputValue',
        relatedField: 'heatingDuration',
      }
    ]
  }),

});
