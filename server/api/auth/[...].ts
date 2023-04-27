import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ofetch } from 'ofetch'
import { NuxtAuthHandler } from '#auth'
import RestApi from '~~/services/RestApi'
import { API } from '~~/helpers/api'
import { ILoginReturnData } from '~~/stores/authentication'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: useRuntimeConfig().authenticationSecret,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      console.log('signIn informations')
      console.log(user)
      console.log(account)
      console.log(profile)
      console.log(email)
      console.log(credentials)
      profile = user
      const isAllowedToSignIn = true
      if (!user.status) {
        Toast.fire({
          icon: 'success',
          title: 'Example Toast Message'
        })
        return
      }
      if (isAllowedToSignIn) {
        return true
      } else {
      // Return false to display a default error message
        return false
      // Or you can return a URL to redirect to:
      // return '/unauthorized'
      }
    },
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt ({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.accessToken
        console.log('jwt informations')
        console.log(token)
        console.log(account)
        console.log(profile)
        // token.id = profile.id
      }
      return token
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    async session ({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id
      console.log('session informations')
      console.log(session)
      console.log(token)
      console.log(user)
      return session
    }
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: 'your-client-id',
      clientSecret: 'your-client-secret'
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
        password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
      },
      async authorize (credentials: any) {
        console.log('login with => ' + JSON.stringify(credentials.email))
        const config = useRuntimeConfig()
        // const { pending, data: loginData, error, refresh } = await useLazyFetch<ILoginReturnData>(API.authentication.oauth, {
        //   body: {
        //     driver: 'username',
        //     username: credentials?.email,
        //     password: credentials?.password
        //   },
        //   method: 'post',
        //   baseURL: `${config.public.apiBaseUrl}${config.public.apiBasePath}`,
        //   headers: {
        //     PROJECT: 'OURPROJECTS-CLOUD'
        //     // Authorization: authentication.getAccessToken ? 'Bearer ' + authentication.getAccessToken : undefined,
        //     // Refresh: authentication.getRefreshToken
        //   }
        // })
        console.log(API.authentication.oauth)
        // const loginData = await ofetch<ILoginReturnData>(`/api/article/${API.authentication.oauth}`)
        const loginData = await ofetch(API.authentication.oauth, {
          baseURL: `${config.public.apiBaseUrl}${config.public.apiBasePath}`,
          method: 'POST',
          body: { driver: 'username', username: credentials.email, password: credentials.password }
        })
        // const { pending, data: loginData, error, refresh } = await RestApi.post<ILoginReturnData>(API.authentication.oauth,
        //   {
        //     driver: 'username',
        //     username: credentials?.email,
        //     password: credentials?.password
        //   }
        // )
        console.log('route ' + API.authentication.oauth + ' data => ')
        console.log(loginData)
        // console.log('route /login error => ' + error.value)
        // console.log('route /login pending => ' + pending.value)
        if (loginData.accessToken) {
          // this.authenticateUser(loginData.value.accessToken, loginData.value.refreshToken, loginData.value.User[0])
          return loginData.User[0]
        } else {
          console.error('Warning: Malicious login attempt registered, bad credentials provided')
          return null
        }
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
        // const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }
        // if (credentials?.username === user.username && credentials?.password === user.password) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user
        // } else {
        //   // eslint-disable-next-line no-console
        //   console.error('Warning: Malicious login attempt registered, bad credentials provided')
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null
        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      }
    })
  ]
})
