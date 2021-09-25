import React, {useRef, useEffect} from 'react';
import styles from './ButtonGroup.module.sass';

const ButtonGroup = (props) => {
    const buttonsArray = [
        {
            decide: 'Yes',
            subtitle: 'The domain should exactly match the name',
            recommended: null
        },
        {
            decide: 'Yes',
            subtitle: 'But minor variations are allowed',
            recommended: '(Recommended)'
        },
        {
            decide: 'Yes',
            subtitle: 'Im looking for a name, not a Domain',
            recommended: null
        },
    ];

    const buttonRefs = useRef([]);
    buttonRefs.current = [];

    const addToRefs = (el) =>{
        if(el && !buttonRefs.current.includes(el)){
            buttonRefs.current.push(el);
        };
        console.log(buttonRefs.current)
    };

    const activeButton = (el) =>{
        if(el.style.border !== ''){
            el.style.border = '';
            el.children[0].style.backgroundColor = '';
        } else if(el.style.border == ''){
            for (const element of buttonRefs.current){
                element.style.border = '';
                element.children[0].style.backgroundColor = '';
            };
            el.style.border = "2px solid #28d2d0";
            el.children[0].style.backgroundColor = "#28d2d0";
        }
    }

    useEffect(() => {
        for (const el of buttonRefs.current){
            el.addEventListener("click", () => activeButton(el), false);
        };
        return () =>{
            for (const el of buttonRefs.current){
                el.removeEventListener("click", () => activeButton(el), true);
            };
        };
    },[])

    return (
        <div className = {styles.buttonGroupContainer}>
            {
                buttonsArray.map(({decide, subtitle, recommended}) =>{
                    return (
                        <div key = {decide} className = {styles.buttonGroupItem} ref = {addToRefs}>
                            <div className = {styles.decideDiv}>
                                {decide}  
                            </div>
                            <p>{subtitle}</p>
                            <p className = {styles.recommended}>{recommended}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ButtonGroup;