// Libraries
import React, {useState, useRef} from 'react';
import {Row, Tooltip, Tabs} from 'antd';
import PropTypes from 'prop-types';
import {CopyOutlined, CheckOutlined} from '@ant-design/icons';

const {TabPane} = Tabs;

// Components
import Highlighter from 'Src/components/Highlighter';

// Styles
import styles from './styles.module.less';

// Utils
import {handleError} from 'Src/utils';

const PATH = 'Components/PreviewCode/PreviewCode.jsx';

function PreviewCode(props) {
    // State
    const [isShowCode, setShowCode] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const codeRef = useRef(null);

    const onClickExpandCode = () => {
        try {
            setShowCode(!isShowCode);
        } catch (error) {
            handleError(error, {
                path: PATH
            });
        }
    };

    const onClickCopy = () => {
        try {
            const copyCode = document.createElement('textarea');

            copyCode.innerHTML = codeRef.current.textContent;

            document.body.appendChild(copyCode);

            copyCode.select();

            document.execCommand('copy');

            setIsCopy(true);

            setTimeout(() => {
                setIsCopy(false);
            }, 500);

            copyCode.remove();
        } catch (error) {
            handleError(error, {
                path: PATH
            });
        }
    };

    return (
        <>
            <Row >
                <div className={styles['preview-code']}>
                    <Tooltip title={isCopy ? 'Copied!' : 'Copy code'}>
                        {isCopy ? <CheckOutlined style={{color: '#52c41a'}} className={styles['expand-icon']} /> : <CopyOutlined onClick={onClickCopy} className={styles['expand-icon']} />}
                    </Tooltip>
                    <Tooltip title={isShowCode ? 'Hide code' : 'Show code'}>
                        <i
                            onClick={onClickExpandCode}
                            className={`${styles['expand-icon']} ${isShowCode ? 'icon-document-expand-icon-hide' : 'icon-document-expand-icon-show'}`}
                        />
                    </Tooltip>
                </div>
            </Row>
            <Row>
                <div
                    className='highlight-code'
                    ref={codeRef}
                    style={{
                        display: isShowCode ? 'block' : 'none'
                    }}
                >
                    <div>
                        <Tabs defaultActiveKey="1" tabBarStyle={{padding: '0px 10px'}}>
                            <TabPane tab="JavaScript" key="1">
                                {props.code}
                            </TabPane>
                            {props.styles ?
                                <TabPane tab="Css" key="2">
                                    <Highlighter>
                                        {props.styles}
                                    </Highlighter>
                                </TabPane> : null}
                        </Tabs>
                    </div>
                </div>
            </Row>
        </>
    );
}

PreviewCode.propTypes = {
    onError: PropTypes.func
};

PreviewCode.defaultProps = {
    code: ''
};

export default PreviewCode;

