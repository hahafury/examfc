import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { authActionLogin, clearAuth } from '../../actions/actionCreator';
import styles from './LoginForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';

const LoginForm = (props) => {

  const clicked = (values) => {
    props.loginRequest({ data: values, history: props.history });
  };

  const { error, isFetching } = props.auth;
  const { submitting, authClear } = props;

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginForm}>
          {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
          )}
          <h2>LOGIN TO YOUR ACCOUNT</h2>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={clicked}
            validationSchema={Schems.LoginSchem}
          >
            <Form>
              <FormInput
                classes={formInputClasses}
                name="email"
                type="text"
                label="Email Address"
              />
              <FormInput
                classes={formInputClasses}
                name="password"
                type="password"
                label="Password"
              />
              <button
                type="submit"
                disabled={submitting}
                className={styles.submitContainer}
              >
                <span className={styles.inscription}>
                  {isFetching
                    ? 'Submitting...'
                    : 'LOGIN'}
                </span>
              </button>
            </Form>
          </Formik>
        </div>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => (
  {
    loginRequest: ({ data, history }) => dispatch(authActionLogin(data, history)),
    authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
