import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';

const modal = document.querySelector('#modal-root');

export class Modal extends Component {
  
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyClick);
  }

  onKeyClick = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onMouseClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const {
      image: { largeImageURL, tags },
    } = this.props;

    return createPortal(
      <Overlay onClick={this.onMouseClick}>
        <ModalBox>
          <img src={largeImageURL} alt={tags} width="1280" />
        </ModalBox>
      </Overlay>,
      modal
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
