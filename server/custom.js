const {ApolloServer,gql}=require("apollo-server");

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');


const typeDefs=gql`
type Query{
    name:String
}
`;

const resolvers={
    Query:{
       name:()=>"mehmet" 
    }
};


const server=new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground({

        })
    ]
})


server.listen().then(({url})=>console.log(`Apollo server is up ${url}`));