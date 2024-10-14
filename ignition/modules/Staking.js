const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const StakingModule = buildModule("StakingModule", (m) => {
  const staking = m.contract("Staking");

  return { staking };
});

module.exports = StakingModule;