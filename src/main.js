import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/index.js";
import store from "@/store/index.js";
import '@/styles/app.scss'
import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import {setContext} from "@apollo/client/link/context";
import {Vue3Mq} from 'vue3-mq'
import mitt from "mitt";

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_APP_API_URL,
    credentials: 'include',
    fetchOptions: {
        mode: 'cors'
    }
});

const requiresToken = (operationName, tokenRequiredOperations) => {
    return tokenRequiredOperations.includes(operationName);
};

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const tokenRequiredOperations = ['Me', 'Header', 'modifyHeader', 'Footer', 'modifyFooter', 'Pages', 'modifyPage', 'createPage', 'deletePage'];

const splitLink = ApolloLink.split(
    ({ operationName }) => requiresToken(operationName, tokenRequiredOperations),
    authLink.concat(httpLink),
    httpLink
);

const defaultOptions  = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

export {
    apolloClient
}

const app = createApp(App)
    .use(router)
    .use(store)
    .use(apolloProvider)
    .use(Vue3Mq, {
        breakpoints: {
            xs: 0,
            sm: 566,
            md: 1024,
            mn: 1250,
            lg: 1360,
            xl: 1440
        }
    })

const emitter = mitt()
app.provide('emitter', emitter)

app.mount('#app')
