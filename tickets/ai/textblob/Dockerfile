FROM python:3.12

WORKDIR /app

# Копируем файлы приложения в контейнер
COPY ./src /app

# Устанавливаем зависимости из файла requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Запускаем приложение
CMD ["python", "-u", "index.py"]
