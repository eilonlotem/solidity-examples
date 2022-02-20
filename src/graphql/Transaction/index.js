import gql from 'graphql-tag'

export const GET_ALL_TRANSACTIONS = gql`
query MyQuery($limit: Int, $offset: Int) {
  parsedTx(limit: $limit, offset: $offset) {
      totalCount
      results {
        id
        hash
        blockHash
        blockTime
        contract
        value
        network
        enrichment {
          inputs
          functionName
        }
        fromAddress {
          name
          description
          address
        }
        toAddress {
          name
          description
          address
        }
      }
    }
  }`
