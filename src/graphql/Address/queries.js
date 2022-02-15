import gql from 'graphql-tag'

export const GET_ALL_ADDRESSES = (limit = 10, offset = 0) => gql`
query MyQuery {
  allMyAddresses(internalOnly: false, limit: ${limit}, offset: ${offset}) {
    totalCount
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

export const ADD_ADDRESS = (name, address, blockchain, description, internal) => (gql`mutation MyMutation2 {
  __typename
  updateAddress(address: "${address}", blockchain: "${blockchain}", description: "${description}", internal: ${internal}, name: "${name}") {
    address {
      address
    }
  }
}`)
