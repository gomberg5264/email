import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink} from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'tachyons';

import App from './components/App';

const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjg9nh2n867jz0186txci6h4n' });

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphcoolToken');
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareLink.concat(httpLink);

const client = new ApolloClient({ 
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const pathName = window.location.pathname;
const username = (window.location.pathname.length < 2) ? null : pathName.substring(1, pathName.length);

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router>
      <div>
        <App username={username}/>
      </div>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)