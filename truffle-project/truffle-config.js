module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    loc_development_development: {
      network_id: "*",
      port: 8545,
      host: "127.0.0.1",
    },
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.18",
    },
  },
};
