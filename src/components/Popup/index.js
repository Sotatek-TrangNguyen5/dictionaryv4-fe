import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

const Popup = ({ open, handleClose, action }) => {
  const {
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    clearErrors,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {};
  return (
    <Modal fullWidth maxWidth="xs" className={cx('dialog-root')} open={open} onClose={handleClose}>
      <div>{action}</div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            Word Target <span className="text-red-600">*</span>
          </div>
          <input
            {...register('wordTarget', {
              required: true,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            className={styles.input}
            name="wordTarget"
          />

          <div className="mb-2">
            Word Explain <span className="text-red-600">*</span>
          </div>
          <input
            {...register('wordExplain', {
              required: true,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            className={styles.input}
            name="wordExplain"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default Popup;
