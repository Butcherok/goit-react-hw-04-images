import { useState } from 'react';
import { Container } from './App.styled';
import ImageGallery from './imageGallery/Gallery';
import Searchbar from './searchbar/Searchbar';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const onSubmit = value => {
    setQuery(value);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prefState => prefState + 1);
  };


  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        querySearch={query}
        nextPage={page}
        loadMore={loadMore}
      />
    </Container>
  );
}