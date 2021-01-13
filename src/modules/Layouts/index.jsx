import React, {Component} from 'react';
import Loadable from 'react-loadable';
import {Layout} from 'antd';

const {Header, Content, Footer} = Layout;

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined, FileDoneOutlined
} from '@ant-design/icons';

// Components
import DefaultSideBar from './Components/DefaultSideBar';
import DefaultContent from 'Modules/Layouts/Components/DefaultContent';

// Utils
import {handleError} from 'Src/utils';

// Assets
import 'Assets/css/styles.less';

import {LayoutContext} from './layoutContext';

const PATH = 'Modules/Layouts/index.jsx';

class Layouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            component: {},
            keyComponentSelected: ''
        };
    }

    componentDidMount() {
        try {
            // Validate menus
            if (this.props.menus && this.props.menus.length) {
                let selectedComponent = {};

                this.props.menus.map((menu) => {
                    if (menu.name && menu.label) {
                        if (menu.components) {
                            menu.components.map((component) => {
                                if (component.name && component.label) {
                                    if (component.child && component.child.length) {
                                        component.child.map(childComponent => {
                                            // First component
                                            if (!selectedComponent.name || childComponent.active) {
                                                selectedComponent = childComponent;
                                            }
                                        });
                                    }
                                    // First component
                                    if (!selectedComponent.name || component.active) {
                                        selectedComponent = component;
                                    }
                                }
                            });
                        }
                    }
                });

                if (selectedComponent.name) {
                    this.setState({
                        // component: selectedComponent,
                        keyComponentSelected: 'over-view'
                    });
                }
            }

        } catch (error) {
            handleError(error, {
                path: PATH
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            if (this.state.keyComponentSelected !== prevState.keyComponentSelected) {
                this.onChangeComponent(this.state.keyComponentSelected);
            }
        } catch (error) {
            handleError(error, {
                path: PATH
            });
        }
    }

    onChangeComponent = (key) => {
        try {

            let selectedComponent = {};

            if (key === 'over-view') {
                selectedComponent = {
                    name: 'over-view',
                    label: 'Components Overview',
                    description: 'We provides plenty of UI components to enrich your web applications, and we will improve components experience consistently. We also recommand some great Third-Party Libraries additionally.'
                };

            } else {
                this.props.menus && this.props.menus.map(menu => {
                    if (menu.name && menu.label) {
                        if (menu.components && menu.components.length) {
                            menu.components.map(component => {
                                if (component.child && component.child.length) {
                                    component.child.map(childComponent => {
                                        if (childComponent.name === key) {
                                            selectedComponent = childComponent;
                                        }
                                    });
                                }
                                if (component.name === key) {
                                    selectedComponent = component;
                                }
                            });
                        } else {
                            if (menu.name === key) {
                                selectedComponent = menu;
                            }
                        }
                    }
                });
            }

            this.setState({
                component: selectedComponent
            });
        } catch (error) {
            handleError(error, {
                path: PATH
            });
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    setComponentSelected = (key) => {
        try {
            this.setState({
                keyComponentSelected: key
            });
        } catch (error) {
            handleError(error, {
                path: PATH
            });
        }
    }

    render() {
        // Props
        const {sidebar = {}} = this.props;

        return (
            <React.Fragment>
                <LayoutContext.Provider
                    value={{state: {layout: this.props, keyComponentSelected: this.state.keyComponentSelected}, setComponentSelected: this.setComponentSelected}}
                >
                    <Layout style={{minHeight: '100vh'}}>
                        <DefaultSideBar
                            collapsed={this.state.collapsed}
                            defaultOpenKeys={sidebar.defaultOpenKeys}
                            defaultSelectedKeys={sidebar.defaultSelectedKeys}
                        />
                        <Layout className="site-layout">
                            <Header className="site-layout-background" style={{
                                padding: 0,
                                boxShadow: '3px 0 10px 0 rgba(8, 73, 93, 0.3)'
                            }}>
                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle
                                })}
                            </Header>
                            <Content style={{margin: '0 16px'}}>
                                <DefaultContent component={this.state.component} />
                            </Content>
                            <Footer style={{textAlign: 'center'}}>{this.props.copyright}</Footer>
                        </Layout>
                    </Layout>
                </LayoutContext.Provider>
            </React.Fragment>
        );
    }
}

Layouts.defaultProps = {
    sidebar: {
        defaultSelectedKeys: ['over-view'],
        defaultOpenKeys: ['components']
    },
    menus: [

    ],
    logoUrl: 'https://ants.vn/wp-content/uploads/2015/02/Logo-website-207x60-slogan-2.png',
    copyright: 'ants.vn©2020',
    onError: () => {}
};

export default Layouts;
