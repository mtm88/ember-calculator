import Ember from 'ember';

export default Ember.Component.extend({

  totalHeatLoss: Ember.computed(
    'rooms.@each.heatLoss',
    'rooms.@each.combinedHeatLoss',
    'rooms.@each.groundFloors.@each.heatLoss',
    'rooms.walls.@each.heatLoss',
    'rooms.windows.@each.heatLoss',
    function totalHeatLoss()
    {
      let heatLoss = 0;
      // get combinedHeatLoss that's defined on each room and give a sum
      this.get('rooms').forEach((room) => {
        if (room.combinedHeatLoss && !isNaN(room.combinedHeatLoss)) {
          heatLoss += room.combinedHeatLoss;
        }
      });
      return heatLoss;
    }
  ),

  totalContrToDHL: Ember.computed(
    'rooms.@each.radSurfFinFactor',
    'rooms.@each.radEncFactor',
    'rooms.@each.nCoefficient',
    'rooms.@each.convTempFactor',
    'rooms.@each.radTempFactor',
    'rooms.@each.combinedHeatLoss',
    'rooms.@each.isConvOrRad',
    function totalContrToDHL()
    {
      const rooms = this.get('rooms');

      // initialize the totalContrToDHL counter
      let totalContributionToHeating = 0;
      
      // check for the flag on the room that defines whether a room has a Convector or Radiator
      rooms.forEach((room) => {
        if (room.isConvOrRad) {

          // find heatLoss value in the room fields array
          const heatLoss = room.fields.find(field => field.name === 'heatLoss').value;
          const intermittencyFactor = this.get('intermittencyFactor');

          let emitterSize;

          // emitter size calculation is different depending on the type of the emitter
          switch (room.emitterType) {

            case 'Radiator': {

              // find and define all the variables we need from room config
              const radSurfFinFactor = room.fields.find(field => field.name === 'radSurfFinFactor').value;
              const radEncFactor = room.fields.find(field => field.name === 'radEncFactor').value;
              const radTempFactor = room.fields.find(field => field.name === 'radTempFactor').value;
              
              // define emitterSize for this specific room so later on we know whether it counts to totalContributionToHeating
              emitterSize = heatLoss / (radSurfFinFactor * radEncFactor * intermittencyFactor * radTempFactor);
              break;
            }
            case 'Convector': {

              // find and define all the variables we need from room config
              const convTempFactor = room.fields.find(field => field.name === 'convTempFactor').value;

              // define emitterSize for this specific room so later on we know whether it counts to totalContributionToHeating
              emitterSize = heatLoss / (intermittencyFactor * convTempFactor);
              break;
            }
          }
          
          // Room has contribution to heating only if it's emitter size is bigger than 0
          if (emitterSize > 0) {
            totalContributionToHeating += room.combinedHeatLoss;
          }
        }
      });

      return totalContributionToHeating;
    }
  ),

  intermittencyFactor: Ember.computed(
    'siteInputsConfig.@each.value',
    function intermittencyFactor()
    {
      
      // grab the heatingDuration param from siteInputsConfig
      const heatingDuration = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration').value;

      // hardcoded values for intermittencyFactor
      if (heatingDuration === 'Intermittent') {
        return 0.83;
      }
      else {
        return 1;
      }
    }
  ),

  DFTOptions: [
    {
      "name": "Design flow temperature (Tf) ≤35°C",
      "value": 32.5,
    },
    {
      "name": "Design flow temperature (Tf) ≤45°C",
      "value": 41.8,
    },
    {
      "name": "Design flow temperature (Tf) ≤55°C",
      "value": 51.1
    },
  ],

  MWT: Ember.computed.alias('selectedDFT.value'),

});

