const db = require("../models");
const Transactions = db.transactions;
const DetailTransactions = db.detail_transactions;
const Op = db.Sequelize.Op;

async function checkTransactionExpired() {
  console.log("Cron Running...");
  try {
    // 15 minutes expired
    const expirationThreshold = 15 * 60 * 1000;
    const currentTime = new Date();
    const expirationTime = new Date(currentTime - expirationThreshold);

    const expiredTransactions = await Transactions.update(
      { status: "expired" },
      {
        where: {
          created_at: {
            [Op.lt]: expirationTime,
          },
          status: "idle",
        },
      }
    );

    const expiredDetailTransactions = await DetailTransactions.update(
      { status: "expired" },
      {
        where: {
          created_at: {
            [Op.lt]: expirationTime,
          },
          status: "idle",
        },
      }
    );

    console.log(
      `Checked ${expiredTransactions[0]} transactions for expiration.`
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = checkTransactionExpired;
