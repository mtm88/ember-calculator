import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      ventilationTable: Ember.$.getJSON('/ventilationTable.json'),
      altVentRates: Ember.$.getJSON('/altVentRates.json'),
      constructionOptions: Ember.$.getJSON('/constructionOpts.json'),
      windowsDoors: Ember.$.getJSON('/windowsDoors.json'),
      insulationTypeThickness: Ember.$.getJSON('/insulationTypeThickness.json'),
      edgesExposed: Ember.$.getJSON('/edgesExposed.json'),
      uValues: Ember.$.getJSON('/uValues.json'),
    });
  },
});
