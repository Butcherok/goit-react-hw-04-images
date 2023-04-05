import React, { Component } from 'react';
import { Container } from './App.styled';
import { ImageGallery } from './imageGallery/Gallery';
import { Searchbar } from './searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  onSubmit = value => {
    this.setState({ query: value, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          querySearch={this.state.query}
          nextPage={this.state.page}
          loadMore={this.loadMore}
        />
      </Container>
    );
  }
}
