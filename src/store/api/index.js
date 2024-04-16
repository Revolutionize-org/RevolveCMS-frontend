import {API} from "@/extensions/api/index.js";

export const api = {
    actions: {
        loginUser(context, formData){
            return API.login(formData)
        }
    }
}