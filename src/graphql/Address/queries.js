import gql from 'graphql-tag'

export const GET_ALL_ADDRESSES = gql`
query MyQuery {
  allMyAddresses(internalOnly: false) {
    results {
      address
      blockchain
      description
      id
      internal
      name
      type
      networks
      totalTransactions
    }
  }
}`

export const DELETE_ADDRESS = id => (gql`mutation MyMutation {
  __typename
  deleteAddress(id: ${id}) {
    address
  }
}`)
