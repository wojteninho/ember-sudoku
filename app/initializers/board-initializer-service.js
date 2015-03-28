export function initialize(container, application) {
  application.inject('service:board-factory', 'boardInitializerService', 'service:board-initializer');
}

export default {
  name: 'board-initializer-service',
  initialize: initialize
};
