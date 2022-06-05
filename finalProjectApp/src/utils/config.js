// change server url in deployment

// export const SERVER_URL = "https://detectorserver.azurewebsites.net";
export const SERVER_URL = window.location.host === "http://localhost:3000" ? "http://localhost:3001" : "https://detectorserver.azurewebsites.net";