```jsx
import React from 'react';
import {Calendar} from '@antscorp/components';

const Apply = () => {

    const onApplyCalendar = (value) => {
        console.log('rangeDateSelected', value);
    };

    return (
        <div>
            <Calendar 
                onApply={onApplyCalendar}
            />
        </div>
    );
};

export default Apply;
```
