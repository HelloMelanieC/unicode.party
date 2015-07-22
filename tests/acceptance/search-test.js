import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'unicodeparty/tests/helpers/start-app';

var application;

function getChars() {
  return new Set(Ember.$('.emoji-char').toArray().map(el => el.innerText));
}

module('Acceptance | search', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('search for horse emoji', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/');
  });
  fillIn('input', 'horse');
  andThen(() => {
    let characters = getChars();
    assert.equal(Ember.$('.emoji-tile').length, 4, '4 horse emoji');
    assert.ok(!characters.has('🎈'), 'balloon emoji not found');
    assert.ok(characters.has('🐴'), 'horse emoji found');
  });
});
