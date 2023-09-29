import axios from "axios"

const instance = axios.create({
    baseURL: "https://localhost:5001/api/User",
    headers: {
        "Content-Type" : "application/json"
    }
})


const responseBody: any = (response: any) => response.data;

const requests = {
    get: (url: string) => instance.get(url).then().then(responseBody),
    post: (url: string, body?: any) => instance.post(url, body).then().then(responseBody)
}

const User = {
    login: (user: any) => requests.post(`/Login`, user)
}

export async function login(user: any){
    const data = await User.login(user)
    .then((response) => {
        console.log("Response from API:", response.data);
        return {
            response
        }
    })
    .catch((error) => {
        console.error("Error during login:", error);
        return error.response
    } )
    return data
}

export function setAccessToken(token: string){
    window.localStorage.setItem("accessToken", token)
}

export function setRefreshToken(refreshToken: string){
    window.localStorage.setItem("refreshToken", refreshToken)
}

export function getAccessToken(): null | string{
    const token = window.localStorage.getItem("accessToken")
    return token;
}

export function getRehreshToken(): null | string{
    const token = window.localStorage.getItem("refreshToken")
    return token;
}

export function removeTokens(){
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("refreshToken")
}