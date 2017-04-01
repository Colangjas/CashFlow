var _ = require('lodash')

export class Account {

	accountName: string

	balance: number

	transactions: Array<any>

	constructor(name: string, balance: number) {
		this.accountName = name

		this.balance = balance

		this.transactions = []
	}

	addTransaction(transaction: Transaction): Account {
		this.transactions.push(transaction)

		return this
	}

	addTransactions(transactions: Array<Transaction>): Account {
		_.each(transactions, (transaction) => this.addTransaction(transaction))

		return this
	}

	getBalance(): number {
		return this.balance
	}

	getTransactions(): Array<any> {
		return this.transactions
	}

	clearTransactions(): Account {
		this.transactions = []

		return this
	}
}