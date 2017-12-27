module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4700000
    },
    rinkeby: {
      host: 'localhost',
      port: 8545,
      network_id: 4, // rinkeby
      gas: 6000000
    },
    production: {
      host: 'localhost',
      port: 8545,
      network_id: 1,
      gas: 6000000
    }
  }
};
