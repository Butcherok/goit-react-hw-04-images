import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';

const modal = document.querySelector('#modal-root');

export const Modal = ({ image: { largeImageURL, tags }, toggleModal }) => {

  useEffect(() => {
    const onKeyClick = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', onKeyClick);
    return () => {
      document.removeEventListener('keydown', onKeyClick);
    };
  }, [toggleModal]);

  const onMouseClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={onMouseClick}>
      <ModalBox>
        <img src={largeImageURL} alt={tags} width="1280" />
      </ModalBox>
    </Overlay>,
    modal
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
