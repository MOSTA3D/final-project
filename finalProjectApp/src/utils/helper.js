import { SERVER_URL } from "./config";

export const combineDispatches = (...dispatches)=>action=>{
    dispatches.forEach(dispatch=>dispatch(action));
}

export async function postData(url="", data={}, token){
    let response;
    try{
        response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }catch(err){
        console.error("there is an error" + err);
    }

    return response.json();
}




function _getBlobUrl(canvas){
    return new Promise((res, rej)=>{
        canvas.toBlob((blob)=>{
            res(URL.createObjectURL(blob));
        })
    })
}
export async function urlToBlb(url){
    let obUrl = "";
    const image = new Image();
    image.src = `${SERVER_URL}/images/${url}`;
    image.crossOrigin = "Anonymous";
    await image.decode();

    const canv = document.createElement("canvas");
    canv.width = image.width;
    canv.height = image.height;
    const ctx = canv.getContext("2d");

    ctx.drawImage(image, 0, 0);

    obUrl = await _getBlobUrl(canv)
    // canv.toBlob((blob)=>{
    //     obUrl = URL.createObjectURL(blob);
    //     console.log("object url", obUrl);
    // })

    return obUrl;
}



