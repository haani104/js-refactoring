const plays = require("./plays.json");
const invoices = require("./invoices.json");

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    const play = playFor(perf);
    let thisAmount = amountFor(play, perf);

    //add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);

    //add extra credit for for every ten comedy attendees
    if ("comedy" === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    result += `  ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  console.log(result);

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(play, aPerformance) {
    let result = 0;
    switch (play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 2000 * (aPerformance.audience - 20);
        }
        break;
      default:
        throw new Error(`unknown type ${play.type}`);
    }
    return result;
  }
}

statement(invoices[0], plays);
