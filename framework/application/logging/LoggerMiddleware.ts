import LoggerStreamAdapter from '../../crosscutting/logging/LoggerStreamAdapter';

const morgan = require('morgan');

module.exports = ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger),
  });
};
