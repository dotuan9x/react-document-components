// Libraries
import React from 'react';
import toReactElement from 'jsonml-to-react-element';

const ChangeLog = (props) => {
    // Props
    const {changeLog} = props;

    return (
        <div className='markdown-change-log' >
            <div className='line' />
            {changeLog && toReactElement(changeLog)}
        </div>
    );
};

ChangeLog.propTypes = {};

export default ChangeLog;