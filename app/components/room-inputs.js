import Ember from 'ember';

export default Ember.Component.extend({

  rooms: new Ember.A(),

  actions: {
    addRoom() {
      const rooms = this.get('rooms');
      const currentRoomsCount = rooms.length;
      rooms.pushObject({
        name: `Room ${currentRoomsCount + 1}`,
        fields: this.get('config'),
      });
    },
  },
});
