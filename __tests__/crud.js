'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-slim-module:crud', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/crud'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
