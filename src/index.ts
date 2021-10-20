import Game from "./Game";
import ConsoleDisplay from "./ConsoleDisplay";
import levelOne from "./levels/levelOne";

const display = new ConsoleDisplay();
const game = new Game(levelOne, display);

game.start();