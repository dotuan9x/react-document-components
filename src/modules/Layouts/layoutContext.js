import React from 'react';

const initialState = {};

const LayoutContext = React.createContext({
    state: initialState,
    setComponentSelected: () => {}
});

export {LayoutContext};

