import React, { useState, useEffect } from 'react';
import EventTimer from '../EventTimer/EventTimer';
import styles from './EventElement.module.sass';

const EventElement = (props) => {
    const [currentDate, setCurrentDate] = useState(Date.parse(new Date()));
    const [eventDeadline,setEventDeadline] = useState(Date.parse(props.event.eventDeadline.substring(0, props.event.eventDeadline.length - 5)));
    const [eventDate,setEventDate] = useState(Date.parse(props.event.eventDate));
    const [overralProgressbarValue,setOverralProgressbarValue] = useState(eventDeadline - eventDate);
    const [currentProgressbarPosition, setCurrentProgressbarPosition] = useState(currentDate - eventDate);
    const [progressbarWidth,setProgressbarWidth] = useState((currentProgressbarPosition/overralProgressbarValue)*100);  

    useEffect(()=>{
        const tick = setInterval(() => {
            if(currentProgressbarPosition >= overralProgressbarValue){
                setProgressbarWidth(100);
            } else{
                setCurrentProgressbarPosition(currentProgressbarPosition + 1000);
                setProgressbarWidth((currentProgressbarPosition/overralProgressbarValue)*100);
            }        
        }, 1000);
        return () => {
            clearInterval(tick);
        }
    });

    
    return(
        <>
            <div className = {styles.eventElementWrapper}>
                <div className = {styles.eventElement} style = {{width: `${progressbarWidth}%`}} key = {props.event.eventId}>
                    <p className = {styles.eventInfo}>{props.event.eventInfo}</p>
                    <EventTimer eventDate = {props.event.eventDate} eventDeadline = {props.event.eventDeadline}/>
                </div>
            </div>
        </>
    );
};

export default EventElement;