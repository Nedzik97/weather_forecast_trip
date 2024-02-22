import { useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRootElement = document.querySelector('#modal');

export const Modal = (props) => {
  const { open } = props;
  const element = useMemo(() => {
    return document.createElement('div');
  }, []);

  useEffect(() => {
    modalRootElement.appendChild(element);

    return () => {
      modalRootElement.removeChild(element);
    };
  });

  if (open) {
    return createPortal(props.children, element);
  }

  return null;
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
