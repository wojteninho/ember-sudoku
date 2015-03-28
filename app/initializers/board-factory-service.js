export function initialize(container, application) {
  application.inject('controller', 'boardFactoryService', 'service:board-factory');
}

export default {
  name: 'board-factory-service',
  initialize: initialize
};
