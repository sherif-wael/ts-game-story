import GameDisplay from "./GameDisplay";
import readline from "readline";

class ConsoleDisplay implements GameDisplay{
    private readline: readline.Interface;

    constructor(){
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    }

    public log(question: string): Promise<string>{
        return new Promise(resolve => {
            this.readline.question(question, answer => resolve(answer));
        });
    }

    public close(): void{
        this.readline.close();
    }
}

export default ConsoleDisplay;