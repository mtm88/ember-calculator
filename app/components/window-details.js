import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this.mapArea();
    this.mapUValue();
    this.mapDTD();
    this.mapHeatLoss();
  },

  observeFields: Ember.observer(
    'window.windowHeight.value',
    'window.windowWidth.value',
    'window.typeOfWall.value',
    'window.glazingType.value',
    'remappedWalls.@each.uValue',
    function observeFields()
    {
      this.mapArea();
      this.mapUValue();
      this.mapDTD();
      this.mapHeatLoss();
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

    // if the window/door is assigned to a parent, inherit heatLoss data
    if (typeOfWall) {
      const remappedWalls = this.get('remappedWalls');

      // find the wall it's assigned to
      const relatedWall = remappedWalls.find(wall => wall.description.value === typeOfWall);

      Ember.set(window, 'uValue', relatedWall.uValue);
    }

    return null;
  },

  mapDTD() {
    const window = this.get('window');
    const relatedTypeOfWall = window.typeOfWall.value;

    // if the window/door is assigned to a parent, inherit heatLoss data
    if (relatedTypeOfWall) {
      const remappedWalls = this.get('remappedWalls');

      // find the wall it's assigned to
      const relatedWall = remappedWalls.find(wall => wall.description.value === relatedTypeOfWall);

      Ember.set(window, 'adjustedDTD', relatedWall.adjustedDTD);
    }
  },

  mapHeatLoss() {
    const window = this.get('window');
    const windowGlazingType = window.glazingType.value;

    let heatLoss;

    if (windowGlazingType) {
      const { constructionOptions } = this.get('model');
      const glazingMatchConstructionType = constructionOptions.find(opt => opt.name === windowGlazingType);

      // check if glazing type is one of construction types
      if (glazingMatchConstructionType) {
        heatLoss = window.uValue * window.adjustedDTD * (window['U-value'].value - window.uValue);
      }

    }
    else {
      heatLoss = window.uValue * window.adjustedDTD * (window.uValue - window['U-value'].value);
    }

    // if any of the values is missing and end result is not a number, set to empty string
    if (isNaN(heatLoss)) {
      heatLoss = '';
    }

    Ember.set(window, 'heatLoss', heatLoss);
  },

});
