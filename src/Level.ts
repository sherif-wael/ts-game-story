import GameStage from "./GameStage";

type LevelStatus = "WON" | "EXIT" | "PLAYING";

interface LevelProps{
    stages: GameStage[];
    currentStage: GameStage;
    initialStage: GameStage;
}

class Level{
    private stages: GameStage[];
    private currentStage: GameStage;
    private initialStage: GameStage;
    private status: LevelStatus;

    constructor(props: LevelProps){
        this.initialStage = props.initialStage;
        this.currentStage = props.currentStage;
        this.stages = props.stages;
        this.status = "PLAYING";
    }

    public getCurrentStage(): GameStage{
        return this.currentStage;
    }

    public setCurrentStage(newStage: GameStage): void{
        this.currentStage = newStage;
    }

    public isWon(): boolean{
        return this.status === "WON";
    }

    public isExitted(): boolean{
        return this.status === "EXIT";
    }

    public isPlaying(): boolean{
        return this.status === "PLAYING";
    }

    public reset(): void{
        this.currentStage = this.initialStage;
        this.status = "PLAYING";
    }

    public win(): void{
        this.status = "WON";
    } 

    public exit(): void{
        this.status = "EXIT";
    }

    public play(): void{
        this.status = "PLAYING";
    }

    public getStagesCount(): number{
        return this.stages.length;
    }

    public update(value: string): Level{
        this.currentStage.resolve(value)();
        return this;
    }

    public getStatement(): string{
        return this.currentStage.toString();
    }
}

export default Level;