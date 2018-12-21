import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';
import styled from 'styled-components';

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const DeleteButton = styled.i`
  cursor: pointer; 
`;

const SongLi = styled.li`
  display: flex;
  justify-content: space-between;
`;

const component = function(
    {mutate, data: {loading, songs, refetch}}) {

  async function deleteSong(id) {
    await mutate({variables: {id}});
    refetch();
  }

  if(loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul className='collection'>
          {songs.map(({id, title}) => 
            <SongLi className='collection-item' key={id}>
              <Link to={`/song/${id}`}>{title}</Link>
              <DeleteButton className='material-icons'
                 onClick={() => deleteSong(id)}>delete</DeleteButton>
            </SongLi>)}
        </ul>
        <Link to='/new' className='btn-floating btn-large red right"'>
          new
        </Link>
      </div>
    );
  }
};

export default compose(graphql(mutation), graphql(query))(component);
