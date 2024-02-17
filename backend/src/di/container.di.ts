import { Container } from "inversify";
import { TYPES } from "./Types";
import IUserRepository from "../repository/Interface/user.repository.interface";
import UserRepository from "../repository/user.repository";
import IUserService from "../service/Interface/user.service.interface";
import UserServcie from "../service/user.service";
import IUserController from "../controller/Interface/user.controller.interface";
import UserController from "../controller/user.controller";
import IAuthMiddleware from "../middleware/Interface/authenticate.interface";
import { AuthMiddleware } from "../middleware/authenticate";
import IEventRepository from "../repository/Interface/event.repository.interface";
import EventRepository from "../repository/event.repository";
import IEventService from "../service/Interface/event.service.interface";
import EventServcie from "../service/event.service";
import IEventController from "../controller/Interface/event.controller.interface";
import EventController from "../controller/event.controller";


const container = new Container();

// user 
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserServcie);
container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IAuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
// event
container.bind<IEventRepository>(TYPES.EventRepository).to(EventRepository);
container.bind<IEventService>(TYPES.EventService).to(EventServcie);
container.bind<IEventController>(TYPES.EventController).to(EventController);

export const user = container.get<IUserController>(TYPES.UserController);
export const auth = container.get<IAuthMiddleware>(TYPES.AuthMiddleware);
// container.resolve<IUserController>(UserController)

// event
export const event = container.get<IEventController>(TYPES.EventController);




