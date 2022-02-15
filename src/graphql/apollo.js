import Vue from 'vue'
// import { useToast } from 'vue-toastification/composition'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
    ))
  }

  if (networkError) {
    // const toast = useToast();
    // console.log('sdfsdf',useToast());
    // toast({
    //   component: ToastificationContent,
    //   position: 'top-right',
    //   props: {
    //     title: 'Error',
    //     icon: 'InfoIcon ',
    //     variant: 'error',
    //     text: `[Network error]: ${networkError}`,
    //   },
    // })
    console.log(`[Network error]: ${networkError}`)
  }
})

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_SOURCELINK_API_URL || 'https://api.dev.tres.finance/graphql',
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
  link: link.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'apolloLoading',
  },
})
