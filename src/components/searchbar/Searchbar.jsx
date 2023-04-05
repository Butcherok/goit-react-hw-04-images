import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnSpan,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onQueryChange = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    if (!query.trim()) return;
    onSubmit(query.trim().toLowerCase());
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormBtn type="submit">
            <BsSearch />
            <SearchFormBtnSpan>Search</SearchFormBtnSpan>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onQueryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
