export function initialize(container, application) {
  application.inject('controller', 'boardValidatorService', 'service:board-validator');
}

export default {
  name: 'board-validator-service',
  initialize: initialize
};
