import {createStore} from 'vuex'

import {api} from "@/store/api/index.js";

export default createStore({
    modules: {
        api
    }
})