import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
query MyQuery {
    ethereum {
      address(address: {is: "0x6425c6be902d692ae2db752b3c268afadb099d3b"}) {
        address
      }
      transactions {
        countBigInt
        gas
        index
      }
    }
  }`
