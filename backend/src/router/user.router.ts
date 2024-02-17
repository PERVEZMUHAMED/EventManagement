import { Router } from "express";
import { user } from "../di/container.di";
import { auth } from "../di/container.di";

export default class UserRouter {
    private router:Router;
    constructor() {
        this.router = Router();
        this.intializeRoute();
    }
    private intializeRoute=()=>{
        this.router.post("/create", user.createUser);
        this.router.post("/login", user.Login);
        this.router.get("/logout", user.Logout);
        this.router.put("/password/change", auth.authenticateUser, user.changePassword);
        this.router.get("/myProfile", auth.authenticateUser, user.getUserProfile);
        this.router.put("/update", auth.authenticateUser, user.updateProfile);
        this.router.delete("/delete", auth.authenticateUser, user.deleteProfile);

        // Admin Routes
        this.router.route("/admin/users").get(auth.authenticateUser, auth.authorizedUser("admin"), user.getAllUsers);
        this.router.route("/admin/user/:id").get(auth.authenticateUser, auth.authorizedUser("admin"), user.getUser) 
                                            .put(auth.authenticateUser, auth.authorizedUser("admin"), user.updateUser)
                                            .delete(auth.authenticateUser, auth.authorizedUser("admin"), user.deleteUser);
    }
    public getRouter =():Router =>{
        return this.router;
    }
}