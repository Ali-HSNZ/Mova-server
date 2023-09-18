const handleDirectory = ({ file, title, quality }) => {
    if (file.fieldname.toLowerCase().match('movie')) {
        return `/uploads/movies/${title}/${quality || 'unknown'}/movie`;
    }
    if (file.fieldname.toLowerCase().match('banner')) {
        return `/uploads/movies/${title}/${quality || 'unknown'}/banner`;
    }
    return `/uploads/movies/${title}/${quality || 'unknown'}/trailer`;
};
const movieMethods = {
    handleDirectory
};
module.exports = { movieMethods };
