import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/index.js";
import '@/styles/app.scss'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: 'http://localhost:3000/graphql',
    credentials: 'include'
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

const app = createApp(App)
    .use(router)
    .use(apolloProvider)

app.mount('#app')
