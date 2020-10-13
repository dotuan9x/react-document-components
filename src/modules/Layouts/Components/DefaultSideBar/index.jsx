// Libraries
import React, {useEffect, useState, useContext} from 'react';
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
    const properties = useContext(LayoutContext);

    const [selectedKeys, setSelectKeys] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);

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
                                        label: component.label
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
            console.log('error', error);
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
        const {path = '', label = '', name = '', icon = ''} = item;

        if (label && name) {
            return (
                <Menu.Item
                    key={name}
                    style={{
                        backgroundColor: '#1890ff'
                    }}
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

    return (
        <Sider
            className="site-layout-background"
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
                className={classnames({'text-center': collapsed}, {'text-left': !collapsed})}
                theme={'dark'}
                style={{width: '100%'}}
                defaultSelectedKeys={selectedKeys}
                defaultOpenKeys={openKeys}
            >
                {renderMenu(menuDataOptions)}
            </Menu>
        </Sider>
    );
};

export default DefaultSideBar;
