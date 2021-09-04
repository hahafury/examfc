import React from 'react';
import styles from './EventContainer.module.sass';
import EventElement from '../EventElement/EventElement';
import {getAllEvents} from '../../../api/rest/restController';
import jwt_decode from 'jwt-decode';

const EventContainer = () => {

    const mapEvents = (event, index) => {
        return (
                <EventElement event = {event}/>
        );
    };

    const sortEvents = (a,b) =>{
        return new Date(a.eventDeadline) - new Date(b.eventDeadline);
    }

    getAllEvents({userId: jwt_decode(localStorage.getItem("accessToken")).userId})
    .then(data => {
        localStorage.setItem('events',JSON.stringify(data.data.data));
    });

    return(
        <div className = {styles.eventContainerWrapper}>  
            <div className = {styles.events}>
                <div className = {styles.eventHeader}>
                    <p>Live upcomming checks</p>
                    <div className = {styles.remainingTime}>
                        Remaining time
                        <img src = "https://i.imgur.com/mvHW8IJ.png" alt = "remaining-time-icon"></img>
                    </div>
                </div>
                <div className = {styles.eventForm}>
                    {   
                        JSON.parse(localStorage.getItem('events')).sort(sortEvents).map(mapEvents)
                    }
                </div>
            </div>  
        </div>
    );
}

export default EventContainer;