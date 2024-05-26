import { expect } from "chai"
import { ethers, deployments, getNamedAccounts } from "hardhat"


describe("Deployment Test", () => {
    const setupFixture = deployments.createFixture(async () => {
        await deployments.fixture();
        const ownerSigner = await getNamedAccounts();

        const name = "myCoin";
        const symbol = "X";
        const coinOwner = ownerSigner.deployer;

        const contract = await ethers.deployContract("BasicERC20", [name, symbol, coinOwner],
            await ethers.getSigner(coinOwner))

        return {
            contract,
            contractAddress: await contract.getAddress(),
            coinOwner,
            accounts: await ethers.getSigners(),
            contractConstructor: {
                name,
                symbol,
                coinOwner,
            }


        }
    })


    it("Should Return Valid Contract Configurations Passed In Constructor", async () => {
        const { contract, contractConstructor } = await setupFixture();
        expect(await contract.name()).to.equals("myCoin");
        expect(await contract.symbol()).to.equal("X");
        expect(await contract.owner()).to.equals(contractConstructor.coinOwner);



    })

});



