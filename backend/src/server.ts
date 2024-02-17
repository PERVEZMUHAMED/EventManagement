import App from "./app"
import Database from "./config/database";

const app = new App();
const db = new Database();

app.startServer();
db.databaseConnection();
