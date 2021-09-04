import React from 'react';
import {Form, Formik } from 'formik';
import FormInput from '../../../components/FormInput/FormInput';
import Error from '../../../components/Error/Error';
import styles from './EventCreateForm.module.sass';
import { connect } from 'react-redux';
import { eventErrorClear, createEvent } from '../../../actions/actionCreator';
import jwt_decode from 'jwt-decode';
import Schems from '../../../validators/validationSchems';

const EventCreateForm = (props) => {

    const clicked = (values) => {
        const data = {
            eventOwner: jwt_decode(localStorage.getItem("accessToken")).userId,
            eventInfo: values.eventInfo,
            eventDateOfNotification: values.eventNotificationYear + '-' + format(values.eventNotificationMonth) + '-' + format(values.eventNotificationDay) + ' ' + format(values.eventNotificationHours) + ':' + format(values.eventNotificationMinutes),
            eventDeadline: values.eventDeadlineYear + '-' + format(values.eventDeadlineMonth) + '-' + format(values.eventDeadlineDay) + ' ' + format(values.eventDeadlineHours) + ':' + format(values.eventDeadlineMinutes),
        };
        if(Date.parse(data.eventDateOfNotification) <= Date.parse(data.eventDeadline) && Date.parse(data.eventDateOfNotification) > Date.parse(new Date()) && Date.parse(data.eventDeadline) > Date.parse(new Date())){
            validateDate(data.eventDateOfNotification);
            validateDate(data.eventDeadline);
            props.createEventRequest({data: data, history: props.history}); 
        }
        else{
            throw new Error('Check input data');
        } 

    };

    const validateDate = (value) =>{
        let dateArr = value.substring(0, value.length - 6).split("-");
          dateArr[1] -=1;
        const date = new Date(dateArr[0], dateArr[1], dateArr[2]);
        if ((date.getFullYear() == dateArr[0]) && (date.getMonth() == dateArr[1]) && (date.getDate() == dateArr[2])) {
          return true;
        } else {
            throw new Error('Check input data');
        }
    };

    const format = (value) => {
        if(value.length == 1)
            return '0' + value;
        else
            return value;
    };

    const formInputClasses = {
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
        notValid: styles.notValid,
        valid: styles.valid,
    }

    return(
        <div className = {styles.eventCreateFormWrapper}>
        {props.error && (
          <Error
            status={props.error.status}
            clearError={props.clearEventCreateError}
          />
        )}
            <Formik
                initialValues={{
                eventInfo: '',
                eventNotificationDay: '',
                eventNotificationMonth: '',
                eventNotificationYear: '',
                eventNotificationMinutes: '',
                eventNotificationHours: '',
                eventDeadlineDay: '',
                eventDeadlineMonth: '',
                eventDeadlineYear: '',
                eventDeadlineMinutes: '',
                eventDeadlineHours: '',
                }}
                onSubmit={clicked}
                validationSchema = {Schems.CreateEventSchem}
            >
                <Form>
                    <h2>Event info</h2>
                    <div>
                        <FormInput
                            classes={formInputClasses}
                            name="eventInfo"
                            type="text"
                            label="Event info"
                        />
                    </div>
                    <h2>Notification date/time</h2>
                    <div>
                        <FormInput
                            classes={formInputClasses}
                            name="eventNotificationDay"
                            type="text"
                            label="Day"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventNotificationMonth"
                            type="text"
                            label="Month"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventNotificationYear"
                            type="text"
                            label="Year"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventNotificationHours"
                            type="text"
                            label="Hours"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventNotificationMinutes"
                            type="text"
                            label="Minutes"
                        />
                    </div>
                    <h2>Deadline date/time</h2>
                    <div>
                        <FormInput
                            classes={formInputClasses}
                            name="eventDeadlineDay"
                            type="text"
                            label="Day"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventDeadlineMonth"
                            type="text"
                            label="Month"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventDeadlineYear"
                            type="text"
                            label="Year"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventDeadlineHours"
                            type="text"
                            label="Hours"
                        />
                        <FormInput
                            classes={formInputClasses}
                            name="eventDeadlineMinutes"
                            type="text"
                            label="Minutes"
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.submitContainer}
                    >
                        <span className={styles.inscription}>
                        {props.isEventAdded
                            ?   window.location.reload()
                            :   'Create'
                        }
                        </span>
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { error, history, isEventAdded } = state.eventsReducer;
    return { error, history, isEventAdded };
};
  
const mapDispatchToProps = (dispatch) => ({
    createEventRequest: ({ data,history }) => dispatch(createEvent(data,history)),
    clearEventCreateError: () => dispatch(eventErrorClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateForm);