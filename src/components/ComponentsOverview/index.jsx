// Libraries
import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {Card, Row, Col, Tag} from 'antd';

// Styles
import styles from './styles.module.less';

// Context
import {LayoutContext} from 'Modules/Layouts/layoutContext';

const ComponentsOverview = (props) => {
    // Props
    const properties = useContext(LayoutContext).state.layout;
    const {setComponentSelected} = useContext(LayoutContext);

    const {menus = []} = properties; 

    const showRenderComponents = () => {
        try {
            return menus.map(component => {
                return showRenderSubComponents(component);
            });
        } catch (error) {
            // 
        }
    };

    const onClickOverview = (key) => {
        setComponentSelected(key);
    };

    const showRenderSubComponents = (component) => {
        if (component.components && component.components.length) {
            return (
                <div key={component.name}>
                    <h2>{component.label}</h2>
                    {component.components.map(childComponent => {
                        return showRenderSubComponents(childComponent);
                    })}
                </div>
            );
        } else {
            if (component.child && component.child.length) {
                return (
                    <div key={component.name} style={{paddingLeft: 20}}>
                        <strong style={{color: 'rgba(0, 0, 0, 0.45)'}}>{component.label} <Tag style={{color: 'rgba(0, 0, 0, 0.45)'}}>{component.child.length}</Tag></strong>
                        <Row gutter={[20, 20]} style={{marginTop: 10}}>
                            {component.child.map(childComponent => {
                                return (
                                    <Col key={childComponent.name} onClick={() => onClickOverview(childComponent.name)}>
                                        <Card className={styles['wrapper-card']} title={childComponent.label} size='small' style={{width: 200}}>
                                            <div className={styles['card']} >
                                                <img alt={childComponent.label} width={150}  src={childComponent.image} className={styles['image-background']} />
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                );
            } else {
                return (
                    <Card onClick={() => props.onClickComponentView(component.name)} className={styles['wrapper-card']} key={component.name} title={component.label} size='small' style={{width: 200}}>
                        <div className={styles['card']} >
                            <img alt={component.label} width={150}  src={component.image} className={styles['image-background']} />
                        </div>
                    </Card>
                );
            }
        }
    };

    return (
        <div>
            {showRenderComponents()}
        </div>
    );
};

ComponentsOverview.propTypes = {};

export default ComponentsOverview;