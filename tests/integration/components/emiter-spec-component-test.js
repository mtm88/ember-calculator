import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('emiter-spec-component', 'Integration | Component | emiter spec component', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{emiter-spec-component}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#emiter-spec-component}}
      template block text
    {{/emiter-spec-component}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
