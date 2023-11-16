const http = require("http");
// Получить переменную окуржения
const SERVER_NAME = process.env.SERVER_NAME || "I have not name";
// Запустить простой веб сервер - слушать 80 порт и отвечать привет мир
http.createServer(
    function(
        request,
        response){
        response.end("<h1>Hello World from container: " + SERVER_NAME + " </h1>");
    }).listen(80);