const ComputerVisionClient =
    require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

const KEY = "6b"; // Замените на свой ключ
const REGION = "westus"; // Замените на свой регион
const ENDPOINT = `https://${REGION}.api.cognitive.microsoft.com`;

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": KEY } }),
    ENDPOINT
);

// Пример URL с протоколом (https)
const descUrl = "https://itsteppv121.blob.core.windows.net/avatars/Без названия.jpeg";

computerVisionClient.describeImage(descUrl)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
