import packageData from '../package.json'

export function readForm(form) {
    var elements = form.elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        if (item.type != 'submit')
            obj[item.name] = item.value;
    }

    return obj;
}

async function newAccessToken(){
    const rawResponse = await fetch(packageData.proxy + '/api/auth/token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: localStorage.refreshToken })
    });

    return rawResponse.json().accessToken
}

export async function authFetch(url, options){
    options.headers.authorization = "Bearer " + localStorage.accessToken;
    const rawResponse = await fetch(url, options);

    if (rawResponse.status == 403) {
        localStorage.accessToken = newAccessToken();
        options.headers.authorization = localStorage.accessToken;
        const rawResponse = await fetch(url, options);
        if (rawResponse.status == 403) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
        }
    }

    return rawResponse;
}

export async function logout(){
    if (localStorage.refreshToken != undefined){        
        const rawResponse = await fetch(packageData.proxy + '/api/auth/logout', {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.refreshToken })
        });
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
}