import React, { useEffect, useRef} from 'react';
import styles from './CollapseItem.module.sass';

const CollapseItem = (props) => {
    const collapseButton = useRef();
    const collapseItem = useRef();

    const collapseFunction = () =>{
        if (collapseItem.current.style.maxHeight !== '0px'){
            collapseItem.current.style.maxHeight = '0px';
            collapseButton.current.children[0].style.transform = 'rotate(-90deg)';
        } else {
            collapseItem.current.style.maxHeight = `${collapseItem.current.scrollHeight + 'px'}`;
            collapseButton.current.children[0].style.transform = 'rotate(0deg)';
        };
    }

    useEffect(() => {
            collapseItem.current.style.maxHeight = '0px';
            collapseButton.current.addEventListener("click",collapseFunction);
        },[]);

    return (
        <div className = {styles.card}>
            <button type="button" className = {styles.collapsible} ref={collapseButton}>
                {props.buttonText}
                <span className = {styles.cardBtnArrow}>
                    <span class="fas fa-arrow-down small" style = {{color: '#377dff'}}></span>
                </span>
            </button>
            <div className = {styles.content} ref = {collapseItem}>
                <p>{
                    props.contentText
                }</p>
            </div>
        </div>
    );
};

export default CollapseItem;