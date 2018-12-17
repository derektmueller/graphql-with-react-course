import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

async function onSongDelete(id, mutate, refetch) {
  mutate({variables: {id}});

  refetch();
}


function renderSongs(props) {
  return props.data.songs.map(({id, title}) => {
    return (
      <li key={id} className='collection-item'>
        {title}
        <i className='material-icons'
          onClick={() => 
            onSongDelete(id, props.mutate, props.data.refetch)}>
          delete
        </i>
      </li>
    );
  });
}

function SongList(props) {
  if(props.data.loading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div>
      <ul className='collection'>{renderSongs(props)}</ul>
      <Link 
        to="/songs/new" 
        className='btn-floating btn-large red right'>
        <i className='material-icons'>adds</i>
      </Link>
    </div>
  );
};

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
