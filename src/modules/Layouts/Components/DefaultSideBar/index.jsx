// Libraries
import React, {useEffect, useState, useContext, useMemo} from 'react';
import {Layout, Menu, Row} from 'antd';
import classnames from 'classnames';

import {
    FileDoneOutlined
} from '@ant-design/icons';

// Context
import {LayoutContext} from 'Modules/Layouts/layoutContext';

// Assets
import styles from './styles.module.less';

const DefaultSideBar = (props) => {
    const properties = useContext(LayoutContext).state.layout;
    const keyComponentSelected = useContext(LayoutContext).state.keyComponentSelected;
    const {setComponentSelected} = useContext(LayoutContext);

    const [menuDataOptions, setMenuDataOptions] = useState([]);

    useEffect(() => {
        try {
            if (properties && properties.menus && properties.menus.length) {
                let arrMenus = [];

                properties.menus.map((menu) => {
                    if (menu.name && menu.label) {
                        let arrChildren = [];

                        if (menu.components) {
                            menu.components.map((component) => {
                                if (component.name && component.label) {
                                    arrChildren.push({
                                        name: component.name,
                                        label: component.label,
                                        child: component.child
                                    });
                                }
                            });
                        }

                        arrMenus.push({
                            name: menu.name,
                            label: menu.label,
                            icon: <FileDoneOutlined />,
                            children: arrChildren
                        });

                    }
                });

                if (arrMenus.length) {
                    setMenuDataOptions(arrMenus);
                }
            }
        } catch (error) {
            //
        }
    }, [properties]);

    const renderMenu = (menu) => {
        if (menu) {
            return menu.map(item => {
                const {label = '', name = '', icon = '', children = []} = item;

                if (name) {
                    if (children.length) {
                        return (
                            <Menu.SubMenu
                                key={name}
                                title={
                                    <Row type={'flex'} align={'middle'}>
                                        {icon}
                                        <span>{label}</span>
                                    </Row>
                                }
                            >
                                {renderMenu(children)}
                            </Menu.SubMenu>
                        );
                    } else {
                        return renderMenuElement(item);
                    }
                }
            });
        }

        return null;
    };

    const renderMenuElement = (item) => {
        const {path = '', label = '', name = '', icon = '', child = []} = item;

        if (label && name) {
            return Array.isArray(child) && child.length ? (
                <Menu.ItemGroup title={label} key={name}>
                    {child.map(childItem => (
                        <Menu.Item
                            key={childItem.name}
                        >
                            <Row type={'flex'} align={'middle'}>
                                {childItem.icon}
                                <span>{childItem.label}</span>
                            </Row>
                        </Menu.Item>
                    ))}
                </Menu.ItemGroup>
            ) : (
                <Menu.Item
                    key={name}
                >
                    <Row type={'flex'} align={'middle'}>
                        {icon}
                        <span>{label}</span>
                    </Row>
                </Menu.Item>
            );
        }

        return null;
    };

    const {Sider} = Layout;
    const {collapsed} = props;

    const onClickItem = (value) => {
        setComponentSelected(value.key);
    };

    return (
        <Sider
            className={classnames('site-layout-background', styles['sidebar'])}
            theme={'light'}
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={235}
        >
            <div
                className={classnames(styles['logo'])}
                style={{paddingTop: collapsed ? 6 : 0, paddingBottom: collapsed ? 6 : 0}}
            >
                <img
                    src={properties.logoUrl}
                    alt={'ants-logo'}
                    width={collapsed ? 80 : 115}
                />
            </div>
            <Menu
                mode={'inline'}
                className={classnames({'text-center': collapsed}, {'text-left': !collapsed}, styles['menu-sidebar'])}
                theme={'light'}
                style={{width: '100%'}}
                onClick={onClickItem}
                selectedKeys={keyComponentSelected}
                defaultSelectedKeys={props.defaultSelectedKeys}
                defaultOpenKeys={props.defaultOpenKeys}
            >
                <Menu.Item key={'over-view'}>Components Overview</Menu.Item>
                {renderMenu(menuDataOptions)}
            </Menu>
        </Sider>
    );
};

DefaultSideBar.defaultProps = {
    defaultSelectedKeys: [],
    defaultOpenKeys: []
};

export default DefaultSideBar;
