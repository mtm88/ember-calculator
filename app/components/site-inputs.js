import Ember from 'ember';

export default Ember.Component.extend({

  observeChanges: Ember.observer('siteInputsConfig.@each.value',
    function observeChanges()
    {
      const siteInputsConfig = this.get('siteInputsConfig');

      const localCity = siteInputsConfig.find(field => field.name === 'localCity').value;

      if (localCity) {

        const { cities } = this.get('model');

        const chosenCityTemp = cities.find(city => city.name === localCity).value;

        const DETIndex = siteInputsConfig.findIndex(field => field.name === 'DETinC');
        const DETField = siteInputsConfig.objectAt(DETIndex);

        Ember.set(DETField, 'value', chosenCityTemp);
      }

    }
  ),

});
