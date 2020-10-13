Để sử dụng được icon cần `import '@antscorp/components/main.css'` ở file `index.js`\
Sau đó dùng icon như ví dụ đơn giản sau:
```jsx
import React from 'react';

// Icons
import {Icon} from '@antscorp/components';

const basic = () => {
    return (
        <>
            <Icon type="icon-ants-delete" />
        </>
    );
};

export default basic;

```