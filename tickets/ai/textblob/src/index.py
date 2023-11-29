import pika
from dotenv import load_dotenv
import os

# Загрузка переменных из файла .env
load_dotenv()

# Получение данных для подключения к RabbitMQ из переменных окружения
rabbitmq_user = os.getenv('RABBITMQ_DEFAULT_USER')
rabbitmq_pass = os.getenv('RABBITMQ_DEFAULT_PASS')
rabbitmq_server = os.getenv('RABBITMQ_SERVER')
rabbitmq_queue_auth = os.getenv('RABBITMQ_QUEUE_AUTH')
rabbitmq_port = int(os.getenv('RABBITMQ_PORT', 5672))  # По умолчанию используется порт 5672

# Подключение к RabbitMQ
credentials = pika.PlainCredentials(rabbitmq_user, rabbitmq_pass)
parameters = pika.ConnectionParameters(rabbitmq_server, rabbitmq_port, '/', credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()

# Отправка сообщения в очередь
message_body = "Hello, RabbitMQ!"
channel.basic_publish(exchange='', routing_key=rabbitmq_queue_auth, body=message_body)

print(f"Sent message: {message_body}")

# Закрытие соединения
connection.close()
