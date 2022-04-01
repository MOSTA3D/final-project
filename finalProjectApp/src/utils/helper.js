const token = document.cookie.split(";")[0].split("=")[1];

const active = (ref)=>{
    return new Promise((acc, rej)=>{
        ref.classList.add("active");
        setTimeout(()=>{
            ref.classList.removeClass("active");
        }, 4000)
    })
}

export const combineDispatches = (...dispatches)=>action=>{
    console.log(dispatches[0](action));
    dispatches.forEach(dispatch=>dispatch(action));
}

export async function postData(url="", data={}){
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

