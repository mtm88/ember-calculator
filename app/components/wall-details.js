import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this.mapArea();
    this.mapUValue();
    this.mapDTD();
    this.mapHeatLoss();
  },

  observeFields: Ember.observer(
    'wall.fields.@each.value',
    function observeFields()
    {
      this.mapArea();
      this.mapUValue();
      this.mapDTD();
      this.mapHeatLoss();
    }),

    mapArea() {
      const wall = this.get('wall');

      if (wall && wall.fields.length > 0) {
        const wallWidth = wall.fields.find(field => field.name === 'width').value;
        const wallHeight = wall.fields.find(field => field.name === 'heightOrLength').value;

        // define at which index in the array is the 'area' property we want to set
        const areaIndex = this.get('wall').fields.findIndex(field => field.name === 'area');
        const areaField = wall.fields.objectAt(areaIndex);

        Ember.set(areaField, 'value', wallWidth * wallHeight);
      }

    },

    mapUValue() {
      const wall = this.get('wall');

      if (wall && wall.fields.length > 0) {
        const constrValue = wall.fields.find(field => field.name === 'construction').value;

        if (constrValue) {
          const { constructionOptions } = this.get('model');
          const uValue = constructionOptions.find(option => option.name === constrValue).value;

          // define at which index in the array is the 'U-value' property we want to set
          const uValueIndex = this.get('wall').fields.findIndex(field => field.name === 'U-value');
          const uValueField = wall.fields.objectAt(uValueIndex);

          // if it would be different than 0 it would mean user overriden it on the room config level
          if (uValueField.value === 0) {
            Ember.set(uValueField, 'value', uValue);
          }
      }

    }

  },

  mapDTD() {
    const wall = this.get('wall');

    const DRT = this.get('DRT');
    const { ventilationTable } = this.get('model');
    const spaceType = wall.fields.find(field => field.name === 'spaceType').value;

    if (ventilationTable[spaceType]) {
      const relatedTemp = ventilationTable[spaceType].DRT;

      // define at which index in the array is the 'U-value' property we want to set
      const DTDIndex = this.get('wall').fields.findIndex(field => field.name === 'DTD');
      const DTDField = wall.fields.objectAt(DTDIndex);

      Ember.set(DTDField, 'value', DRT - relatedTemp);
    }

    return 0;
  },

  mapHeatLoss() {
    const wall = this.get('wall');

    const area = wall.fields.find(field => field.name === 'area').value;
    const constrValue = wall.fields.find(field => field.name === 'construction').value;
    const uValue = wall.fields.find(field => field.name === 'U-value').value;
    const DTD = wall.fields.find(field => field.name === 'DTD').value;

    if (constrValue && area && !isNaN(DTD)) {

      const heatLossIndex = this.get('wall').fields.findIndex(field => field.name === 'heatLoss');
      const heatLossField = wall.fields.objectAt(heatLossIndex);

      Ember.set(heatLossField, 'value', uValue * DTD * area);
    }

  },

});
