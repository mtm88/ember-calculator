import Ember from 'ember';

export default Ember.Component.extend({

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

  mapArea()
  {
    const groundFloor = this.get('groundFloor');

    if (groundFloor && groundFloor.fields.length > 0) {

      // grab shortLength and longLength from groundFloor fields array
      const shortLength = groundFloor.fields.find(field => field.name === 'shortLength').value;
      const longLength = groundFloor.fields.find(field => field.name === 'longLength').value;

      // define at which index in the array is the 'area' property we want to set
      const areaIndex = groundFloor.fields.findIndex(field => field.name === 'area');
      const areaField = groundFloor.fields.objectAt(areaIndex);

      Ember.set(areaField, 'value', shortLength * longLength);
    }
  },

  mapDTD()
  {
    const groundFloor = this.get('groundFloor');
    const roomFields = this.get('roomFields');

    if (groundFloor && groundFloor.fields.length > 0) {

      // grab DRT and longLength from roomFields array
      const DRT = roomFields.find(field => field.name === 'DRT').value;

      // grab insulationType from groundFloor fields array
      const insulationType = groundFloor.fields.find(field => field.name === 'insulationType').value;

      // define at which index in the array is the 'DTD' property we want to set
      const DTDIndex = groundFloor.fields.findIndex(field => field.name === 'DTD');
      const DTDField = groundFloor.fields.objectAt(DTDIndex);

      // check if DRT is a number and whether insulationType includes 'So' string to modify the calculation
      if (!isNaN(DRT) && insulationType && insulationType.includes('So')) {
        Ember.set(DTDField, 'value', DRT - 10);
      }

      // if insulationType doesn't include 'So' string grab the Design External Temperature in C from siteInputsConfig
      else if (!isNaN(DRT)) {
        const DETinC = this.get('siteInputsConfig').find(field => field.name === 'DETinC').value;

        Ember.set(DTDField, 'value', DRT - DETinC);
      }
    }
  },

  mapEdge()
  {
    // Edge is one of the indexing params for groundFloor uValue calculations, we need to define it to find proper value in JSON table
    const groundFloor = this.get('groundFloor');

    if (groundFloor && groundFloor.fields.length > 0) {

      // grab currentEdge from groundFloor fields array
      const currentEdge = groundFloor.fields.find(field => field.name === 'edgesExposed').value;

      if (currentEdge) {

        // grab edges table from model
        const { edgesExposed } = this.get('model');

        // match the edge for current groundFloor with the data from model
        const edge = edgesExposed.find(option => option.name === currentEdge).value;

        if (edge) {

          // define at which index in the array is the 'area' property we want to set
          const edgeIndex = groundFloor.fields.findIndex(field => field.name === 'edge');
          const edgeField = groundFloor.fields.objectAt(edgeIndex);

          Ember.set(edgeField, 'value', edge);
        }
      }
    }
  },

  mapInsulationAndColumn()
  {
    const groundFloor = this.get('groundFloor');

    if (groundFloor && groundFloor.fields.length > 0) {
      // grab currentType from groundFloor fields array
      const currentType = groundFloor.fields.find(field => field.name === 'insulationType').value;

      if (currentType) {
        // grab Insulation type and thickness data from model
        const { insulationTypeThickness } = this.get('model');

        // grab thickness and column from model data, we need column as the second param with Edge to determine the final index for uValue
        const thickness = insulationTypeThickness.find(option => option.name === currentType).value;
        const column = insulationTypeThickness.find(option => option.name === currentType).col;

        if (thickness) {
          // define at which index in the array is the 'type' property we want to set
          const typeIndex = groundFloor.fields.findIndex(field => field.name === 'insulation');
          const typeField = groundFloor.fields.objectAt(typeIndex);

          Ember.set(typeField, 'value', thickness);
        }

        if (column) {
          // define at which index in the array is the 'column' property we want to set
          const columnIndex = groundFloor.fields.findIndex(field => field.name === 'column');
          const columnField = groundFloor.fields.objectAt(columnIndex);

          Ember.set(columnField, 'value', column);
        }
      }
    }
  },

  mapUValue()
  {
    const groundFloor = this.get('groundFloor');

    // grab both edge & insulation defined in mapEdge and mapInsulationAndColumn
    const edge = groundFloor.fields.find(field => field.name === 'edge').value;
    const insulation = groundFloor.fields.find(field => field.name === 'insulation').value;

    const insulationType = groundFloor.fields.find(field => field.name === 'insulationType').value;

    // define at which index in the array is the 'U-value' property we want to set
    const uValueIndex = groundFloor.fields.findIndex(field => field.name === 'U-value');
    const uValueField = groundFloor.fields.objectAt(uValueIndex);

    if (edge && insulation && insulationType) {
      // define Math.min 2nd value by checking insulation properties
      const secondMinArg = edge > 4 ? (insulation / 10) : 0;
      const searchedIndex = edge + Math.min(0.6, secondMinArg);

      // use the index to find the proper uValue for the floor
      const uValue = this.calculateUValue(searchedIndex);

      Ember.set(uValueField, 'value', uValue);
    }
    else {
      const customUValue = groundFloor.fields.find(field => field.name === 'U-value').value;
      Ember.set(uValueField, 'value', customUValue);
    }
  },

  mapHeatLoss()
  {
    const groundFloor = this.get('groundFloor');

    // grab area, DTD and uValue from groundFloor fields array
    const area = groundFloor.fields.find(field => field.name === 'area').value;
    const DTD = groundFloor.fields.find(field => field.name === 'DTD').value;
    const uValue = groundFloor.fields.find(field => field.name === 'U-value').value;

    if (area && DTD && uValue) {

      // define at which index in the array is the 'heatLoss' property we want to set
      const heatLossIndex = groundFloor.fields.findIndex(field => field.name === 'heatLoss');
      const heatLossField = groundFloor.fields.objectAt(heatLossIndex);

      // set it also as top level prop so we don't need to observe with double @each from parent
      Ember.set(groundFloor, 'heatLoss', area * DTD * uValue);

      Ember.set(heatLossField, 'value', area * DTD * uValue);
    }
  },

  calculateUValue(index)
  {
    const groundFloor = this.get('groundFloor');

    // grab uValues data from model
    const { uValues } = this.get('model');

    // grab shortLength and longLength from groundFloor fields array
    const shortLength = groundFloor.fields.find(field => field.name === 'shortLength').value;
    const longLength = groundFloor.fields.find(field => field.name === 'longLength').value;

    // make use of the column defined together with insulation to map the proper value
    let columnIndex = groundFloor.fields.find(field => field.name === 'column').value;

    let uValue = 0;

    // initialize floorData as null to allow switch to define the property depending on passed index
    let floorData;

    /* different cases have hard-coded ways of calculating floorData so we need to differentiate between them
    based on the Edge and Column calculated within the component */
    switch (index) {

      // define floorData based on the index that's passed to the function and is based on Edge and Column
      case 1: {
        floorData = uValues.fifth.find(opt => opt.index === parseInt(longLength, 10));
        break;
      }

      case 2: {
        floorData = uValues.fifth.find(opt => opt.index === parseInt(shortLength, 10));
        break;
      }

      case 3: {
        // calculate the sum of dimensions to find proper index in uValues table
        const dimSum = parseInt(shortLength, 10) + parseInt(longLength, 10);
        floorData = uValues.first.find(opt => opt.index === dimSum);
        break;
      }

      case 4: {
        floorData = uValues.second.find(opt => opt.index === parseInt(shortLength, 10));
        break;
      }

      case 5.3:
      case 5.4:
      case 5.5:
      case 5.6: {
        floorData = uValues.third.find(opt => opt.index === parseInt(longLength, 10));
        columnIndex -= 1;
        break;
      }

      case 6.3:
      case 6.4:
      case 6.5:
      case 6.6: {
        floorData = uValues.forth.find(opt => opt.index === parseInt(longLength, 10));
        columnIndex -= 1;
        break;
      }
    }

    //after switch statement check if we have found correct data under the index, if so, set them
    if (floorData && floorData.values) {
      // compensate 2 for code index starting at 0 and xml counting index as 1st field
      uValue = floorData.values[columnIndex - 2];
    }

    return uValue;
  },

});
