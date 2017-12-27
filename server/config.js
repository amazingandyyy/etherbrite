require("dotenv").config();

export default {
  PORT: process.env.PORT || 3000,
  contractPath: "../../contracts/event-contracts/build/contracts"
}