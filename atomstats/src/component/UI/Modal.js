import React from 'react';
import Backdrop from './Backdrop';
import classes from './Modal.css';

const modal = (props) => {
    return (
        <React.Fragment> 
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                Wicked Information 

                WOW
            </div>
        </React.Fragment>

    )
}

export default modal; 