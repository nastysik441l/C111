const amqp = require('amqplib/callback_api.js');

// Асинхронная функция для установки соединения и канала
async function setupRabbitMQ() {
    return new Promise((resolve, reject) => {
        amqp.connect(RABBITMQ_CONNECTION_URI, {}, async (errorConnect, conn) => {
            if (errorConnect) {
                console.error(errorConnect);
                reject(errorConnect);
                return;
            }

            connection = conn;
            console.debug("Connected to RabbitMQ");

            try {
                // Создаем канал
                channel = await connection.createChannel();
                console.debug("Channel created");

                // Ассоциируем очередь для уведомлений
                await channel.assertQueue(RABBITMQ_QUEUE_NOTIFICATIONS, {});
                console.debug("Notifications queue asserted");

                resolve();
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
}

// Запускаем установку соединения при запуске приложения
(async () => {
    try {
        await setupRabbitMQ();
        // Теперь у вас есть соединение и канал для отправки уведомлений
    } catch (error) {
        process.exit(-1);
    }
})();

// Отправка уведомлений
module.exports = (eventName, eventData) => {
    try {
        let msg = {
            name: eventName,
            data: eventData
        };
        channel.sendToQueue(RABBITMQ_QUEUE_NOTIFICATIONS, Buffer.from(JSON.stringify(msg)));
    } catch (error) {
        console.error(error);
    }
};

// Обработка события завершения работы приложения
process.on('SIGINT', async () => {
    try {
        if (channel) {
            await channel.close();
        }
        if (connection) {
            await connection.close();
        }
        console.debug("RabbitMQ connection closed");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
});
