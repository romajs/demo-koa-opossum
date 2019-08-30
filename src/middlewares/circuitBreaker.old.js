const CircuitBreaker = require('opossum');

const defaultOptions = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000, // After 30 seconds, try again.
};

const defaultErrorHandler = ctx => {
  ctx.body = 'Sorry, out of service right now';
};

const circuitBreaker = (options = defaultOptions, errorHandler = defaultErrorHandler) => {
  console.log('Creating circuitBreaker');
  const circuit = new CircuitBreaker(() => null, options);
  circuit.on('open', () => console.log('Circuit open.'));
  circuit.on('halfOpen', () => console.log('Circuit halfOpen.'));
  circuit.on('close', () => console.log('Circuit closed.'));
  circuit.on('fallback', () => console.log('Executing fallback.'));
  circuit.fallback(errorHandler);
  return (ctx, next) => {
    circuit.action = next;
    circuit.fire(ctx).catch(console.error);
  };
};

module.exports = circuitBreaker;
