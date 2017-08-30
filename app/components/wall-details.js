import Ember from 'ember';

export default Ember.Component.extend({

  observeFields: Ember.observer(
    'wall.fields.@each.value',
    function observeFields()
    {
      // if any changes happened to this specific wall, re-set computed properties
      this.mapArea();
      this.mapUValue();
      this.mapDTD();
      this.mapHeatLoss();
    }),

  mapArea()
  {
    const wall = this.get('wall');

    if (wall && wall.fields.length > 0) {
      // grab wallWidth and wallHeight from wall fields array
      const wallWidth = wall.fields.find(field => field.name === 'width').value;
      const wallHeight = wall.fields.find(field => field.name === 'heightOrLength').value;

      // define at which index in the array is the 'area' property we want to set
      const areaIndex = wall.fields.findIndex(field => field.name === 'area');
      const areaField = wall.fields.objectAt(areaIndex);

      // calculate and set value of areaField
      Ember.set(areaField, 'value', wallWidth * wallHeight);
    }

  },

  mapUValue()
  {
    const wall = this.get('wall');

    if (wall && wall.fields.length > 0) {
      // grab construction from wall fields array
      const constrValue = wall.fields.find(field => field.name === 'construction').value;

      if (constrValue) {
        // grab constructionOptions JSON from model;
        const { constructionOptions } = this.get('model');

        // find related constrValue within constructionOptions JSON
        const uValue = constructionOptions.find(option => option.name === constrValue).value;

        // define at which index in the array is the 'U-value' property we want to set
        const uValueIndex = wall.fields.findIndex(field => field.name === 'U-value');
        const uValueField = wall.fields.objectAt(uValueIndex);

        // if it would be different than 0 it would mean user overriden it on the room config level
        if (uValueField.value === 0) {
          // set the value of uValueField
          Ember.set(uValueField, 'value', uValue);
        }
      }

    }

  },

  mapDTD()
  {
    const wall = this.get('wall');
    // grab roomFields from room to which this wall belongs to use its fields values in calculations
    const roomFields = this.get('roomFields');

    // grab the ventilationTable JSON from model
    const { ventilationTable } = this.get('model');
    // grab DRT and spaceType from roomFields fields array
    const DRT = roomFields.find(field => field.name === 'DRT').value;
    const spaceType = wall.fields.find(field => field.name === 'spaceType').value;

    if (ventilationTable[spaceType]) {
      // define Temperature related to this Design Temperature Difference
      const relatedTemp = ventilationTable[spaceType].DRT;

      // define at which index in the array is the 'U-value' property we want to set
      const DTDIndex = wall.fields.findIndex(field => field.name === 'DTD');
      const DTDField = wall.fields.objectAt(DTDIndex);

      // calculate and set value of DTDField
      Ember.set(DTDField, 'value', DRT - relatedTemp);
    }

    return 0;
  },

  mapHeatLoss()
  {
    const wall = this.get('wall');

    // grab area, constrValue, uValue and DTD from wall fields array
    const area = wall.fields.find(field => field.name === 'area').value;
    const uValue = wall.fields.find(field => field.name === 'U-value').value;
    const DTD = wall.fields.find(field => field.name === 'DTD').value;

    if (area && !isNaN(DTD)) {
      // define at which index in the array is the 'heatLoss' property we want to set
      const heatLossIndex = wall.fields.findIndex(field => field.name === 'heatLoss');
      const heatLossField = wall.fields.objectAt(heatLossIndex);

      // calculate and set it also as top level prop so we don't need to observe with double @each from parent
      Ember.set(wall, 'heatLoss', uValue * DTD * area);

      // calculate and set the value of heatLossField
      Ember.set(heatLossField, 'value', uValue * DTD * area);
    }

  },

});
