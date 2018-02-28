const moment = require('moment');
const scrapper = require('crypto-market-scrapper');
const GoogleSheetWrite = require('write2sheet');

// Id can be retrieved from link: https://docs.google.com/spreadsheets/d/<here is the id>/edit#gid=0
const sheet = new GoogleSheetWrite('<some id from google sheets>');

// Update date
const mydate = moment().format('YYYY/MM/DD HH:mm:ss');
const range = 'Sheet1!B2';

sheet.write([[mydate]], range);

// Update currencies
const currencies = scrapper.getCurrencies([{
  "description": "Garlicoin",
  "code": "GRLC",
  "url": "https://coinmarketcap.com/currencies/garlicoin/"
}, {
  "description": "Bitcoin   ",
  "code": "BTC",
  "url": "https://coinmarketcap.com/currencies/bitcoin/"
}]);

currencies.then(response => {
	const values = response.sort((a, b) => {
		return a.code.localeCompare(b.code);
	}).map(el => {
		return [el.description, el.code, el.usd];
	});
	// Write to sheet
	sheet.write(values, 'Sheet1!B5:D');
});
