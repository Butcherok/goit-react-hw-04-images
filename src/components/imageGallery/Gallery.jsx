import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import { Gallery } from './Gallery.styled';
import { GalleryItem } from 'components/imageGalleryItem/ImageGalleryItem.styled';
import { Button } from 'components/button/button';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/modal/Modal';
import { Loader } from 'components/loader/loader';
import { Message } from 'components/message/Message';
import { fetchImages } from 'utils/api';
import { STATUS } from 'utils/constans';

export default function ImageGallery({ querySearch, nextPage, loadMore }) {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getImages() {
      try {
        setStatus(STATUS.PENDING);
        setError(null);
        const { totalHits, hits } = await fetchImages(
          querySearch,
          nextPage,
          controller
        );
        setTotalHits(totalHits);
        setImages(getSimpleData(hits));
        setStatus(STATUS.RESOLVED);

        if (nextPage !== 1) {
          setImages([...images, ...getSimpleData(hits)]);
          setStatus(STATUS.RESOLVED);
          setTimeout(() => {
            scroll.scrollToBottom();
          }, 1000);
        }
      } catch (error) {
        setError(error);
        setStatus(STATUS.ERROR);
      }
    }

    if (querySearch) getImages();

    return () => {
      controller.abort();
    };
  }, [nextPage, querySearch]);

  function getSimpleData(data) {
    return data.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getCurrentIndex = id => {
    const index = images.findIndex(image => image.id === id);
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  return (
    <>
      <Gallery>
        {images.map(({ id, ...otherProps }) => {
          return (
            <GalleryItem
              key={id}
              onClick={() => {
                getCurrentIndex(id);
                toggleModal();
              }}
            >
              <ImageGalleryItem {...otherProps} />
            </GalleryItem>
          );
        })}
      </Gallery>

      {!!images.length && status === STATUS.RESOLVED && (
        <Button loadMore={loadMore} disabled={images.length >= totalHits} />
      )}
      {status === STATUS.PENDING && <Loader />}

      {showModal && <Modal image={currentImage} toggleModal={toggleModal} />}

      {error && (
        <Message>{`${error}. Something is wrong, please try again later!`}</Message>
      )}

      {!images.length && status === STATUS.RESOLVED && (
        <Message>Nothing found. Try again.</Message>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  querySearch: PropTypes.string.isRequired,
  nextPage: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
};

// export class OldImageGallery extends Component {
//   state = {
//     images: [],
//     showModal: false,
//     currentIndex: null,
//     error: null,
//     status: STATUS.IDLE,
//   };

// totalHits = null;

// async componentDidUpdate(prevProps) {
//   const { querySearch, nextPage } = this.props;
//   if (prevProps.querySearch !== querySearch) {
//     try {
//       this.setState({ status: STATUS.PENDING, error: null });
//       const { totalHits, hits } = await fetchImages(querySearch, nextPage);
//       this.totalHits = totalHits;
//       this.setState({
//         images: this.getSimpleData(hits),
//         status: STATUS.RESOLVED,
//       });
//     } catch (error) {
//       this.setState({ error, status: STATUS.ERROR });
//     }
//   }
//   if (prevProps.nextPage < nextPage) {
//     try {
//       this.setState({ status: STATUS.PENDING, error: null });
//       const { hits } = await fetchImages(querySearch, nextPage);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...this.getSimpleData(hits)],
//         status: STATUS.RESOLVED,
//       }));
//       scroll.scrollToBottom();
//     } catch (error) {
//       this.setState({ error, status: STATUS.ERROR });
//     }
//   }
// }

// getSimpleData = data => {
//   return data.map(({ id, tags, webformatURL, largeImageURL }) => {
//     return { id, tags, webformatURL, largeImageURL };
//   });
// };

// toggleModal = () => {
//   this.setState(prevState => ({ showModal: !prevState.showModal }));
// };

// setCurrentIndex = id => {
//   const { images } = this.state;
//   const index = images.findIndex(image => image.id === id);
//   this.setState({ currentIndex: index });
// };

//   render() {
//     const { images, showModal, currentIndex, status, error } = this.state;
//     const currentImage = images[currentIndex];
//     return (
// <>
//   <Gallery>
//     {images.map(({ id, ...otherProps }) => {
//       return (
//         <GalleryItem
//           key={id}
//           onClick={() => {
//             this.setCurrentIndex(id);
//             this.toggleModal();
//           }}
//         >
//           <ImageGalleryItem {...otherProps} />
//         </GalleryItem>
//       );
//     })}
//   </Gallery>

//   {!!images.length && status === STATUS.RESOLVED && (
//     <Button
//       loadMore={this.props.loadMore}
//       disabled={images.length >= this.totalHits}
//     />
//   )}
//   {status === STATUS.PENDING && <Loader />}

//   {showModal && (
//     <Modal image={currentImage} toggleModal={this.toggleModal} />
//   )}

//   {error && (
//     <Message>{`${error}. Something is wrong, please try again later!`}</Message>
//   )}

//   {!images.length && status === STATUS.RESOLVED && (
//     <Message>Nothing found. Try again.</Message>
//   )}
// </>
//     );
//   }
// }

// ImageGallery.propTypes = {
//   querySearch: PropTypes.string.isRequired,
//   nextPage: PropTypes.number.isRequired,
//   loadMore: PropTypes.func.isRequired,
// };
