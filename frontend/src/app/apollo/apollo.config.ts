import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

const uri = 'http://localhost:8080/graphql'; // Your GraphQL endpoint
export function createApollo(httpLink: HttpLink) {
  return new ApolloClient({
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  });
}

@NgModule({
  exports: [ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
