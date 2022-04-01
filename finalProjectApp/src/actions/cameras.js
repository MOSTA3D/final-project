export const GET_CAMERAS = "GET_CAMERAS";

export const getCameras = (cameras)=>{
    return {
        type: GET_CAMERAS,
        cameras,
    }
}