const { allRoutes } = require('./routers/router');

module.exports = class Application {
    #express = require('express');
    #app = this.#express();

    constructor(PORT, DB_URL) {
        this.configDB(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }
    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: true }));
        this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')));
    }
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    }
    configDB(DB_URL) {
        const mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        mongoose.connect(DB_URL, (error) => {
            if (error) throw error;
            return console.log('Connected to DB :)');
        });
    }
    errorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).send({
                status: 404,
                success: false,
                message: 'صفحه یا آدرس مورد نظر یافت نشد!'
            });
        });

        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || 'InternalServerError';

            return res.status(status).json({
                status,
                success: false,
                invalidParams: error?.error,

                message
            });
        });
    }
    createRoutes() {
        this.#app.use(allRoutes);
    }
};
