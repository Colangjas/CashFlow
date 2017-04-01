const CashFlow = require('../build/CashFlow')
const moment = require('moment')

var account = CashFlow.createAccount('Current account', 100)
var start = moment('2017-01-01').startOf('year').subtract(1, 'seconds')
var end = moment('2017-01-01').endOf('year')

account.clearTransactions()
var yearlyOutgoing = CashFlow.importAccountTransactions(account, [
	{
		name: 'Prime',
		amount: -79,
		date: '2017-01-01',
		repeat: 4
	}
])
.accountProjection(account, start, end)
console.log('Quarterly outgoing passed:', yearlyOutgoing === 21, account.getTransactions().length)

account.clearTransactions()
var quarterlyOutgoing = CashFlow.importAccountTransactions(account, [
	{
		name: 'Water',
		amount: -20,
		date: '2017-01-01',
		repeat: 3
	}
])
.accountProjection(account, start, end)
console.log('Quarterly outgoing passed:', quarterlyOutgoing === 20, account.getTransactions().length)

account.clearTransactions()
var monthlyOutgoing = CashFlow.importAccountTransactions(account, [
	{
		name: 'Spotify',
		amount: -7.99,
		date: '2017-01-01',
		repeat: 2
	}
])
.accountProjection(account, start, end)
console.log('Monthly outgoing passed:', monthlyOutgoing === 4.12, account.getTransactions().length)

account.clearTransactions()
var weeklyOutgoing = CashFlow.importAccountTransactions(account, [
	{
		name: 'Charity',
		amount: -1,
		date: '2017-01-01',
		repeat: 1
	}
])
.accountProjection(account, start, end)
console.log('Weekly outgoing passed:', weeklyOutgoing === 47, account.getTransactions().length)

account.clearTransactions()
var dailyOutgoing = CashFlow.importAccountTransactions(account, [
	{
		name: 'Toll',
		amount: -0.2,
		date: '2017-01-01',
		repeat: 0
	}
])
.accountProjection(account, start, end)
console.log('Daily outgoing passed:', dailyOutgoing === 27, account.getTransactions().length)