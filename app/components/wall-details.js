import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this.mapArea();
    this.mapUValue();
    this.mapDTD();
    this.mapHeatLoss();
  },

  observeFields: Ember.observer(
    'wall.heightOrLength.value',
    'wall.width.value',
    'wall.construction.value',
    'wall.DRT.value',
    'wall.spaceType.value',
    'wall.area',
    'wall.uValue',
    'wall.U-value.value',
    function observeFields()
    {
      this.mapArea();
      this.mapUValue();
      this.mapDTD();
      this.mapHeatLoss();
    }),

  mapArea() {
    const wall = this.get('wall');

    if (wall && Object.keys(wall).length > 0) {
      const wallWidth = wall.heightOrLength.value;
      const wallHeight = wall.width.value;

      wall.set('area', wallWidth * wallHeight);
    }

  },

  mapUValue() {
    const wall = this.get('wall');

    if (wall && wall.construction && wall.construction.value) {
      const constrValue = wall.construction.value;

      if (constrValue) {
        const { constructionOptions } = this.get('model');
        const uValue = constructionOptions.find(option => option.name === constrValue).value;

        wall.set('uValue', uValue);
      }

    }
  },

  mapDTD() {
    const wall = this.get('wall');
    const DRT = this.get('DRT');
    const { ventilationTable } = this.get('model');
    const spaceType = this.get('wall.spaceType').value;

    if (ventilationTable[spaceType]) {
      const relatedTemp = ventilationTable[spaceType].DRT;

      wall.set('adjustedDTD', DRT - relatedTemp);
    }

    return 0;
  },

  mapHeatLoss() {
    const wall = this.get('wall');
    const area = wall.area;
    const constrValue = wall.construction.value;
    const uValue = wall.uValue;
    const overridenUValue = wall['U-value'].value;
    const adjustedDTD = wall.adjustedDTD;

    if (constrValue && area && !isNaN(adjustedDTD)) {
      const validUValue = overridenUValue || uValue;

      wall.set('heatLoss', validUValue * adjustedDTD * area);
    }

    return null;
  },

});
