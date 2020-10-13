```jsx
import React from 'react';
import {Calendar} from '@antscorp/components';

const DefaultRangeKey = () => {
    return (
        <div>
            <Calendar 
                rangeKey='last_month'
            />
        </div>
    );
};

export default DefaultRangeKey;
```