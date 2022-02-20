import gql from 'graphql-tag'

export const GET_ALL_SMART_CONTRACTS = gql`
query MyQuery($limit: Int, $offset: Int) {
  contract(limit: $limit, offset: $offset) {
      totalCount
      results {
        id
        network
        abi
        blockchain
        address
        meta
        allTags
      }
    }
  }`
