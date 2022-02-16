import gql from 'graphql-tag'

export const GET_ALL_TRANSACTIONS = gql`query MyQuery {
    allMyTxs {
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
