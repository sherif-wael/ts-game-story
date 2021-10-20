import { expect } from "chai";
import Level from "../src/Level";
import GameStage from "../src/GameStage";

function createFakeLevel(): Level{
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

describe("Level", () => {
    it("Updates to next stage", () => {
        const lvl = createFakeLevel();
        lvl.update("yes");
        const currentStage = lvl.getCurrentStage();

        expect(currentStage.getName()).to.equal("DUNGEON");
    });

    it("Won on hitting the enemy", () => {
        const lvl = createFakeLevel();
        lvl.update("yes").update("right").update("forward").update("hit");

        expect(lvl.isWon()).to.be.true;
    });

    it("Rests to initial stage", () => {
        const lvl = createFakeLevel();
        lvl.update("no");
        lvl.reset();
        
        expect(lvl.getCurrentStage().getName()).to.equal("INTRO");
        expect(lvl.isPlaying()).to.be.true;
    });

    it("Exits successfully", () => {
        const lvl = createFakeLevel();
        lvl.update("yes").update("right").update("forward").update("run").update("no");

        expect(lvl.isExitted()).to.be.true;
    });
});

