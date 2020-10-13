// Libraries
import React, {useState} from 'react';
import {Row, Col, message, Input, Empty} from 'antd';
import PropTypes from 'prop-types';

// Icons
import {Icon} from '@antscorp/components';
import '@antscorp/components/main.css';

const icons = ['icon-ants-delete', 'icon-ants-send', 'icon-ants-leapfrogging', 'icon-ants-note', 'icon-ants-trigger', 'icon-ants-enrol', 'icon-ants-diagram',
    'icon-ants-delay', 'icon-ants-flag', 'icon-ants-add-square', 'icon-ants-minus-square', 'icon-ants-invisible', 'icon-ants-caret-left', 'icon-ants-caret-right',
    'icon-ants-caret-up', 'icon-ants-caret-down', 'icon-ants-black-square', 'icon-ants-square-outline', 'icon-ants-delta', 'icon-ants-five-dots', 'icon-ants-bars',
    'icon-ants-double-four-dots', 'icon-ants-double-three-dots', 'icon-ants-line-chart', 'icon-ants-danger', 'icon-ants-warning-circle', 'icon-ants-remove-circle',
    'icon-ants-check-small', 'icon-ants-add', 'icon-ants-fullscreen-exit', 'icon-ants-angle-left', 'icon-ants-angle-right', 'icon-ants-step-backward', 'icon-ants-step-forward',
    'icon-ants-back', 'icon-ants-front', 'icon-ants-send-to-back', 'icon-ants-bring-to-front', 'icon-ants-upload', 'icon-ants-download', 'icon-ants-double-arrow-up',
    'icon-ants-three-dot-vertical', 'icon-ants-multi-monitor', 'icon-ants-clock-twinkle', 'icon-ants-arrow-alt-down', 'icon-ants-arrow-alt-up', 'icon-ants-clock-error',
    'icon-ants-star', 'icon-ants-pie-chart', 'icon-ants-picture', 'icon-ants-area-chart', 'icon-ants-earth', 'icon-ants-geo-map', 'icon-ants-arrow-down', 'icon-ants-switch-side-panel',
    'icon-ants-arrow-up', 'icon-ants-ABC', 'icon-ants-123', 'icon-ants-coding', 'icon-ants-bullet-chart', 'icon-ants-copy-report', 'icon-ants-db-oracle', 'icon-ants-undo',
    'icon-ants-user', 'icon-ants-uni1F4A1', 'icon-ants-uni1F4A2', 'icon-ants-icon-scorecard', 'icon-ants-floppy-disk', 'icon-ants-calendar', 'icon-ants-calendar-small',
    'icon-ants-pivot-chart', 'icon-ants-scatter-chart', 'icon-ants-bar', 'icon-ants-table', 'icon-ants-bar-chart', 'icon-ants-tree-map', 'icon-ants-info', 'icon-ants-padlock',
    'icon-ants-open-in-new-window', 'icon-ants-crop', 'icon-ants-filter', 'icon-ants-academy', 'icon-ants-search', 'icon-ants-view', 'icon-ants-smart-phone', 'icon-ants-uni1F59F',
    'icon-ants-uni1F5A0', 'icon-ants-desktop', 'icon-ants-full-screen', 'icon-ants-exclamation', 'icon-ants-remove', 'icon-ants-check', 'icon-ants-list-view-thumbnail', 'icon-ants-grid-view-thumbnail',
    'icon-ants-edit', 'icon-ants-trash', 'icon-ants-force-run', 'icon-ants-info-without-circle', 'icon-ants-laptop', 'icon-ants-dropdown-list', 'icon-ants-chart-setting', 'icon-ants-plus-square-outlined',
    'icon-ants-minus-square-outlined', 'icon-ants-calendar-v2', 'icon-ants-tab-group', 'icon-ants-slide-group', 'icon-ants-input-box', 'icon-ants-fixed-size', 'icon-ants-date-range-control', 'icon-ants-advanced-filter', 
    'icon-ants-slider', 'icon-ants-minus', 'icon-ants-angle-up', 'icon-ants-angle-down', 'icon-ants-sort', ''
];

const imageIcons = [
    'icon-undo', 'icon-redo', 'icon-add-chart', 'icon-tabel', 'icon-line-chart', 'icon-bar-chart', 'icon-pie-chart', 'icon-kpi-metric', 'icon-description', 'icon-image-component', 'icon-shape', 'icon-circle',
    'icon-date-picker', 'icon-dimension-filter', 'icon-view', 'icon-bring-to-front', 'icon-send-to-back', 'icon-close-square', 'icon-selection-mode', 'icon-shared-report', 'icon-refresh-data', 'icon-geo-map',
    'icon-pivot-table', 'icon-scatter-chart', 'icon-cloud-down', 'icon-bullet', 'icon-area-chart', 'icon-tree-map', 'icon-setting', 'icon-bell', 'icon-warning', 'icon-drag', 'icon-edit', 'icon-close', 'icon-add', 'icon-danger-valid', 'icon-back-filter', 'icon-close-square-sm', 'icon-checked-sm',
    'icon-arrow-first', 'icon-arrow-pre', 'icon-arrow-next', 'icon-plus-white', 'icon-filter-grey', 'icon-campaign-grey', 'icon-success-green', 'icon-error-red', 'icon-arrow-circle', 'icon-btn-arrow', 'icon-arrow-down-red',
    'icon-arrow-up-green', 'icon-maximize', 'icon-demographic', 'icon-yeild-optiminzation', 'icon-pricing-model', 'icon-manage-ad', 'icon-bg-transparent', 'icon-analytic', 'icon-analytic-account', 'icon-close-white-filter-v2',
    'icon-filter-v2', 'icon-arrow-filter-v2', 'icon-save-filter-v2', 'icon-close-filter-v2', 'icon-pen-filter-v2', 'icon-beta-tooltip', 'icon-align-left', 'icon-align-right', 'icon-align-center', 'icon-align-justify', 'icon-calendar',
    'icon-arrow-grey', 'icon-connect-join-field', 'icon-connect-join-field-grey', 'icon-arrow-down-grey', 'icon-config', 'icon-info', 'icon-warning-grey', 'icon-preview-image', 'icon-preview-image-small', 'icon-predefined-report', 'icon-my-report',
    'icon-my-report-template', 'icon-shared-with-me', 'icon-gallery-template', 'icon-beta', 'icon-explorer', 'icon-data-sources', 'icon-connector', 'icon-destination-channel', 'icon-workflow', 'icon-audit-ads-a1', 'icon-campaign-a1', 'icon-analytics-a1',
    'icon-connector-a1', 'icon-product-center-a1', 'icon-keyword-suggestion-a1', 'icon-click-fraud-detection-a1', 'icon-to-do-list-a1', 'icon-adx', 'icon-ants', 'icon-google-adwords', 'icon-google-ads', 'icon-facebook', 'icon-google-analytics', 'icon-coc-coc',
    'icon-appnexus', 'icon-admicro', 'icon-dfp', 'icon-woocommerce', 'icon-zalo', 'icon-google', 'icon-instagram', 'icon-tiki', 'icon-sheets', 'icon-lazada-v2', 'icon-merchant-center', 'icon-a1', 'icon-kiotviet', 'icon-kiotviet-mini', 'icon-elastic-search-no-text',
    'icon-elastic-search', 'icon-sapo', 'icon-sapo-mini', 'icon-haravan', 'icon-haravan-mini', 'icon-haravan-no-text', 'icon-shopee-no-text', 'icon-lazada', 'icon-shopee', 'icon-blend-data', 'icon-btn-blue', 'icon-btn-blue-sm', 'icon-blue-square', 'icon-blue-checkbox',
    'icon-blue-circle', 'icon-blue-radio-btn', 'icon-gray-circle', 'icon-gray-radio-btn', 'icon-blue-sub', 'icon-gray-square', 'icon-gray-checkbox'
];

const basic = (props) => {
    // State
    const [searchValue, setSearchValue] = useState('');

    const onClickIcon = (icon) => {
        try {
            const iconElement = document.createElement('textarea');

            iconElement.innerText = `<Icon type='${icon}' />`;

            document.body.appendChild(iconElement);

            iconElement.select();

            document.execCommand('copy');

            message.success({
                content: <span style={{verticalAlign: 'middle'}}>
                    {`<Icon type='${icon}' /> copied!`}
                </span>,
                duration: 1
            });

            iconElement.remove();
        } catch (error) {
            if (typeof props.onError === 'function') {
                props.onError(error, {
                    action: 'onClickIcon',
                    args: {icon}
                });
            }
        }
    };

    const onChangeSearch = (event) => {
        try {
            const {value} = event.target;

            setSearchValue(value);
        } catch (error) {
            if (typeof props.onError === 'function') {
                props.onError(error, {
                    action: 'onChangeSearch',
                    args: {event}
                });
            }
        }
    };

    const showRenderIcons = () => {
        try {
            if (icons && icons.length > 0) {
                const newIcons = icons.filter(icon => {
                    if ( icon.toLowerCase().indexOf(searchValue.toLowerCase().trim()) > -1) {
                        return icon;
                    }
                } );

                const newImageIcons = imageIcons.filter(icon => {
                    if (icon.toLowerCase().indexOf(searchValue.toLowerCase().trim()) > -1) {
                        return icon;
                    }
                });

                return (
                    <Row gutter={[16, 16]}>
                        <Col span={24}>SVG Icons</Col>
                        {newIcons.length > 0 ? newIcons.map(icon => {
                            return (
                                <Col key={icon} span={4} onClick={() => onClickIcon(icon)}>
                                    <div className={'icon-item'} style={{fontSize: '30px'}}>
                                        <Icon type={icon} />
                                        <div style={{fontSize: '13px', marginTop: '10px', maxWidth: '150px'}}>{icon}</div>
                                    </div>
                                </Col>
                            );
                        }) : null}
                        <Col span={24}>Sprite Icons</Col>
                        {newImageIcons.length > 0 ? newImageIcons.map(icon => {
                            return (
                                <Col key={icon} span={4} onClick={() => onClickIcon(icon)}>
                                    <div className={'icon-item image-icon'}>
                                        <Icon type={icon} overlayStyle={{transform: 'scale(1.3)'}} />
                                        <div style={{fontSize: '13px', marginTop: '10px', maxWidth: '150px'}}>{icon}</div>
                                    </div>
                                </Col>
                            );
                        }) : null}
                        {newImageIcons.length <= 0 && newIcons.length <= 0 ?  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{width: '100%'}} /> : null}
                    </Row>
                );
            }
        } catch (error) {
            if (typeof props.onError === 'function') {
                props.onError(error, {
                    action: 'showRenderIcons',
                    args: {event}
                });
            }
        }
    };

    return (
        <>
            <Row>
                <div style={{height: 70, width: '100%'}}>
                    <Input
                        suffix={<Icon type='icon-ants-search' />} 
                        style={{overflow: 'hidden', maxHeight: '40px', display: 'flex', padding: '0px 10px'}}
                        onChange={onChangeSearch}
                        placeholder='Search icon here, click icon to copy code'
                    />
                </div>
            </Row>
            {showRenderIcons()}
        </>
    );
};

basic.propTypes = {
    onError: PropTypes.func
};

export default basic;