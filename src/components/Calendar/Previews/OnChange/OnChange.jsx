// Libraries
import React from 'react';
import {Calendar} from '@antscorp/components';

export default function OnChange() {

    const onChangeCalendar = (newProps) => {
        console.log(newProps);
    };

    return (
        <div>
            <Calendar 
                rangeKey='last_month'
                onChange={onChangeCalendar}
            />
        </div>
    );
}
