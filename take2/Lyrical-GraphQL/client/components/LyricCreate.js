import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import mutation from '../mutations/addLyricToSong';

export default graphql(mutation)(class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyric: ''
    };
  }

  createLyric(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.lyric,
        songId: this.props.songId
      }
    });

    this.setState({lyric: ''});
  }

  render() {
    return (
      <form onSubmit={this.createLyric.bind(this)}>
        <label>Add a lyric</label>
        <input 
          onChange={(event) => 
            this.setState({lyric: event.target.value})}
          value={this.state.lyric} />
      </form>
    );
  }
});
