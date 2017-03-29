import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
  // this only works with ALL unique ids across DB, not just table
  //see below for usage with typical postgres db
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);


// From Apollo Client Docs: http://dev.apollodata.com/react/cache-updates.html
// If the IDs are only unique per type (this is typical if an ID is just an
// ID out of a database table), you can use the `__typename` field to scope it.
// This is a GraphQL field that's automatically available, but you do need
// to query for it also. (??? so include __typename in ALL queries ???)
// const client = new ApolloClient({
//   dataIdFromObject: (result) => {
//     if (result.id && result.__typename) {
//       return result.__typename + result.id;
//     }
//
//     // Make sure to return null if this object doesn't have an ID
//     return null;
//   },
// });
