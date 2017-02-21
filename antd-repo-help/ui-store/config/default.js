module.exports = {
    server: {
        host: "0.0.0.0",
        port: 80,
        exposedHost: process.env.UI_STORE_HOST,
        exposedPort: process.env.UI_STORE_PORT
    },
    api: {
        host: process.env.MS_STORE_HOST,
        port: process.env.MS_STORE_PORT,
    },
};
