import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this.mapArea();
    this.mapDTD();
    this.mapHeatLoss();
  },

  observeFields: Ember.observer(
    'groundFloor.shortLength.value',
    'groundFloor.longLength.value',
    'groundFloor.insulationType.value',
    'groundFloor.U-value.value',
    'groundFloor.area.value',
    function observeFields()
    {
      this.mapArea();
      this.mapDTD();
      this.mapHeatLoss();
    }),

  mapArea() {
    const groundFloor = this.get('groundFloor');

    if (groundFloor && Object.keys(groundFloor).length > 0) {
      const shortLength = groundFloor.shortLength.value;
      const longLength = groundFloor.longLength.value;

      groundFloor.set('area', shortLength * longLength);
    }

  },

  mapDTD() {
    const groundFloor = this.get('groundFloor');
    const DRT = this.get('DRT');
    const insulationType = groundFloor.insulationType.value;

    if (!isNaN(DRT) && insulationType && insulationType.includes('So')) {
      groundFloor.set('adjustedDTD', DRT - 10);
    }
    else if (!isNaN(DRT) && insulationType) {
      const DETinC = this.get('siteInputsConfig').find(field => field.name === 'DETinC').value;

      groundFloor.set('adjustedDTD',  DRT - DETinC);
    }

  },

  mapHeatLoss() {
    const groundFloor = this.get('groundFloor');
    const { area, adjustedDTD } = this.get('groundFloor');
    const uValue = groundFloor['U-value'].value;

    if (area && adjustedDTD && uValue) {
      groundFloor.set('heatLoss', area * adjustedDTD * uValue);
    }

    return null;
  },

});
