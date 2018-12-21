import React from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/likeLyric';
import styled from 'styled-components';

const LikeButton = styled.i`
  cursor: pointer;
`;

export default graphql(mutation)(function(props) {
  async function likeLyric({id, likes}) {
    props.mutate(
      {
        variables: {id},
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id,
            __typename: 'LyricType',
            likes: (likes + 1)
          }
        }
     });
  }

  return (
    <ul className='collection'>
      {props.lyrics.map(({id, content, likes}) => 
        <li 
          className='collection-item' 
          key={id}>
          {content}
          <LikeButton
            className='material-icons right'
            onClick={() => likeLyric({id, likes})}>
            thumb_up
          </LikeButton>
          <div>Likes: <span>{likes}</span></div>
        </li>)}
    </ul>
  );
});
