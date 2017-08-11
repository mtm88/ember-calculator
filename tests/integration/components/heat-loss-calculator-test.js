import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('heat-loss-calculator', 'Integration | Component | heat loss calculator', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{heat-loss-calculator}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#heat-loss-calculator}}
      template block text
    {{/heat-loss-calculator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
