import React, { Component } from 'react';

class LyricList extends Component {
  constructor(props) {
    super(props)
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content}) => {
      return (
        <li key={id}>{content}</li>
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
