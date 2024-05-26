import {expect} from "chai";
import {ethers,deployments,getNamedAccounts} from "hardhat";

describe("Deployment Test", () => {
const setupFixture = deployments.createFixture(async () => {
    await deployments.fixture();
    const ownerSigner = await getNamedAccounts();

    const coinName = 'protoToken';
    const coinsymbol = 'GRF';
    const coinOwner  = ownerSigner.deployer;

    const SmartContract = await ethers.deployContract('BasicERC20',
    [coinName,coinsymbol,coinOwner], await ethers.getSigner(coinOwner));



})

});
