import React from 'react';
import { connect } from 'react-redux';
import {Form, Formik } from 'formik';
import Error from '../../../components/Error/Error';
import { recoveryPassword, recoveryClear } from '../../../actions/actionCreator';
import styles from './RecoveryPasswordForm.module.sass';
import FormInput from '../../../components/FormInput/FormInput';
import Schems from '../../../validators/validationSchems';

const RecoveryPasswordForm = (props) =>{

    const clicked = (values) => {
        props.recoveryPassword({ data: values, history: props.history });
    };

    const { error, isFetching } = props.recovery;
    const { submitting, recoveryClear } = props;

    const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
    };
    
    return(
        <div className={styles.recoveryPasswordForm}>
            {error && (
                <Error
                data={error.data}
                status={error.status}
                clearError={recoveryClear}
            />
            )}
            <h2>PASSWORD RECOVERY</h2>
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
                        : 'Recovery'}
                    </span>
                    </button>
                </Form>
            </Formik>
        </div>
    );  
};

  const mapStateToProps = (state) => {
    const { recovery } = state;
    return { recovery };
  };
  
  const mapDispatchToProps = (dispatch) => (
    {
      recoveryPassword: ({ data, history }) => dispatch(recoveryPassword(data, history)),
      recoveryClear: () => dispatch(recoveryClear())
    }
  );

  export default connect(mapStateToProps, mapDispatchToProps)(RecoveryPasswordForm);