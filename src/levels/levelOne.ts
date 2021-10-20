import GameStage from "../GameStage";
import Level from "../Level";

function createLevelOne(): Level{
    const intro = new GameStage("INTRO", "Hi John, ready to go on our adventure?");
    const dungeon = new GameStage("DUNGEON", "You're about to enter the dungeon, where do we go first?");
    const room = new GameStage("ROOM", "Risky move I see, you're now in the first room to the right but it was empty, should we pursue?");
    const enemy = new GameStage("ENEMY", "Oh my god, you're facing Giggly Giggle, your arch enemy, what will you do?");
    const again = new GameStage("TRY_AGAIN", "You tried to run but he kicked your ass anyway. Want to try again?");

    const level = new Level({
        stages: [intro, dungeon, room, enemy, again],
        currentStage: intro,
        initialStage: intro
    });

    intro.addRoute("yes", () => level.setCurrentStage(dungeon));
    intro.addRoute("no", () => level.exit());

    dungeon.addRoute("right", () => level.setCurrentStage(room));

    room.addRoute("forward", () => level.setCurrentStage(enemy));

    enemy.addRoute("hit", () => level.win());
    enemy.addRoute("run", () => level.setCurrentStage(again));

    again.addRoute("yes", () => level.reset());
    again.addRoute("no", () => level.exit());

    return level;
}

const levelOne = createLevelOne();

export default levelOne;
