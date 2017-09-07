import Ember from 'ember';

export default Ember.Component.extend({

  observeChanges: Ember.observer('siteInputsConfig.@each.value',
    function observeChanges()
    {
      // grab siteInputsConfig from the parent component
      const siteInputsConfig = this.get('siteInputsConfig');

      // grab localCity param from siteInputsConfig
      const localCity = siteInputsConfig.find(field => field.name === 'localCity').value;

      // if the city is selected in the power-select
      if (localCity) {

        // grab cities JSON from the model
        const { cities } = this.get('model');

        // find chosen city within city JSON file and grab the temperature value
        const chosenCityTemp = cities.find(city => city.name === localCity).value;

        // define at which index in the array is the 'DETinC' (Design External Temperature in C) property we want to set
        const DETIndex = siteInputsConfig.findIndex(field => field.name === 'DETinC');
        const DETField = siteInputsConfig.objectAt(DETIndex);

        // set the value of DETField
        Ember.set(DETField, 'value', chosenCityTemp);
      }
    }
  ),

});
