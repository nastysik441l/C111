/**
 * Configure RabbitMQ server
 */
const RABBITMQ_DEFAULT_USER = process.env.RABBITMQ_DEFAULT_USER || 'root';
const RABBITMQ_DEFAULT_PASS = process.env.RABBITMQ_DEFAULT_PASS || 'password';
const RABBITMQ_SERVER_IP = process.env.RABBITMQ_SERVER_IP || '127.0.0.1'; // Используйте IP-адрес
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672;
const RABBITMQ_CONNECTION_URI = `amqp://${RABBITMQ_DEFAULT_USER}:${RABBITMQ_DEFAULT_PASS}@${RABBITMQ_SERVER_IP}:${RABBITMQ_PORT}`;


const amqp = require ('amqplib/callback_api.js');

let connection;
let channel;
amqp.connect(RABBITMQ_CONNECTION_URI, {}, async (errorConnect, conn) => {
    if (errorConnect) {
        console.error(errorConnect);
        process.exit(-1);
    }

    connection = conn;
    console.debug("connect RabbitMQ ok");

    await connection.createChannel(async (errorChannel, ch) => {
        if (errorChannel) {
            console.error(errorChannel);
            process.exit(-1);
        }

        await ch.assertQueue(RABBITMQ_QUEUE_COMPUTER_VISION, {}, (errorQueue) => {
            if (errorQueue) {
                console.error(errorQueue);
                process.exit(-1);
            }
            console.debug("Notifications queue asserted");
        });

        channel = ch;
    });


});

module.exports = (eventData) => {
    channel.sendToQueue (RABBITMQ_QUEUE_COMPUTER_VISION, Buffer.from(JSON.stringify(eventData)));
};




