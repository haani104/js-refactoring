const plays = require("./plays.json");
const invoices = require("./invoices.json");
const createStatementData = require("./createStatementData.js");

function statement(invoice, plays) {
  renderPlainText(createStatementData(invoice, plays));
}

statement(invoices[0], plays);

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  console.log(result);
}

function htmlStatement(invoice, plays) {
  renderHTML(createStatementData(invoice, plays));
}

function renderHTML(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table"
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  console.log(result);
}
