import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this.mapArea();
    this.mapDTD();
    this.mapHeatLoss();
    this.mapEdge();
    this.mapUValue();
    this.mapInsulationAndColumn();
  },

  observeFields: Ember.observer(
    'groundFloor.fields.@each.value',
    function observeFields()
    {
      this.mapArea();
      this.mapDTD();
      this.mapHeatLoss();
      this.mapEdge();
      this.mapUValue();
      this.mapInsulationAndColumn();
    }),

  mapArea() {
    const groundFloor = this.get('groundFloor');

    if (groundFloor && groundFloor.fields.length > 0) {
      const shortLength = groundFloor.fields.find(field => field.name === 'shortLength').value;
      const longLength = groundFloor.fields.find(field => field.name === 'longLength').value;

      // define at which index in the array is the 'area' property we want to set
      const areaIndex = this.get('groundFloor').fields.findIndex(field => field.name === 'area');
      const areaField = groundFloor.fields.objectAt(areaIndex);

      Ember.set(areaField, 'value', shortLength * longLength);
    }

  },

  mapDTD() {
    const groundFloor = this.get('groundFloor');

    if (groundFloor && groundFloor.fields.length > 0) {
      const DRT = this.get('DRT');
      const insulationType = groundFloor.fields.find(field => field.name === 'insulationType').value;

      // define at which index in the array is the 'DTD' property we want to set
      const DTDIndex = this.get('groundFloor').fields.findIndex(field => field.name === 'DTD');
      const DTDField = groundFloor.fields.objectAt(DTDIndex);

      if (!isNaN(DRT) && insulationType && insulationType.includes('So')) {
        Ember.set(DTDField, 'value', DRT - 10);
      }
      else if (!isNaN(DRT) && insulationType) {
        const DETinC = this.get('siteInputsConfig').find(field => field.name === 'DETinC').value;

        Ember.set(DTDField, 'value', DRT - DETinC);
      }
    }
  },

  mapEdge() {
    const groundFloor = this.get('groundFloor');

    if (groundFloor && groundFloor.fields.length > 0) {
      const currentEdge = groundFloor.fields.find(field => field.name === 'edgesExposed').value;

      if (currentEdge) {
        const { edgesExposed } = this.get('model');
        const edge = edgesExposed.find(option => option.name === currentEdge).value;

        if (edge) {
          // define at which index in the array is the 'area' property we want to set
          const edgeIndex = this.get('groundFloor').fields.findIndex(field => field.name === 'edge');
          const edgeField = groundFloor.fields.objectAt(edgeIndex);

          Ember.set(edgeField, 'value', edge);
        }

      }

    }

  },

  mapInsulationAndColumn() {
    const groundFloor = this.get('groundFloor');

    if (groundFloor && groundFloor.fields.length > 0) {
      const currentType = groundFloor.fields.find(field => field.name === 'insulationType').value;

      if (currentType) {
        const { insulationTypeThickness } = this.get('model');
        const thickness = insulationTypeThickness.find(option => option.name === currentType).value;
        const column = insulationTypeThickness.find(option => option.name === currentType).col;

        if (thickness) {
          // define at which index in the array is the 'type' property we want to set
          const typeIndex = this.get('groundFloor').fields.findIndex(field => field.name === 'insulation');
          const typeField = groundFloor.fields.objectAt(typeIndex);

          Ember.set(typeField, 'value', thickness);
        }

        if (column) {
          // define at which index in the array is the 'column' property we want to set
          const columnIndex = this.get('groundFloor').fields.findIndex(field => field.name === 'column');
          const columnField = groundFloor.fields.objectAt(columnIndex);

          Ember.set(columnField, 'value', column);
        }

      }

    }

  },

  mapUValue() {
    const groundFloor = this.get('groundFloor');

    const edge = groundFloor.fields.find(field => field.name === 'edge').value;
    const insulation = groundFloor.fields.find(field => field.name === 'insulation').value;

    if (edge && insulation) {
      // define Math.min 2nd value by checking insulation properties
      const secondMinArg = edge > 4 ? (insulation / 10) : 0;
      const searchedIndex = edge + Math.min(0.6, secondMinArg);

      const { uValues } = this.get('model');

      const indexMapping = {
        3: (() => {
          // calculate the sum of dimensions to find proper index in uValues table
          const shortLength = groundFloor.fields.find(field => field.name === 'shortLength').value;
          const longLength = groundFloor.fields.find(field => field.name === 'longLength').value;
          const dimSum = parseInt(shortLength, 10) + parseInt(longLength, 10);

          // make use of the column defined together with insulation to map the proper value
          const columnIndex = groundFloor.fields.find(field => field.name === 'column').value;

          const solidFloorData = uValues.solidFloors.find(opt => opt.index === dimSum);

          if (solidFloorData && solidFloorData.values) {
            // compensate 2 for code index starting at 0 and xml counting index as 1st field
            return solidFloorData.values[columnIndex - 2];
          }
        })(),
      }

    }

  },

  mapHeatLoss() {
    const groundFloor = this.get('groundFloor');

    const area = groundFloor.fields.find(field => field.name === 'area').value;
    const DTD = groundFloor.fields.find(field => field.name === 'DTD').value;


    // const { area, adjustedDTD } = this.get('groundFloor');
    // const uValue = groundFloor['U-value'].value;

    // if (area && adjustedDTD && uValue) {
    //   Ember.set(groundFloor, 'heatLoss', area * adjustedDTD * uValue);
    // }

    return null;
  },

});
