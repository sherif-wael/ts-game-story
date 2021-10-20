import { expect } from "chai";
import GameStage from "../src/GameStage";

function createFakeGameStage(){
    const stage = new GameStage("Dragon", "Wanna fight this dragon?");
    stage.addRoute("yes", () => console.log("you have won"));
    stage.addRoute("no", () => console.log("you have won"));
    return stage;
}

describe("GameStage", () => {
    it("Returns a string representation of the stage", () => {
        const stage = createFakeGameStage();
        const line = stage.toString();

        expect(line).to.equal("Wanna fight this dragon? (yes/no)");
    });

    it("Throws an exception on passing a wrong route", () => {
        const stage = createFakeGameStage();
        const fn = () => stage.resolve("yup");

        expect(fn).to.throw("This route doesn't exist.");
    });

    it("Returns all possible stage routes", () => {
        const stage = createFakeGameStage();
        const routes = stage.getRoutes();

        expect(routes).to.deep.equal(["yes", "no"]);
    });

    it("Returns a stage handler on resolving", () => {
        const stage = createFakeGameStage();
        let isInvoked = false;
        stage.addRoute("yup", () => isInvoked = true);
        const handler = stage.resolve("yup");
        handler();

        expect(isInvoked).to.be.true;
    });

    it("Adds a new route", () => {
        const stage = createFakeGameStage();
        stage.addRoute("stay", null);

        expect(stage.resolve("stay")).to.be.null;
        expect(stage.getRoutes().length).to.equal(3);
    });
})