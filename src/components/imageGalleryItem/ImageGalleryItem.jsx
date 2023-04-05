import PropTypes from 'prop-types';
import { GalleryItemImg } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ tags, largeImageURL }) => {
  return (
      <GalleryItemImg src={largeImageURL} alt={tags} />
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
