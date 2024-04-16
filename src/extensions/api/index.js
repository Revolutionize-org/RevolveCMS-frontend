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
                    username : formData.username,
                    password : formData.password
                }
            });

            if (req.data) {
                localStorage.setItem('accessToken', req.data.login.accessToken)
                return {error: false, message: null}
            }

        }catch (error) {
            console.log(error)
            return {error: true, message: 'Incorrect email or password'}
        }
    }
}