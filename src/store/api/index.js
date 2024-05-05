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
        },
        logout(context){
            return API.logout()
        },
        getHeader(context) {
            return API.getHeader()
        },
        modifyHeader(context, formData) {
            return API.changeHeader(formData)
        },
        getFooter(context) {
            return API.getFooter()
        },
        modifyFooter(context, formData) {
            return API.changeFooter(formData)
        },
        getPages(context) {
            return API.getPages()
        }
    }
}