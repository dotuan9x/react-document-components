// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import toReactElement from 'jsonml-to-react-element';
import {Timeline} from 'antd';

const ChangeLog = (props) => {
    // Props
    const {changeLog = []} = props;

    console.log('ChangeLog -> changeLog', changeLog);

    return (
        <div>
            <Timeline>
                {
                    changeLog.length && changeLog.map((log, index) => (
                        <Timeline.Item key={log.title + index} >
                            <h5>{log.title}</h5>
                            {toReactElement(log.content)}
                        </Timeline.Item>
                    ))
                }
            </Timeline>
        </div>
    );
};

ChangeLog.propTypes = {};

export default ChangeLog;