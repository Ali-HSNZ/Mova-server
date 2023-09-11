const fs = require('fs');
const path = require('path');
const { format } = require('date-fns-jalali');
const createUploadPath = () => {
    const date = format(new Date(), 'yyy/MM/dd');
    const [year, month, day] = date.split('/');
    const uploadPath = path.join(__dirname, '..', '..', 'public', 'upload', year, month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join('public', 'upload', year, month, day);
};
module.exports = {
    createUploadPath
};
