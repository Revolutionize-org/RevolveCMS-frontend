import {createStore} from 'vuex'

import {api} from "@/store/api/index.js";
import {app} from "@/store/app/index.js";

export default createStore({
    modules: {
        api,
        app
    }
})