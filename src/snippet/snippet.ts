// "Print to console": {
// 	"prefix": "log",
// 	"body": [
// 		"console.log('$1');",
// 		"$2"
// 	],
// 	"description": "Log output to console"
// }
export class Snippet {
    name: string;
    prefix: string;
    body: string[];
    description: string;

    constructor(name: string, prefix: string, body: string[], description: string) {
        this.name = name;
        this.prefix = prefix;
        this.body = body;
        this.description = description;
    }
}