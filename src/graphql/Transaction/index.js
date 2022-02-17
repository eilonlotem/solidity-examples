import gql from 'graphql-tag'

export const GET_ALL_TRANSACTIONS = gql`
query MyQuery($limit: Int, $offset: Int) {
    allMyTxs(limit: $limit, offset: $offset) {
      totalCount
      results {
        blockHash
        blockTime
        contract
        enrichment {
          inputs
          functionName
        }
      }
    }
  }`
