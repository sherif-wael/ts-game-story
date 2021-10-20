type RouteHandler = () => void;

class GameStage{
    private event: string;
    private name: string;
    private routes: Map<string, RouteHandler>;

    constructor(name: string, event: string){
        this.event = event;
        this.name = name;
        this.routes = new Map();
    }

    public getName(){
        return this.name;
    }

    public getEvent(): string{
        return this.event;
    }

    public getRoutes(): string[]{
        return [...this.routes.keys()];
    }

    public toString(){
        const routeOptions = "(" + this.getRoutes().join("/") + ")";
        return `${this.event} ${routeOptions}`;
    }

    public addRoute(route: string, handler: RouteHandler){
        this.routes.set(route, handler);
    }

    public resolve(route: string): RouteHandler{
        this.routeShouldExist(route);
        return this.routes.get(route);
    }

    public hasRoutes(){
        return [...this.routes.keys()].length > 0;
    }

    private routeShouldExist(route: string): void{
        if(!this.routes.has(route)){
            throw new Error("This route doesn't exist.");
        }
    }
}

export default GameStage;