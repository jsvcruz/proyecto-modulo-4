const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", () => {

  const deployTokenFixture = async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    //const initialSupply = 1000 * 10 ** 18 ;
    const token = await Token.deploy();

    return { token, owner, addr1, addr2 };
  };

  it("Should set the right owner", async () => {
    const initialSupply = 1000n * 10n ** 18n ;
    const { token, owner } = await loadFixture(deployTokenFixture);
    expect(await token.balanceOf(owner.address)).to.equal( initialSupply );
  });

  it("Should assign the total supply of tokens to the owner", async () => {
    const { token, owner } = await loadFixture(deployTokenFixture);
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });


});