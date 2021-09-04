import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import styles from './RecoveryResult.module.sass';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import {changePassword, changePasswordErrorClear} from '../../../actions/actionCreator';
import {Link, Redirect} from 'react-router-dom';

const RecoveryResult = (props) => {

    const {error} = props.recovery;

    useEffect(()=>{
        props.changePassword({
            data: {
                recovery: window.location.pathname.substring(10)
            }
        });
    },[]);

    const passwordChangedSuccessfully = () => {
        return (
            <div className = {styles.recoveryResultMainContainer}>
                <h1>Your password has been successfully changed</h1>
                <p>Go to the <Link to = '/login'>login</Link> page to log into your account</p>
            </div>
        );
    };

    const passwordChangeError = (error) =>{
        return (
            <>
                <div className = {styles.recoveryResultMainContainer}>
                    <h1>Something went wrong</h1>
                    <p>This link is not valid</p>
                </div>
            </>
        );
    };

    return (
        <>
            {error 
                ? passwordChangeError(error)
                : passwordChangedSuccessfully()
            }
            <Footer/>
        </>
    );
}
  
const mapStateToProps = (state) => {
    const { recovery } = state;
    return { recovery };
  };
  
  const mapDispatchToProps = (dispatch) => (
    {
      changePassword: ({data}) => dispatch(changePassword(data)),
      changePasswordErrorClear: () => dispatch(changePasswordErrorClear())
    }
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryResult);