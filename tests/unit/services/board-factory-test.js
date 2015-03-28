/* jshint expr:true */
import {
  assert,
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import Cell from 'sudoku/models/cell';

describeModule(
  'service:board-factory',
  'BoardFactoryService',
  {
  },
  function() {
    it('createBoard()', function() {
      var factory = this.subject();

      expect(factory).to.be.ok;
      expect(factory.createBoard).to.be.function;
    });
  }
);
