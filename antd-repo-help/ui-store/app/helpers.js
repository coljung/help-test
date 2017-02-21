export function getApiUrl() {
    return `http://${process.env.UI_STORE_HOST}:${process.env.UI_STORE_PORT}/api/`;
}