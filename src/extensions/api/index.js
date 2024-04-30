import gql from "graphql-tag";
import {apolloClient} from "@/main.js";

export const API = {

    async login(formData) {
        try {
            const req = await apolloClient.mutate({
                mutation: gql`
            mutation Login($username: String!, $password: String!) {
              login(userInfo: {email: $username, password:$password}) {
                accessToken
              }
            }
          `,
                variables: {
                    username: formData.username,
                    password: formData.password
                }
            });

            if (req.data) {
                localStorage.setItem('accessToken', req.data.login.accessToken)
                return {error: false, message: null}
            }

        } catch (error) {
            console.log(error)
            return {error: true, message: 'Incorrect email or password'}
        }
    },
    async logout() {
        try {
            const req = await apolloClient.mutate({
                mutation: gql`
            mutation Logout {
              logout
            }
          `
            });

            if (req.data) {
                localStorage.removeItem('accessToken')
                return {error: false, message: null}
            }
        } catch (error) {
            return {error: true, message: 'Invalid token'}
        }
    },

    async refreshToken() {
        try {
            const req = await apolloClient.mutate({
                mutation: gql`
            mutation RefreshToken {
              refreshToken
            }
          `
            });

            if (req.data) {
                localStorage.setItem('accessToken', req.data.refreshToken)
                return {error: false, message: null}
            }

        } catch (error) {
            return {error: true, message: 'Invalid token'}
        }
    },
    async userName() {
        try {
            const req = await apolloClient.query({
                query: gql`
            query Me {
              me {
                name
              }
            }
          `,
            });

            if (req.data.me) {
                return {error: false, message: null, isLogged: true, username: req.data.me.name}
            }

        } catch (error) {
            return {error: true, message: error, isLogged: false}
        }
    },
    async getHeader() {
        try {
            const req = await apolloClient.query({
                query: gql`
                query Header {
                header {
                    id,
                    name,
                    data
                   }
                  }
                 `,
            })

            if (req.data.header) {
                return {error: false, message: null, data: req.data.header}
            }

        } catch (error) {
            return {error: true, message: error}
        }
    },
    async changeHeader(data) {
        console.log(data)
        try {
            const req = await apolloClient.mutate({
                mutation: gql`
                mutation modifyHeader($id: String!, $name: String!, $data: String!) {
                    modifyHeader(header: {id: $id, name: $name, data: $data}) {
                        id
                        }
                    }
                `,
                variables: {
                    id: data.id,
                    name: data.name,
                    data: data.data
                }
            })

            if (req.modifyHeader.id) {
                return {error: false, message: null}
            }

        }catch (error) {
            return {error: true, message: error}
        }
    }
}