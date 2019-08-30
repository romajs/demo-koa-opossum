const app = require('./app');

const host = process.env.HTTP_HOST || 'localhost';
const port = process.env.HTTP_PORT || 3000;

let httpServer = null;

const start = () => new Promise((resolve, reject) => {
  try {
    httpServer = app.listen(port, host, () => {
      console.log('Http server started on:', httpServer.address());
      resolve(httpServer);
    });
  } catch (err) {
    reject(err);
  }
});

const stop = () => httpServer.close();

module.exports = {
  start,
  stop,
};
