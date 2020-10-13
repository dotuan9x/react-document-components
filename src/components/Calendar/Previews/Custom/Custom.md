```jsx
import React from 'react';
import {Calendar} from '@antscorp/components';

export default function Custom() {
    return (
        <>
            <Calendar
                overlayStyle={{
                    border: 'none',
                    width: '200px'
                }}
            />
        </>
    );
}
```