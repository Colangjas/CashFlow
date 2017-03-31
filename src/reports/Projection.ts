import moment from 'moment'
var _ = require('lodash')
var numeral = require('numeral')

export class Projection {

	account: Account

	constructor(account: Account) {
		this.account = account
	}

	today(): number {
		var start = moment().startOf('day').subtract(1, 'seconds')
		var end = moment().endOf('day').add(1, 'seconds')
		
		return this.between(start, end)
	}

	week(): number {
		var start = moment().startOf('week').subtract(1, 'seconds')
		var end = moment().endOf('week').add(1, 'seconds')
		
		return this.between(start, end)
	}

	month(): number {
		var start = moment().startOf('month').subtract(1, 'seconds')
		var end = moment().endOf('month').add(1, 'seconds')
		
		return this.between(start, end)
	}

	year(): number {
		var start = moment().startOf('year').subtract(1, 'seconds')
		var end = moment().endOf('year').add(1, 'seconds')
		
		return this.between(start, end)
	}

	between(start: any, end: any): number {
		var transactions = this.getTransactionsBetween(start, end)
		return this.calculateTransactionBalance(transactions)
	}

	upto(end?: any): number {
		end = (end === undefined) ? moment() : end

		var transactions = this.getTransactionsBefore(end)
		return this.calculateTransactionBalance(transactions)
	}

	calculateTransactionBalance(transactions: Array<Transaction>): number {
		var balance = numeral(this.account.getBalance())

		_.each(transactions, (transaction) => {
			if(transaction.amount < 0)
			{
				return balance.subtract(0 - transaction.amount)
			}

			return balance.add(transaction.amount)
		})

		return balance.value()
	}

	getTransactionsBefore(end: any): Array<Transaction> {
		// isSameOrBefore

		return this.filterAccountTransactions((transaction) => transaction.date.isSameOrBefore(end))
	}

	getTransactionsBetween(start: any, end: any): Array<Transaction> {
		return this.filterAccountTransactions((transaction) => transaction.date.isBetween(start, end))
	}

	filterAccountTransactions(test: any): Array<Transaction> {
		var accountTransactions = this.account.getTransactions()
		var validTransactions = []

		validTransactions = _.filter(accountTransactions, (transaction) => {
			return test(transaction)
		})

		return validTransactions
	}
}