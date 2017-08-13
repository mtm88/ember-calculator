import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this.calculateWallsParams();
    this.mapUValue();
  },

  observeFields: Ember.observer(
    'wall.heightOrLength.value',
    'wall.width.value',
    'wall.construction.value',
    function observeFields() {
      this.calculateWallsParams();
      this.mapUValue();
    }),

  calculateWallsParams() {
    const wall = this.get('wall');
    if (wall && Object.keys(wall).length > 0) {
      const wallWidth = wall.heightOrLength.value;
      const wallHeight = wall.width.value;
      Ember.set(wall, 'area', wallWidth * wallHeight);
    }
  },

  async mapUValue() {
    const wall = this.get('wall');
    if (wall && wall.construction && wall.construction.value) {
      const constrValue = wall.construction.value;
      if (constrValue) {
        const { constructionOptions } = await Ember.$.getJSON('/constructionOpts.json');
        const uValue = constructionOptions.find(option => option.name === constrValue).value;
        debugger;
        Ember.set(wall, 'uValue', uValue);
      }
    }
  },

});
