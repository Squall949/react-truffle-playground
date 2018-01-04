var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var LiveStream = artifacts.require("./LiveStream.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(LiveStream);
};
