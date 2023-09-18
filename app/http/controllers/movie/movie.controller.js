const Client = require('ftp');
const fs = require('fs');
const { hostConfigs } = require('../../../configs/ftp');
const { MovieModel } = require('../../../models/movie.model');
const { movieMethods } = require('./methods');
const { isValidObjectId } = require('mongoose');
class MovieController {
    create(req, res, next) {
        try {
            const data = req.body;

            // Get All Files was Sended
            const uploadedFiles = req.files;
            const client = new Client();
            const uploadedPath = {};
            const numFilesToUpload = Object.keys(uploadedFiles).length;
            let numFilesUploaded = 0;

            ['tags', 'casts', 'genre'].forEach((field) => {
                if (data[field]) {
                    data[field] = JSON.parse(data[field]);
                }
            });

            if (numFilesToUpload > 0) {
                client.connect(hostConfigs.ftp);
                // if Ready to Use FTP Host... this Method Worked
                client.on('ready', () => {
                    Object.keys(uploadedFiles).forEach((field) => {
                        const file = uploadedFiles[field][0];
                        const fileName = file.originalname;
                        const filePath = file?.path.replace(/\\/g, '/');

                        const uploadDirectory = movieMethods.handleDirectory({
                            file,
                            title: data.title,
                            quality: data.quality
                        });

                        const ftpDirectory = '/public_html' + uploadDirectory;

                        // create folder in host
                        client.mkdir(ftpDirectory, true, (error) => {
                            if (error)
                                res.send({
                                    status: 500,
                                    success: false,
                                    message: 'خطا در بخش ساخت پوشه در هاست'
                                });
                        });
                        // Read File
                        fs.readFile(filePath, async (err, fileBuffer) => {
                            // Upload File ( file , file location )
                            client.put(fileBuffer, `${ftpDirectory + '/' + fileName}`, (err) => {
                                numFilesUploaded++;
                                if (err) {
                                    client.end();
                                    res.status(500).send({
                                        status: 500,
                                        success: false,
                                        message: 'خطایی در خواندن فایل ها رخ داد'
                                    });
                                    return;
                                } else {
                                    const parts = ftpDirectory.split('/');
                                    // save host file location into uploadedPath variable
                                    // key is fieldName | value is file path
                                    // for example {banner : 'http://api.ir/banner.mp4}
                                    uploadedPath[parts[parts.length - 1]] =
                                        process.env.HOST_URL + uploadDirectory + '/' + fileName;
                                }

                                // if upload finished
                                if (numFilesUploaded === numFilesToUpload) {
                                    // closed client route
                                    client.end();

                                    // added req.body movie & banner & trailer
                                    data['movie'] = uploadedPath['movie'];
                                    data['banner'] = uploadedPath['banner'];
                                    data['trailer'] = uploadedPath['trailer'];

                                    MovieModel.create(data)
                                        .then(() => {
                                            res.send({
                                                status: 201,
                                                success: true,
                                                data
                                            });
                                        })
                                        .catch(() => {
                                            res.status(500).send({
                                                status: 500,
                                                success: false,
                                                message: 'خطایی در ذخیره‌سازی داده رخ داد'
                                            });
                                        });
                                }
                            });
                        });
                        // Deleting File From Server After Uploaded on Host
                        fs.unlinkSync(filePath);
                    });
                });
            } else {
                MovieModel.create(data)
                    .then((result) => {
                        res.send({
                            status: 201,
                            success: true,
                            data
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            status: 500,
                            success: false,
                            message: 'خطایی در ذخیره‌سازی داده رخ داد'
                        });
                    });
            }
        } catch (error) {
            next(error);
        }
    }
    search() {}
    remove() {}
    async removeAll(req, res, next) {
        try {
            await MovieModel.deleteMany({});
            res.json({
                status: 200,
                success: true,
                message: 'فیلم ها با موفقیت حذف شده‌اند'
            });
        } catch (error) {
            next(error);
        }
    }
    update() {}
    async detail(req, res, next) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) {
                res.send({
                    status: 404,
                    success: false,
                    message: 'شناسه فیلم نامعتبر است'
                });
            }
            const result = await MovieModel.findById(id)
                .populate({
                    path: 'comments',
                    select: 'user likes dislikes text parentComment',
                    populate: {
                        path: 'user',
                        select: 'email vector fullName'
                    }
                })
                .populate({
                    path: 'casts',
                    select: 'fullName vector'
                })
                .populate({
                    path: 'genre',
                    select: 'name'
                });
            if (!result) {
                res.send({
                    status: 404,
                    success: false,
                    message: 'فیلم یافت نشد'
                });
            }
            res.send({
                status: 200,
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        const result = await MovieModel.find({});
        res.send({
            status: 200,
            success: true,
            data: result
        });
    }
    addActor() {}
}
module.exports = {
    MovieController: new MovieController()
};
