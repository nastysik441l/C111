// Сам веб сервер (приложение)
let express = require('express');
let app = express();

// Использовать body в запросах
// Для работы JSON
app.use(express.json());
const urlencodedParser = express.urlencoded({extended: false});

// Настройка маршрута
app.post("/api/tickets", urlencodedParser, require ('./controllers/tickets/create').create)

// Запустим веб сервер
app.listen(80, () => {
    console.log("http server started");
});