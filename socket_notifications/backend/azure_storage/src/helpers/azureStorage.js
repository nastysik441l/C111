const { BlobServiceClient } = require('@azure/storage-blob');


const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const accountConnectionString = process.env.AZURE_STORAGE_ACCOUNT_CONNECTION_STRING;

if (!accountName) throw Error('Azure Storage accountName not found');
if (!accountKey) throw Error('Azure Storage accountKey not found');

module.exports = async function (containerName, blobName, content) {
    // Получите ключ доступа и имя аккаунта из портала Azure
    const blobServiceClient = BlobServiceClient.fromConnectionString(accountConnectionString);

    // Получите клиент контейнера
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Проверьте, существует ли контейнер, и создайте его, если он отсутствует
    if (!(await containerClient.exists())) {
        await containerClient.create();
    }

    // Получите клиент блоба
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Загрузите содержимое файла в блоб и перезапишите, если блоб уже существует
    await blockBlobClient.upload(content, content.length, { overwrite: true });

    console.debug(`File  was uploaded to blob storage as "${blobName}" successfully.`);
}