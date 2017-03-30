import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  constructor(props) {
    super(props)
  }

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {  //guessing at the response to update before server
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: (likes + 1)
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content, likes}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i className="material-icons" onClick={() => this.onLike(id, likes)} >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <ul>
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)
