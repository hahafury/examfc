import React, { useState, useEffect } from 'react';
import connect from 'react-redux';
import styles from './EventTimer.module.sass';

const EventTimer = (props) => {
    const [timeleft, setTimeleft] = useState(Date.parse(props.eventDeadline.substring(0, props.eventDeadline.length - 5)) - Date.parse(new Date()));
    const [hours, setHours] = useState(Math.floor(timeleft/1000/60/60));
    const [minutes, setMinutes] = useState(Math.floor((timeleft/1000/60/60 - hours)*60));
    const [seconds,setSeconds] = useState(Math.floor(((timeleft/1000/60/60 - hours)*60 - minutes)*60));
    const [isDone, setIsDone] = useState(timeleft <= 0 ? true : false);

    useEffect(()=>{
        const tick = setInterval(()=>{
            if(seconds <= 0 && minutes >= 0){
                setSeconds(59);
                setMinutes(minutes - 1);
            } 
            else{
                setSeconds(seconds - 1)   
            }
            
            if (minutes <= 0 && hours > 0) {
                    setMinutes(59);
                    setHours(hours - 1);
            }

            if (hours === 0 && minutes === 0 && seconds === 0){
                setIsDone('Done!');
            }
        },1000);
        return () => {
            clearInterval(tick);
        };
    },[seconds,minutes,hours]);

    const getHours = () => {
        if(hours === 0) 
            return ''
        else
            return `${hours}h`
    };

    const getMinutes = () => {
        if(minutes === 0) 
            return ''
        else
            return `${minutes}m`
    }

    const getSeconds = () => {
        return `${seconds}s`
    }

    return (
      <>
        <p className = {styles.timer}>{isDone ? 'Done!': `${getHours()} ${getMinutes()} ${getSeconds()}`}</p>
      </>
    );
  };
  
  export default EventTimer;