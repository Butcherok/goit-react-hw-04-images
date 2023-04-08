import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnSpan,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

  const onQueryChange = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const onQuerySubmit = e => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query.trim().toLowerCase());
  };

  return (
    <Header>
      <SearchForm onSubmit={onQuerySubmit}>
        <SearchFormBtn type="submit">
          <BsSearch />
          <SearchFormBtnSpan>Search</SearchFormBtnSpan>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onQueryChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};