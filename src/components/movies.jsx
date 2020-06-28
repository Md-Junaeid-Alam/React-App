import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    count: 9,
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    console.log("Like Clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    console.log(page);
  };

  render() {
    const { length: movieCount } = this.state.movies;
    if (movieCount == 0) return <p>There is no movie in database</p>;
    return (
      <React.Fragment>
        <p>Showing {movieCount} in following table</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <th>{movie.genre.name}</th>
                <th>{movie.numberInStock}</th>
                <th>{movie.dailyRentalRate}</th>
                <th>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </th>
                <th>
                  <button>
                    <div
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </div>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}
export default Movies;
