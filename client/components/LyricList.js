import React, { Component } from 'react';

class LyricList extends Component {
  constructor(props) {
    super(props)
  }

  onLike(id) {
    console.log("liked "+ id)
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <i className="material-icons" onClick={(id) => this.onLike(id)} >
            thumb_up
          </i>
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

export default LyricList
