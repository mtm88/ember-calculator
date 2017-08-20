import Ember from 'ember';

export default Ember.Component.extend({

  totalHeatLoss: Ember.computed(
    'rooms.@each.heatLoss',
    'rooms.groundFloors.@each.heatLoss',
    'rooms.walls.@each.heatLoss',
    'rooms.windows.@each.heatLoss',
    function totalHeatLoss()
    {
      let heatLoss = 0;
      this.get('rooms').forEach((room) => {
        if (room.combinedHeatLoss && !isNaN(room.combinedHeatLoss)) {
          heatLoss += room.heatLoss;
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
    function totalContrToDHL()
    {
      const rooms = this.get('rooms');

      let totalContributionToHeating = 0;

      rooms.forEach((room) => {
        if (room.isConvOrRad) {
          const heatLoss = room.fields.find(field => field.name === 'heatLoss').value;
          const intermittencyFactor = this.get('intermittencyFactor');

          let emitterSize;

          switch (room.emitterType) {

            case 'Radiator': {
              emitterSize = heatLoss / (room.radSurfFinFactor * room.radEncFactor * intermittencyFactor * room.radTempFactor);
              break;
            }
            case 'Convector': {
              emitterSize = heatLoss / (intermittencyFactor * room.convTempFactor);
              break;
            }
          }

          totalContributionToHeating += room.heatLoss;
          Ember.set(room, 'reqEmitterSize', emitterSize);
        }
      });

      return totalContributionToHeating;
    }
  ),

  intermittencyFactor: Ember.computed(
    'siteInputsConfig.@each.value',
    function intermittencyFactor()
    {
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

  selectedDFT: null,

  MWT: Ember.computed.alias('selectedDFT.value'),

});

