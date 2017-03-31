var _ = require('lodash')

import { Repeatable } from '../entities'

export class TransactionScheduler {

	transactions: Array<Transaction>

	transaction: Transaction

	repeatedTransactions: Array<Transaction>

	constructor() {
		this.repeatedTransactions = []
	}

	scheduleManyUpto(transactions: Array<Transaction>, end: any) {
		this.transactions = transactions

		_.each(this.transactions, (transaction) => this.scheduleOneUpto(transaction, end))

		return this.repeatedTransactions
	}

	scheduleOneUpto(transaction: Transaction, end: any) {
		this.transaction = transaction

		switch(transaction.repeat) {
			case Repeatable.DAILY:
					this.createRepeatedTransactions(1, 'days', end)
				break;
			case Repeatable.WEEKLY:
					this.createRepeatedTransactions(1, 'weeks', end)
				break;
			case Repeatable.MONTHLY:
					this.createRepeatedTransactions(1, 'months', end)
				break;
			case Repeatable.QUARTERLY:
					this.createRepeatedTransactions(4, 'months', end)
				break;
		}
	}

	createRepeatedTransactions(increment: number, x: string, end: any) {
		var trans = _.cloneDeep(this.transaction)
		var next = trans.date

		do {
			next = next.clone().add(increment, x)
			
			if(next.isBefore(end)) {
				let repeatedTransaction = _.cloneDeep(this.transaction)
				repeatedTransaction.date = next
				repeatedTransaction.repeat = -1
				this.repeatedTransactions.push(repeatedTransaction)
			}

		} while(next.isBefore(end))
	}
}