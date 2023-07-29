const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Singing Concert",
      cost: tokens(3),
      tickets: 0,
      date: "Augest 31",
      time: "6:00PM IST",
      location: "Mumbai India"
    },
    {
      name: "Seminar",
      cost: tokens(1),
      tickets: 125,
      date: "December 2",
      time: "1:00PM IST",
      location: "Andheri, India"
    },
    {
      name: "Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "June 9",
      time: "10:00AM IST",
      location: "Vasai,India"
    },
    {
      name: "Running Marathon",
      cost: tokens(5),
      tickets: 0,
      date: "November 11",
      time: "2:30PM IST",
      location: "Vasai, India"
    },
    {
      name: "Coding",
      cost: tokens(1.5),
      tickets: 125,
      date: " 23 October",
      time: "11:00AM IST",
      location: "Andheri, India"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});