import { useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.scss';

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
    return createPortal(
      <div className={styles.modalBackground}>
        <div className={styles.modalCard}>{props.children}</div>
      </div>,
      element,
    );
  }

  return null;
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
