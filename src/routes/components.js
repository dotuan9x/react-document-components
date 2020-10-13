import React from 'react';

const Components = React.lazy(() => import('Modules/Layouts/Components/DefaultContent'));

export default [
    {
        state: 'components',
        path: '/:userId/components/:name',
        exact: true,
        name: 'Components',
        showLeftMenu: true,
        showBreadcrumb: true,
        component: Components
    }
];
