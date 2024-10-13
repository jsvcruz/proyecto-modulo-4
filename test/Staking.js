const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Staking contract", () => {


beforeEach(async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    token = await ethers.getContractFactory("Token");         
    token = await token.deploy();  
    console.log('Balance BeforeEach:'+  (await token.balanceOf(owner.address)) );
    
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

  it("Approve function must include address", async () => {
    
   
    const { staking, owner, addr1, addr2 } = await loadFixture(deployStakingFixture); 

    // First approve owner so it can stake
    await staking.approve(owner.address);

    //console.log('Approved:'+ staking.approved(owner.address));           
    expect(await staking.checkApproved(owner.address)).to.equal(true);

    
  
});


/*
  it("Stake should transfer tokens from sender to contract", async () => {
    
   
    const { staking, owner, addr1, addr2 } = await loadFixture(deployStakingFixture); 
    
    //const ownerBalance = await token.balanceOf(tokenOwner.address);
    //expect(await token.totalSupply()).to.equal(ownerBalance);
    
    // First approve owner so it can stake
    await staking.approve(owner.address);
    console.log('Staking Approved:'+ await staking.checkApproved(owner.address) ); 

    //console.log('Approved:'+ staking.approved(owner.address));     
    console.log('Staking Owner:'+ owner.address );       
    //console.log('Balance Second:'+  ( await token.balanceOf(towner.address)) );

    await token.approve(owner.address, 1000);

    await staking.connect(owner).stake(100));
    console.log('Total Staked:'+ (await staking.getTotalStaked()) );    
    expect(await staking.getTotalStaked()).to.equal(100);
    //expect(await token.balanceOf(addr1.address)).to.equal(0n);
    
  
});

*/
  
});