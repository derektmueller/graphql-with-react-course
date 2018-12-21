import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import query from '../queries/fetchSongs';
import mutation from '../mutations/addSong';

async function onSubmit(event) {
  event.preventDefault();

  const resp = 
    await this.props.mutate({
      variables: {title: this.state.title},
      refetchQueries: [{query}]
    });

  this.props.history.push('/');
}

export default graphql(mutation)(withRouter(
  class SongCreate extends Component {
    constructor(props) {
      super(props);
      this.state = {title: ''};
    }

    render() {
      return (
        <div>
          <Link to='/'>Back</Link>
          <h3>Create a new song</h3>
          <form onSubmit={onSubmit.bind(this)}>
            <label>Song Title:</label>
            <input onChange={event => 
                this.setState({title: event.target.value})}
              value={this.state.title} />
          </form>
        </div>
      );
    }
  }));
