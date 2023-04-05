import { BtnLoadMore } from './button.styled';
import PropTypes from 'prop-types';

export const Button = ({ disabled, loadMore }) => (
  <BtnLoadMore type="button" disabled={disabled} onClick={loadMore}>
    Load more
  </BtnLoadMore>
);

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};
