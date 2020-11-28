import tmdb from "../api/api";

async function getDiscoverMovies(dispatch, history, name, page) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    const movies = await tmdb.get(`/movie/${name}`, {
      params: { page },
    });
    console.log(movies);
    await dispatch({ type: "fetch_movies", payload: movies });
    dispatch({ type: "fetch_movies_loaded" });
  } catch (error) {
    history.push(`${process.env.PUBLIC_URL}/404`);
  }
}

async function getGenreMovies(
  dispatch,
  history,
  genres,
  genreName,
  page,
  sort
) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    let { id } = genres.filter((g) => g.name === genreName)[0];
    const movies = await tmdb.get(`discover/movie`, {
      params: { with_genres: id, page, sort_by: sort },
    });
    await dispatch({ type: "fetch_movies", payload: movies.data });
    dispatch({ type: "fetch_movies_loaded" });
  } catch (error) {
    history.push(`${process.env.PUBLIC_URL}/404`);
  }
}

async function getSearchResults(dispatch, history, query, page) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    const movies = await tmdb.get(`search/movie`, { params: { query, page } });
    await dispatch({ type: "fetch_movies", payload: movies.data });
    dispatch({ type: "fetch_movies_loaded" });
  } catch (error) {
    history.push(`${process.env.PUBLIC_URL}/404`);
  }
}

export { getDiscoverMovies, getGenreMovies, getSearchResults };
