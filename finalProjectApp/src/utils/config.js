// change server url in deployment

// export const SERVER_URL = "https://detectorserver.azurewebsites.net";
export const SERVER_URL = window.location.hostname === "localhost" ? "http://localhost:3001" : "https://detectorserver.azurewebsites.net";
export const WEBSOCKET_URL = window.location.hostname === "localhost" ? "ws:localhost:8081" : "wss://detectorserver.azurewebsites.net:8081"