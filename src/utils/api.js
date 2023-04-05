import axios from 'axios';

const API_KEY = '33641734-f7d46c14b35bfa5eb977d9e1a';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;

export const fetchImages = async (querySearch, page) => {
  const response = await axios({
    params: {
      key: API_KEY,
      q: querySearch,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page,
    },
  });
  return response.data;
};
