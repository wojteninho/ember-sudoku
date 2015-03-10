/* jshint expr:true */
import {
  assert,
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'service:board-validator',
  'BoardValidatorService',
  {
    needs: ['service:board-factory']
  },
  function() {

    var assertCell = function(testedCell, board) {
      var cell = board.cellAt(testedCell.get('x'), testedCell.get('y'));

      expect(cell).to.be.ok;
      expect(cell.get('number')).to.be.eq(testedCell.get('number'));
    };

    it('exists', function() {
      var boardFactoryService = this.container.lookup('service:board-factory');
      var board = boardFactoryService.createBoard();
      var validator = this.subject();

      assert.isObject(validator);
    });

    it('BoardValidatorService.validate() fails when 2 cells in row are duplicated', function() {
      var boardFactoryService = this.container.lookup('service:board-factory');
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        board.cellAt(0, 0),
        board.cellAt(0, 8)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(2);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when 2 cells in column are duplicated', function() {
      var boardFactoryService = this.container.lookup('service:board-factory');
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        board.cellAt(0, 0),
        board.cellAt(8, 0)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(2);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when 2 cells in block are duplicated', function() {
      var boardFactoryService = this.container.lookup('service:board-factory');
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        board.cellAt(0, 0),
        board.cellAt(0, 1)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(2);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });

    it('BoardValidatorService.validate() fails when 2 cells in row & 2 cells in column & 2 cells in block are duplicated', function() {
      var boardFactoryService = this.container.lookup('service:board-factory');
      var board = boardFactoryService.createBoard();
      var validator = this.subject();
      var cells = [
        /**
         * row: board.cellAt(0, 0) + board.cellAt(0, 8)
         * column: board.cellAt(0, 0) + board.cellAt(8, 0)
         * block: board.cellAt(0, 0) + board.cellAt(1, 1)
         */
        board.cellAt(0, 0),
        board.cellAt(0, 8),
        board.cellAt(8, 0),
        board.cellAt(1, 1)
      ];

      cells.setEach('number', 1);

      var result = validator.validate(board);

      expect(result).to.be.ok;
      expect(result.get('valid')).to.be.false;
      expect(result.get('invalidCells').length).to.be.eq(4);

      cells.forEach(function(cell) {
        assertCell(cell, board);
      });
    });
  }
);
