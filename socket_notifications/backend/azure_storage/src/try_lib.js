const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const {readFileSync} = require("fs");
require('dotenv').config()

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const accountConnectionString = process.env.AZURE_STORAGE_ACCOUNT_CONNECTION_STRING;

if (!accountName) throw Error('Azure Storage accountName not found');
if (!accountKey) throw Error('Azure Storage accountKey not found');

const sharedKeyCredential
    = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

async function uploadFileToBlobStorage(containerName, blobName, filePath) {
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

    // Читайте содержимое файла
    const content = readFileSync(filePath);

    // Загрузите содержимое файла в блоб и перезапишите, если блоб уже существует
    await blockBlobClient.upload(content, content.length, { overwrite: true });

    console.log(`File "${filePath}" was uploaded to blob storage as "${blobName}" successfully.`);
}

async function main() {

    const containerName = 'avatars';
    const blobName = 'Без названия.jpeg'; // Имя файла

    // const timestamp = Date.now();
    // const fileName = `my-new-file-${timestamp}.txt`;

    // create container client
    const containerClient = await blobServiceClient.getContainerClient(containerName);


    uploadFileToBlobStorage(containerName, blobName, './Без названия.jpeg')
        .catch((error) => console.error(error));

    // create blob client
    // const blobClient = await containerClient.getBlockBlobClient(blobName);
    //
    // // download file
    // await blobClient.downloadToFile(blobName);
    //
    // console.log(`${blobName} downloaded`);

}

main()
    .then(() => console.log(`done`))
    .catch((ex) => console.log(ex.message));