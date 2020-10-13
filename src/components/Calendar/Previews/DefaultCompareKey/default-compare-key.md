```jsx
import React from 'react';
import {Calendar} from '@antscorp/components';

const DefaultRangeKey = () => {

    const onChangeCalendar = (newProps) => {
        console.log(newProps);
    }; 

    return (
        <div>
            <Calendar 
                compareKey='previous_period'
                onChange={onChangeCalendar}
            />
        </div>
    );
};

export default DefaultRangeKey;
```