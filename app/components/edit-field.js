import Ember from 'ember';

export default Ember.Component.extend({

  siteInputValue: Ember.computed('editField.type', 'editField.value', function siteInputValue() {
    const type = this.get('editField.type');
    if (type === 'siteInputValue') {
      const fieldName = this.get('editField.relatedField');
      const siteInputsConfig = this.get('siteInputsConfig');
      const relatedConfigField = siteInputsConfig.find(field => field.name === fieldName);
      return relatedConfigField.value;
    }
    return null;
  }),

});
