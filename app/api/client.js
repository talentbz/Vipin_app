
const baseUrl = 'http://vipinpandey.com/adminpanel/';
// const baseUrl = 'http://localhost/Codeigniter-User-Panel-Management-master/';


export const postData = async(url, data) => {
    console.log(data);
    return fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
}

export const getData = async(url) => {
    console.log(url);
    return fetch(`${baseUrl}${url}`);
}


