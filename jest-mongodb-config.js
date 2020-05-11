module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'test',
      port: 27017,
    },
    binary: {
      version: '4.2.6',
      skipMD5: true,
    },
    autoStart: false,
  },
};
