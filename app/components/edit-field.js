import Ember from 'ember';

export default Ember.Component.extend({

  typeIsSelect: Ember.computed.equal('editField.type', 'select'),
  typeIsNumberOrText: Ember.computed(function typeIsNumberOrText() {
    const type = this.get('editField.type');
    if (type === 'number' || type === 'text') {
      return true;
    }
  }),
  typeIsText: Ember.computed.equal('editField.type', 'text'),
  typeIsPickADate: Ember.computed.equal('editField.type', 'pickADate'),
  typeIsConstant: Ember.computed.equal('editField.type', 'constant'),
  typeIsSiteInputValue: Ember.computed.equal('editField.type', 'siteInputValue'),

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
