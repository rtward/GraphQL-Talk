const graphql = require('graphql');
const express = require('express');
const graphlHTTP = require('express-graphql');

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull,
} = graphql;

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        description: "Guess what it is!",
        resolve() { return 'world'; }
      },
      testing: {
        type: new GraphQLObjectType({
          name: 'TestingType',
          fields: {
            sequence: {
              type: new GraphQLList(GraphQLInt),
              description: "Prints out some numbers",
              args: {
                howMany: { type: new GraphQLNonNull(GraphQLInt) },
              },
              resolve(parent, args) {
                return [...Array(args.howMany)].map((val, idx) => idx);
              }
            }
          }
        }),
        resolve() { return true; },
      }
    }
  })
});

const app = express();
app.use('/graphql', graphlHTTP({ schema, graphiql: true }));
app.listen(4000);
console.log('GraphQL server started at localhost:4000/graphql');
