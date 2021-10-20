interface GameDisplay{
    log(question: string): Promise<string>;
    close(): void;
}

export default GameDisplay;