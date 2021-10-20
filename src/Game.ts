import Level from "./Level";
import GameDisplay from "./GameDisplay";

class Game{
    private level: Level;
    private display: GameDisplay;

    constructor(level: Level, display: GameDisplay){
        this.level = level;
        this.display = display;
    }

    public start(){
        this.log(this.level.getStatement());
    }

    private async log(line: string): Promise<void>{
        const action = await this.display.log(line);
        this.handleAction(action);
    }

    private handleAction(action: string){
        this.updateLevel(action);

        if(this.level.isWon()){
            this.handleLevelWon();
            return;
        }

        if(this.level.isExitted()){
            this.handleLevelExit();
            return;
        }

        this.log(this.level.getStatement());
    }

    private updateLevel(action: string){
        try{
            this.level.update(action);
        }catch(err){
            this.handleInvalidLevelAction();
        }
    }

    private handleInvalidLevelAction(){
        console.log("Invalid Action.");
        this.log(this.level.getStatement());
    }

    private handleLevelWon(){
        console.log("Congratulation! You have won the level");
        this.display.close();
    }

    private handleLevelExit(){
        console.log("Join again to complete the game.");
        this.display.close();
    }
}

export default Game;