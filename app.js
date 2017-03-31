const CashFlow = require('./build/CashFlow')
const moment = require('moment')

var account = CashFlow.createAccount('Current account', 1000.00)
CashFlow.importAccountTransactions(account, require('./transactions'))
	.accountProjection(account, moment(), moment('2017-10-01', 'YYYY-MM-DD'))