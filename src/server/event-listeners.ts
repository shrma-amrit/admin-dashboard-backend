export const onListening = function () {
  const addr = this.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`server listening on ${bind}`);
};

export const onError = function (error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = this.address();
  const port = address ? address.port : error.port;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`www - ${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`www - ${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};
