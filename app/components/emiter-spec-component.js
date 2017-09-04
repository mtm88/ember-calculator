import Ember from 'ember';

export default Ember.Component.extend({

  totalHeatLoss: Ember.computed(
    'rooms.@each.heatLoss',
    'rooms.@each.combinedHeatLoss',
    'rooms.@each.groundFloors.@each.heatLoss',
    'rooms.walls.@each.heatLoss',
    'rooms.windows.@each.heatLoss',
    function totalHeatLoss() {
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
    'rooms.@each.heatLoss',
    'rooms.@each.isConvOrRad',
    'rooms.groundFloors.@each.heatLoss',
    'rooms.walls.@each.heatLoss',
    'rooms.windows.@each.heatLoss',
    function totalContrToDHL() {
      const rooms = this.get('rooms');

      let totalContributionToHeating = 0;

      rooms.forEach((room) => {
        debugger;
        // check for the flag on the room that defines whether a room has a Convector or Radiator
        if (room.isConvOrRad) {
          // find heatLoss value in the room fields array
          const heatLoss = room.fields.find(field => field.name === 'heatLoss').value;
          const intermittencyFactor = this.get('intermittencyFactor');

          let emitterSize;

          // emitter size calculation is different depending on the type of the emitter
          switch (room.emitterType) {

            case 'Radiator': {
              const radSurfFinFactor = room.fields.find(field => field.name === 'radSurfFinFactor').value;
              const radEncFactor = room.fields.find(field => field.name === 'radEncFactor').value;
              const radTempFactor = room.fields.find(field => field.name === 'radTempFactor').value;
              emitterSize = heatLoss / (radSurfFinFactor * radEncFactor * intermittencyFactor * radTempFactor);
              break;
            }
            case 'Convector': {
              const convTempFactor = room.fields.find(field => field.name === 'convTempFactor').value;
              emitterSize = heatLoss / (intermittencyFactor * convTempFactor);
              break;
            }
          }

          if (emitterSize > 0) {
            totalContributionToHeating += room.combinedHeatLoss;
          }
          // set to toggle observer on parent component so that we can update the results in certificate component
          // this.set('totalRadConv', emitterSize);

          // Ember.set(room, 'reqEmitterSize', emitterSize);
        }
      });

      return totalContributionToHeating;
    }
  ),

  intermittencyFactor: Ember.computed(
    'siteInputsConfig.@each.value',
    function intermittencyFactor() {
      // grab the heatingDuration param from siteInputsConfig
      const heatingDuration = this.get('siteInputsConfig').find(field => field.name === 'heatingDuration').value;

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

