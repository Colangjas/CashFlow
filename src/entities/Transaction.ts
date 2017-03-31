var moment = require('moment')

export class Transaction {

	transactionName: string

	amount: number

	date: any

	repeat: any

	constructor(name: string, amount: number, date: string, repeat: number) {
		this.transactionName = name

		this.amount = amount

		this.date = moment(date, 'YYYY-MM-DD')

		this.repeat = repeat
	}

	getName(): string {
		return this.transactionName
	}

	getAmount(): number {
		return this.amount
	}

	getDate(): any {
		return this.date
	}
}