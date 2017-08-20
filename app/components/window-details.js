import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs()
  {
    this.mapArea();
    this.mapWallUValueAndDTD();
    this.mapUValue();
    this.mapHeatLoss();
  },

  observeFields: Ember.observer(
    'window.fields.@each.value',
    function observeFields() {
      this.mapArea();
      this.mapWallUValueAndDTD();
      this.mapUValue();
      this.mapHeatLoss();
    }),

  mapArea()
  {
    const window = this.get('window');

    if (window && window.fields.length > 0) {
      const windowHeight = window.fields.find(field => field.name === 'windowHeight').value;
      const windowWidth = window.fields.find(field => field.name === 'windowWidth').value;

      // define at which index in the array is the 'area' property we want to set
      const areaIndex = window.fields.findIndex(field => field.name === 'area');
      const areaField = window.fields.objectAt(areaIndex);

      Ember.set(areaField, 'value', windowHeight * windowWidth);
    }

  },

  mapWallUValueAndDTD()
  {
    const window = this.get('window');

    const typeOfWall = window.fields.find(field => field.name === 'typeOfWall').value;

    // if the window/door is assigned to a parent, inherit heatLoss data
    if (typeOfWall) {
      let wallUValue;
      let wallDTD;

      // find the wall it's assigned to and take its U-value
      this.get('walls').forEach((wall) => {
        const wallDesc = wall.fields.find(field => field.name === 'description').value;

        if (wallDesc === typeOfWall) {
          wallUValue = wall.fields.find(field => field.name === 'U-value').value;
          wallDTD = wall.fields.find(field => field.name === 'DTD').value;
        }

      });

      // define at which index in the array is the 'U-value' and 'DTD' property we want to set
      const wallUValueIndex = window.fields.findIndex(field => field.name === 'wall-U-value');
      const wallDTDIndex = window.fields.findIndex(field => field.name === 'DTD');

      const wallUValueField = window.fields.objectAt(wallUValueIndex);
      const wallDTDField = window.fields.objectAt(wallDTDIndex);

      Ember.set(wallUValueField, 'value', wallUValue);
      Ember.set(wallDTDField, 'value', wallDTD);
    }

  },

  mapUValue()
  {
    const window = this.get('window');

    if (window && window.fields.length > 0) {
      const glazingValue = window.fields.find(field => field.name === 'glazingType').value;

      if (glazingValue) {
        const { windowsDoors } = this.get('model');
        const uValue = windowsDoors.find(option => option.name === glazingValue).value;

        // define at which index in the array is the 'U-value' property we want to set
        const uValueIndex = window.fields.findIndex(field => field.name === 'U-value');
        const uValueField = window.fields.objectAt(uValueIndex);

        // if it would be different than 0 it would mean user overriden it on the room config level
        if (uValueField.value === 0) {
          Ember.set(uValueField, 'value', uValue);
        }

      }

    }

  },

  mapHeatLoss()
  {
    const window = this.get('window');

    const glazingValue = window.fields.find(field => field.name === 'glazingType').value;
    const wallUValue = window.fields.find(field => field.name === 'wall-U-value').value;
    const uValue = window.fields.find(field => field.name === 'U-value').value;
    const DTD = window.fields.find(field => field.name === 'DTD').value;

    let heatLoss;

    if (glazingValue) {
      heatLoss = wallUValue * DTD * (uValue - wallUValue);
    }
    else {
      heatLoss = wallUValue * DTD * (wallUValue - uValue);
    }

    // if any of the values is missing and end result is not a number, set to empty string
    if (isNaN(heatLoss)) {
      heatLoss = '';
    }

    // define at which index in the array is the 'U-value' property we want to set
    const heatLossIndex = window.fields.findIndex(field => field.name === 'heatLoss');
    const heatLossField = window.fields.objectAt(heatLossIndex);

    // set it also as top level prop so we don't need to observe with double @each from parent
    Ember.set(window, 'heatLoss', heatLoss);
    Ember.set(heatLossField, 'value', heatLoss);
  },

});
