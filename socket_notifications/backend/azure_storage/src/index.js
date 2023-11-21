// Сам веб сервер (приложение)
let express = require('express');
let app = express();

// Обработка загрузки файлов
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Использовать body в запросах
// Для работы JSON
app.use(express.json());
const urlencodedParser = express.urlencoded({extended: false});

// Настройка маршрута
let uploadAvatar = require ('./controllers/avatar')
app.post("/api/azure/upload/avatar", urlencodedParser, uploadAvatar)

// Запустим веб сервер
app.listen(80, () => {
    console.log("http file upload server started");
});