import {API} from "./api";

export function getCurrentUserInfo() {

    const user = API.get('/user/info')
}