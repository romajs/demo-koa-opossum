const CircuitBreaker = require('opossum');

const defaults = {
  fallback: ctx => {
    ctx.body = 'Sorry, out of service right now';
    ctx.status = 500;
  },
  options: {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000, // After 30 seconds, try again.
  },
};

const create = (options = defaults.options, action, fallback = defaults.fallback) => {
  const circuit = new CircuitBreaker(action, options);
  circuit.fallback(fallback);
  circuit.on('timeout', err => console.log('Circuit breaker timeout.', err));
  circuit.on('open', () => console.log('Circuit breaker is now opened.'));
  circuit.on('halfOpen', () => console.log('Circuit breaker is now half open.'));
  circuit.on('close', () => console.log('Circuit breaker is now closed.'));
  circuit.on('fallback', () => console.log('Circuit breaker executing fallback.'));
  return (ctx, next) => circuit.fire(ctx).catch(next);
};

module.exports = {
  create,
};
