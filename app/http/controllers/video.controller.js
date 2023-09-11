const fs = require('fs');
const path = require('path');
const videosName = {
    mostanad1: path.join(__dirname, '..', '..', '..', 'public', 'videos', 'mostanad1.mp4'),
    mostanad2: path.join(__dirname, '..', '..', '..', 'public', 'videos', 'mostanad2.mp4'),
    mostanad3: path.join(__dirname, '..', '..', '..', 'public', 'videos', 'mostanad3.mp4')
};
const streamVideo = (req, res, next) => {
    const fileName = req.params.videoName;
    const filePath = videosName[fileName];
    if (!filePath) {
        return res.status(404).send({
            status: 404,
            success: false,
            message: 'فیلم/سریال یافت نشد'
        });
    }
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }

    res.on('finish', () => {
        res.end();
    });
};

module.exports = {
    streamVideo
};
