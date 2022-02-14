import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_SOURCELINK_API_URL || 'http://ecsst-backe-1up70t3f3mxnb-737315864.us-east-1.elb.amazonaws.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
