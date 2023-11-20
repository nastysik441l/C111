jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

exports.auth = function (request, response, next) {
    // Если передали ключ - проверю его
    if (request.headers.authorization) {
        console.log(request.headers.authorization);

        // Получите JWT из заголовка Authorization
        const authHeader = request.headers.authorization;
        const token = authHeader.replace('Bearer ', ''); // Удалите "Bearer " из заголовка

        jwt.verify(
            token,
            process.env.JWT_KEY,
            (err, jwtUser) => {
                if (err) {
                    console.log("Ошибка расшифровки");
                    console.log(err);
                    // return response.status(401).json("UnAuth");
                    next();
                } // если ошибка - просто пойду дальше

                console.log("Восстановленные данные");
                console.log(jwtUser);
                // Добавим в запрос данные о пользователе
                request.user = jwtUser;
            }
        )
    }

    // Пойти дальше
    next();

}