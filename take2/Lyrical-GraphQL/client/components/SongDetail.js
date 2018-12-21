import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

export default graphql(
  query, 
  {options: ({match: {params: {id}}}) => ({ variables: {id}})})
  (function(props) {
    const {data: {loading, song}} = props;

    if(loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Link to='/'>Back</Link>
          <h3>{song.title}</h3>
          <LyricList lyrics={song.lyrics || []} />
          <LyricCreate songId={song.id} />
        </div>
      );
    }
  });
