import PropTypes from 'prop-types';
import { MessageBox } from './Message.styled';

export const Message = ({ children }) => <MessageBox>{children}</MessageBox>;

Message.propTypes = { children: PropTypes.node.isRequired };
