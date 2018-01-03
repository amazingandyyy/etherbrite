const EtherbritePlatformContract = artifacts.require('./EtherbritePlatform.sol');

module.exports = function(deployer) {
  deployer.deploy(EtherbritePlatformContract);
};
