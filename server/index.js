//apollo server ve graphql i import ediyoruz
const {ApolloServer,gql}=require("apollo-server");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const author={
   // id:1,
    name:"Albert",
    surname:"Camus",
    age:55,
    books:[{
            id:"1",
            title:"book title",
            score:8.3,
            isPublished:false
        },
        {
            id:"2",
            title:"book title",
            score:9.3,
            isPublished:true
        }]
}

const book= {
    id:"fghjklghj",
    title:'Yabancı',
    //author:"Albert Camus",
    //author:author,
    //key value aynı şey olduğundan author, sadece yazılabilirdi
    score:6.9,
    isPublished:true,
    };


const typeDefs=gql`
    type Author{
        id:ID!,
        name:String!,
        surname:String,
        age:Int
        books:[Book!] 
    }


    type Book {
        id:ID!
        title: String!
        author: Author
        score: Float
        isPublished: Boolean
    }


    type Query{
        book:Book
        author:Author
    }
`;


const resolvers={
    Query:{
        book:()=>book,
        author:()=>author
    }
}


const server=new ApolloServer({
    typeDefs,
    resolvers, 
    plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    })
  ]});





server.listen().then(({url})=>{
    console.log(`Apollo Server is up at ${url}`);
})
















/*
const {ApolloServer,gql}=require("apollo-server");

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');



//* user obje tipinde
const typeDefs=gql`
    type User{
        name: String!
        surname:String!
        age: Int
    }

    type Query{
        user:User
        hello:String
    }

`;

const resolvers={
    Query:{
        user:()=>({
            name:"ela", surname:"öztürk", age:18
        }),
        hello:()=>"Hello world", 
    },
};


const server=new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground({
            //options
        })

    ]
});

server.listen().then(({url})=>{
    console.log(`Apollo Server ready at ${url}`);
})


*/
