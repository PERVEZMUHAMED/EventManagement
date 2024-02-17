import { Router } from "express";
import { event } from "../di/container.di";
import { auth } from "../di/container.di";

export default class EventRouter {
    private router: Router;
    constructor() {
        this.router = Router();
        this.intializeRoute();
    }
    private intializeRoute = () => {

        this.router.get("/products", );
        this.router.get("/product/:id",);


        // Admin Routes
        this.router.post("/admin/event/new",  auth.authenticateUser, auth.authorizedUser("admin"), event.createEvent);
        this.router.get("/events", event.getEvents);
        // this.router.put("/admin/product/:id",);
        // this.router.delete("/admin/product/:id",);

    }
    public getRouter = (): Router => {
        return this.router;
    }
}