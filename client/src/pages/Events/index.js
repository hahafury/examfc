import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import styles from './Events.module.sass';
import Header from '../../components/Header/Header';
import EventContainer from './EventContainer/EventContainer';
import EventCreateForm from './EventCreateForm/EventCreateForm';
import { changeEventsModeView } from '../../actions/actionCreator'
import classNames from 'classnames';
import {getAllEvents} from '../../api/rest/restController';
import jwt_decode from 'jwt-decode';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Footer from '../../components/Footer/Footer';

const Events = (props) => {
    
    const {
        eventsModeView, changeMode,
    } = props;

    getAllEvents({userId: jwt_decode(localStorage.getItem("accessToken")).userId})
        .then(data => {
            localStorage.setItem('events',JSON.stringify(data.data.data));
    });

    return(
        <>
            <Header/>
            <div className = {styles.eventsPageContainer}>
                <div className={styles.aside}>
                    <span className={styles.headerAside}>Select Option</span>
                    <div className={styles.optionsContainer}>
                        <div 
                            className={classNames(styles.optionContainer, { [styles.currentOption]: eventsModeView === CONSTANTS.EVENTS_INFO_MODE })}
                            onClick = {()=>{changeMode(CONSTANTS.EVENTS_INFO_MODE)}}
                        >
                            Events
                        </div>
                        <div
                            className={classNames(styles.optionContainer, { [styles.currentOption]: eventsModeView === CONSTANTS.EVENTS_CREATE_MODE })}
                            onClick = {()=>{changeMode(CONSTANTS.EVENTS_CREATE_MODE)}}
                        >
                            Create event
                        </div>
                    </div>
                </div>
                {eventsModeView === CONSTANTS.EVENTS_INFO_MODE ? <EventContainer/> : <EventCreateForm/>}
            </div>
            <ButtonGroup/>
            <Footer/>
        </>
    );

}

const mapStateToProps = (state) => {
    const { eventsModeView } = state.eventsReducer;
    return { eventsModeView } ;
};
  
const mapDispatchToProps = (dispatch) => ({
    changeMode: (data) => dispatch(changeEventsModeView(data)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Events);