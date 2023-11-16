let jwt = require('jsonwebtoken');

// Получить секретный ключ для создания токена
const JWT_KEY = process.env.JWT_KEY;

// Модуль, который принимает Http Request и Http Response
exports.login = function (request, response) {
    // Если пользователь ничего не прислал - возвращаю статус 400
    if(!request.body) return response.sendStatus(400);

    // Получаю данные из тела запроса
    console.log(request.body);
    let user = request.body;

    // Будем считать - что пользователь таки есть (пара совпала) user - то что нужно

    // Создать самый простой ключ
    let token = jwt.sign(
        {
            "user": user,
            "hello": "World" // Некие данные - которые мне потом понадобятся в других сервисах
        },
        JWT_KEY
    );

    // Формирую результат обработки запроса
    let result = {
        "user": user, // Что бы фронты знали - какие данные в базе есть по этому пользователю
        "token": token // Что бы фронты знали - с чем им ходить для авторизации и аутентификации
    };

    // Возвращаю статус 200 (все прошло ОК) и результат работы
    return response.status(200).json(result);
}