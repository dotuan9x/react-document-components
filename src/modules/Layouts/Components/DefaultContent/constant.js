import Loadable from 'react-loadable';

export default [
    {
        name: 'icon',
        title: 'Icons',
        routeParent: 'components',
        description: () => require('Components/Icon/Docs/description.md'),
        whenToUse: () => require('Components/Icon/Docs/when-to-use.md'),
        examples: [
            {
                markdown: () => require('Components/Icon/Previews/basic.md'),
                path: Loadable({
                    loader: () => import('Components/Icon/Previews/basic.jsx'),
                    loading: () => {return null}
                })
            }
        ]
    }
];
