import React, { useEffect } from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          deleteMovie={props.deleteMovie}
          id={movie.id}
        />
      ))}
    </ul>
  );
};

export default MovieList;
