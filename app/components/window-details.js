import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this.mapArea();
    this.mapUValue();
  },

  observeFields: Ember.observer(
    'window.windowHeight.value',
    'window.windowWidth.value',
    'window.typeOfWall.value',
    'remappedWalls.@each.uValue',
    function observeFields()
    {
      this.mapArea();
      this.mapUValue();
    }),

  mapArea() {
    const window = this.get('window');

    if (window && Object.keys(window).length > 0) {
      const windowHeight = window.windowHeight.value;
      const windowWidth = window.windowWidth.value;

      Ember.set(window, 'area', windowHeight * windowWidth);
    }

  },

  mapUValue() {
    const window = this.get('window');
    const typeOfWall = window.typeOfWall.value;

    if (typeOfWall) {
      const relatedWall = this.get('remappedWalls').find(wall => wall.description.value === typeOfWall)['U-value'].value;

      Ember.set(window, 'uValue', relatedWall);
    }

    return null;
  },

});
