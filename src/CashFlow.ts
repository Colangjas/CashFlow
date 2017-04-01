const _ = require('lodash')
const moment = require('moment')
const numeral = require('numeral')

import { Account, Transaction } from './entities'
import { TransactionScheduler } from './jobs'
import { Projection } from './reports'

class CashFlow {

	static accounts: Array<Account>

	constructor() {
		CashFlow.accounts = []
	}

	static createAccount(name: string, openingBalance: number): Account {
		CashFlow.accounts = CashFlow.accounts || []

		const account = new Account(name, openingBalance)
		CashFlow.accounts.push(account)

		return account
	}

	static getAccounts(): Array<Account> {
		return CashFlow.accounts
	}

	static importAccountTransactions(account: Account, transactions: Array<object>) {
		transactions = _.map(transactions, (transaction) => {
			const transaction = new Transaction(
				transaction.name,
				transaction.amount,
				transaction.date,
				transaction.repeat
			);

			return transaction
		})

		account.addTransactions(transactions)

		return this
	}

	static addAccountTransaction(account: Account, transaction: object) {
		const transaction = new Transaction(
			transaction.name,
			transaction.amount,
			transaction.date,
			transaction.repeat
		);

		account.addTransaction(transaction)

		return this
	}

	static accountProjection(account: Account, from: any, to: any) {
		const projection = new Projection(account)
		
		CashFlow.scheduleAccountTransactions(account, to);

		return projection.between(
			from, 
			to
		)
	}

	static scheduleAccountTransactions(account: Account, to: any) {
		const transactionScheduler = new TransactionScheduler
		
		const repeatedTransactions = transactionScheduler.scheduleManyUpto(
			account.getTransactions(), 
			to
		)

		account.addTransactions(repeatedTransactions)

		return this
	}
}

module.exports = CashFlow