const LoggerStreamAdapter = {
  toStream(logger) {
    return {
      write(message) {
        logger.info(message.slice(0, -1));
      }
    };
  }
};

export default LoggerStreamAdapter;
