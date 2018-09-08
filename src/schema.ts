import QueryImpl from './resolvers/query';
import MutationImpl from './resolvers/mutation';
import { gql, Config } from "apollo-server";

// Query definition.
const Query = gql(`
    type Query {
        getPool(poolId: ID!): Pool
        searchPool(poolName: String!): [PoolInfo!]!
        getPost(postId: ID!): Post
        searchPost(input: PostSearchingParamsInput!): [Post!]!
        getInvestors(input: InvestorsFilterParamsInput!): [Investor!]!
        getContracts(input: ContractsParamsInput!): [Contract]!
    }
`);

// Mutation definition.
const Mutation = gql(`
    type Mutation {
        updateUser(input: UserInput!): User!
        createPool(input: PoolInput!): PoolCreateResponse!
        createPost(input: PostInput!): Post!
        editPost(input: PostEditInput!): PostEditResponse!
        deletePost(postId: ID!): ID!
        createContract(input: ContractInput!): ID!
        deleteContract(id: ID!): ID!
    }
`);

// Types definition.
const Types = gql(`
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Employment {
        company: String!
        position: String!
    }

    type Clinks {
        fb: String
        linkedin: String
        instagram: String
        twitter: String
        telegram: String
        wechat: String
    }

    type User {
        id: ID!
        name: String!
        login: String!
        email: String!
        phone: String
        job: Employment
        country: String
        city: String
        education: String
        clinks: Clinks
        follows: [ID!]
    }

    input EmploymentInput {
        company: String!
        position: String!
    }

    input CLinksInput {
        fb: String
        linkedin: String
        instagram: String
        twitter: String
        telegram: String
        wechat: String
    }

    input UserInput {
        id: ID!
        login: String
        name: String
        email: String
        education: String
        phone: String
        country: String
        city: String
        job: EmploymentInput
        clinks: CLinksInput
        follows: [ID!]
    }

    input PoolInput {
        owner: ID!
        projectName: String!
        projectLink: String!
        projectAdress: String!
        poolSoftCap: Float!
        poolHardCap: Float!
        minDeposit: Float!
        maxDeposit: Float!
        endDate: String!
        ownerComission: Float!
        comissionPaymentAddress: String!
        iwComission: Float!
    }

    type Pool {
        poolId: String!
        poolName: String!
        status: Int!
        ownerId: ID!
        ownerName: String!
        projectName: String!
        projectAdress: String!
        poolSoftCap: Float!
        poolHardCap: Float!
        minDeposit: Float!
        maxDeposit: Float!
        endDate: String!
        ownerComission: Float!
        iwComission: Float!
    }

    type PoolCreateResponse {
        poolId: ID!
        poolName: String!
    }

    input PostSearchingParamsInput {
        searchText: String
        userId: ID
    }

    type PoolInfo {
        poolId: String!
        poolName: String!
        ownerId: ID!
        ownerName: String!
        projectName: String!
        endDate: String!
    }

    input PostInput {
        userId: ID!
        content: String!
        tags: [String!]
    }
    
    type Post {
        postId: ID!
        userId: ID!
        userName: String!
        userLogin: String!
        date: String!
        content: String!
        tags: [String!]!
    }

    type PostEditResponse {
        postId: ID!
        userId: ID!
        date: String!
        content: String!
        tags: [String!]!
    }
    
    input PostEditInput {
        postId: ID!,
        content: String!
        tags: [String!]
    }

    input InvestorsFilterParamsInput {
        country: String
        followersRangeFilter: FollowersRangeFilter
        sortBy: SORTING_PARAMS
    }

    input FollowersRangeFilter {
        from: Int
        to: Int
    }

    enum SORTING_PARAMS {
        NUMBER_OF_FOLLOWERS
        CAPITAL_AMOUNT
        PROFIT_LEVEL
        PERCENTAGE_OF_PROFITABLE_INVESTMENTS
    }

    type Investor {
        id: ID!
        name: String!
        login: String
        countOfFollowers: Int!
    }

    type Contract {
        id: ID!
        name: String!
        description: String
        src: String!
        abi: String!
        bin: String!
    }

    input ContractInput {
        name: String!
        description: String
        src: String!
        abi: String!
        bin: String!
    }

    input ContractsParamsInput {
        name: String
        description: String
    }
`);

// Construct a config which contains typedefs and resolvers.
const config: Config = {
    typeDefs: [
        Query, Mutation, Types
    ],
    resolvers: {
        Query: QueryImpl,
        Mutation: MutationImpl
    },
};

export default config;