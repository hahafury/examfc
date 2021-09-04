import React, {useEffect} from 'react';
import styles from './RecoveryPasswordPage.module.sass';
import Logo from '../../components/Logo';
import RecoveryPasswordForm from './RecoveryPasswordForm/RecoveryPasswordForm';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';

const RecoveryPasswordPage = (props) => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginContainer}>
            <div className={styles.headerSignUpPage}>
                <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
                <div className={styles.linkLoginContainer}>
                <Link
                    to="/registration"
                    style={{ textDecoration: 'none' }}
                >
                    <span>Signup</span>
                </Link>
                </div>
                <div className={styles.linkLoginContainer}>
                <Link
                    to="/login"
                    style={{ textDecoration: 'none' }}
                >
                    <span>Login</span>
                </Link>
                </div>
            </div>
            <div className={styles.loginFormContainer}>
                <RecoveryPasswordForm history={props.history} />
            </div>
            </div>
        </div>
    );
}
  


  
export default RecoveryPasswordPage;