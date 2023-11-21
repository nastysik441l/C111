
const minioClient = require('./../helpers/minio');
const bucketName = 'upload';

// Объявляем объект request, если его нет
let request = { files: {} };

module.exports = function (req, res) {
    // Используем переменную req вместо глобальной request
    if (!req.files || !req.files.avatar) {
        return res.status(400).json({ error: 'Avatar file is missing' });
    }

    console.debug(req.files.avatar);
    const avatarFile = req.files.avatar;
    const objectName = avatarFile.name;

    minioClient.putObject(bucketName, objectName, avatarFile.data, (err, etag) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to upload avatar' });
        }

        console.log('Avatar uploaded successfully');
        return res.status(200).json({ message: 'Avatar uploaded successfully' });
    });
};
