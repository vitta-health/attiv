import container from '../../application/config/Container';

function createControllerRoutes(controllerUri) {
  const Controller = container.resolve(controllerUri);

  return Controller.getRouter();
}

export default createControllerRoutes;
