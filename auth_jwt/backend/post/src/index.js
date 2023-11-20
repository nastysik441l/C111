// Сам веб сервер (приложение)
let express = require('express');
let app = express();


let auth = require("./middlewares/jwtAuth").auth;

app.get("/api/posts", auth, function (request, response)  {
    return response.status(200).json({
        "user": request.user
    });
} );


// Запустим веб сервер
app.listen(80, () => {
    console.log("http server started");
});