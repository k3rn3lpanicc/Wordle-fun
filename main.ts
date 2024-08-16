import axios from 'axios';
import { fwords } from './words';
const prompt = require('prompt-sync')();

enum ConditionType {
	HAS_AND_CORRECT_PLACE,
	HAS_BUT_NOT_CORRECT_PLACE,
	DOESNT_HAVE,
}

class Condition {
	character: string;
	type: ConditionType;
	position: number;

	constructor(character: string, type: ConditionType, position: number) {
		this.character = character;
		this.type = type;
		this.position = position;
	}

	match(str: string): boolean {
		if (this.type === ConditionType.DOESNT_HAVE) {
			return !str.includes(this.character);
		} else if (this.type === ConditionType.HAS_AND_CORRECT_PLACE) {
			return str[this.position - 1] === this.character;
		} else if (this.type === ConditionType.HAS_BUT_NOT_CORRECT_PLACE) {
			return (
				str.includes(this.character) &&
				str[this.position - 1] !== this.character
			);
		}
		return true;
	}

	equals(other: Condition) {
		const firstCheck =
			this.character === other.character && this.type === other.type;
		if (!firstCheck) return firstCheck;
		if (other.type === ConditionType.DOESNT_HAVE) {
			return firstCheck;
		}
		return firstCheck && other.position === this.position;
	}
}

class Solver {
	conditions: Condition[] = [];

	addCondition(character: string, type: ConditionType, position: number) {
		const _condition = new Condition(character, type, position);
		for (let i = 0; i < this.conditions.length; i++) {
			if (
				this.conditions[i].equals(_condition) ||
				(this.conditions[i].character === character &&
					this.conditions[i].type !==
						ConditionType.DOESNT_HAVE &&
					type === ConditionType.DOESNT_HAVE)
			) {
				return;
			}
		}
		this.conditions.push(_condition);
	}

	rank(inps: string[]): string[] {
		let output: string[] = [];
		const threshold = inps.length < 10 ? inps.length : 10;
		for (let i = 0; i < threshold; i++) {
			output.push(inps[i]);
		}
		return output;
	}

	guess() {
		let candidates: string[] = [];
		let legit = true;
		for (let i = 0; i < fwords.length; i++) {
			const word = fwords[i];
			legit = true;
			for (let j = 0; j < this.conditions.length; j++) {
				const _condition = this.conditions[j];
				if (!_condition.match(word)) {
					legit = false;
					break;
				}
			}
			if (legit) {
				candidates.push(word);
			}
		}
		console.log(
			`>> Percent of remaining words: ${
				(candidates.length / fwords.length) * 100
			}%`
		);
		return this.rank(candidates);
	}
}

class Main {
	solver: Solver = new Solver();

	handleWord(word: string) {
		const intifiy = (inp: string) => {
			const res: number[] = [];
			for (let i = 0; i < inp.length; i++) {
				if (inp[i] !== '0') res.push(Number(inp[i]));
			}
			return res;
		};
		const greens = intifiy(
			prompt(
				'Enter green spot positions(like 214, if not any just put a 0): '
			)
		);
		const yellow = intifiy(prompt('Yellow spot positions(like 123): '));
		let non: number[] = [];
		for (let i = 1; i <= 5; i++) {
			if (!greens.includes(i) && !yellow.includes(i)) {
				non.push(i);
			}
		}

		for (let i = 0; i < greens.length; i++) {
			this.solver.addCondition(
				word[greens[i] - 1],
				ConditionType.HAS_AND_CORRECT_PLACE,
				greens[i]
			);
		}
		for (let i = 0; i < yellow.length; i++) {
			this.solver.addCondition(
				word[yellow[i] - 1],
				ConditionType.HAS_BUT_NOT_CORRECT_PLACE,
				yellow[i]
			);
		}
		for (let i = 0; i < non.length; i++) {
			this.solver.addCondition(
				word[non[i] - 1],
				ConditionType.DOESNT_HAVE,
				-1
			);
		}

		console.log('\n\n');
	}

	main() {
		while (true) {
			console.log(
				'____________________________________________________'
			);
			const word = prompt('What word did you put in? ');
			if (word === 'exit') {
				process.exit(0);
			}
			this.handleWord(word);
			console.log(`Try these:`);
			const res = this.solver.guess();
			if (res.length === 0) {
				console.log('No words found!');
				process.exit(0);
			}
			for (let i = 0; i < res.length; i++) {
				console.log(`\t${res[i]}`);
			}
		}
	}
}

// console.log('Ok, lets start...');
// new Main().main();
