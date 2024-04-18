import {API} from "@/extensions/api/index.js";

export const api = {
    actions: {
        loginUser(context, formData){
            return API.login(formData)
        },
        refreshToken(context){
            return API.refreshToken()
        },
        userName(context){
            return API.userName()
        }
    }
}