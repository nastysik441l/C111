// Сам веб сервер (приложение)
let express = require('express');
let app = express();

// Использовать body в запросах
// Для работы JSON
app.use(express.json());
const urlencodedParser = express.urlencoded({extended: false});

// Настройка маршрута
let login = require ('./controllers/auth/login').login
app.post("/api/auth/login", urlencodedParser, login)

// Запустим веб сервер
app.listen(80, () => {
    console.log("http server started");
});