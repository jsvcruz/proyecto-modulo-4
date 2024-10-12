const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Staking contract", () => {


beforeEach(async function () {
    token = await ethers.getContractFactory("Token");         
    token = await token.deploy(); 
    
});

 /*   
 const deployTokenFixture = async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    return { token, owner, addr1, addr2 };
 };
*/

  const deployStakingFixture = async () => {
    
    //const { token } = await loadFixture(deployTokenFixture); 

    const [owner, addr1, addr2] = await ethers.getSigners();

    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(token);

    return { staking, owner, addr1, addr2 };
  };

  it("Should allow only owner to approve address", async () => {
    
    const { staking, owner, addr1, addr2 } = await loadFixture(deployStakingFixture); 

    await expect(staking
        .connect(addr1)
        .approve(addr2))
        .to.be.rejectedWith("Ownable: caller is not the owner");


  });

  /*
  it("Should assign the total supply of tokens to the owner", async () => {
    const { token, owner } = await loadFixture(deployTokenFixture);
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  describe("Transactions", () => {
    it("Should transfer tokens between accounts", async () => {
      const { token, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

      await token.transfer(addr1.address, 50n * 10n ** 18n);
      expect(await token.balanceOf(addr1.address)).to.equal(50n * 10n ** 18n);

      await token.connect(addr1).transfer(addr2.address, 50n * 10n ** 18n);
      expect(await token.balanceOf(addr2.address)).to.equal(50n * 10n ** 18n);
      expect(await token.balanceOf(addr1.address)).to.equal(0n);
    });

    it("Should fail if sender doesn't have enough tokens", async () => {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await expect(
        token.connect(addr1).transfer(owner.address, 1n * 10n ** 18n)
      ).to.be.revertedWith("Insufficient balance");

      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async () => {
      const { token, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await token.transfer(addr1.address, 100n * 10n ** 18n);
      await token.transfer(addr2.address, 50n * 10n ** 18n);

      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150n * 10n ** 18n);

      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100n * 10n ** 18n);

      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50n * 10n ** 18n);
    });
  });
  */
});