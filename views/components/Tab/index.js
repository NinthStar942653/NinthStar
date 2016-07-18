/*
 * Component: Tab
 * Create:    2016-07-15
 */

'use strict';

import React from 'react';
import classnames from '../../public/classnames';

import material from '../../public/material';
import style from './style';

const Tab = React.createClass({
    getInitialState() {
        return {
            active_index: -1
        };
    },
    componentWillMount() {
        // Set initial active_index
        {
            let active_index = -1;
            
            React.Children.map(this.props.children, (panel, index) => {
                if (panel.props.active) {
                    if (active_index === -1) {
                        active_index = index;
                    } else {
                        console.warn('[Tab] More than one active panel. Only the first one will be set active.');
                    }
                }
            });
            
            if (active_index === -1) {
                active_index = 0;
            }
        
            this.state.active_index = active_index;
        }
    },
    render() {
        // Set classnames
        const TAB_CLASS = classnames([style.tab]);
        const SELECTOR_CLASS = classnames([material.row, material.shadow1, style.selectors]);
        const SELECTOR_STYLE = {
            width: 100 / this.props.children.length + '%'
        };
        const INDICATOR_CLASS = classnames([material.colorBlue, material.animate, style.indicator]);
        const INDICATOR_STYLE = {
            marginLeft: 100 * this.state.active_index / this.props.children.length + '%',
            width: 100 / this.props.children.length + '%'
        };
        const PANELS_CLASS = classnames([style.panels]);
        const PANELS_STYLE = {
            marginLeft: -100 * this.state.active_index + '%'
        };
        
        return (
            <div className={TAB_CLASS}>
                <div className={SELECTOR_CLASS}>
                    {
                        React.Children.map(this.props.children, (panel, index) => {
                            return (
                                <TabSelector style={SELECTOR_STYLE} index={index} clickCallBack={this.clickCallBack}>
                                    {
                                        panel.props.name
                                    }
                                </TabSelector>
                            );
                        })
                    }
                </div>
                <div className={INDICATOR_CLASS} style={INDICATOR_STYLE}></div>
                <div className={PANELS_CLASS}>
                    {
                        React.Children.map(this.props.children, (panel, index) => {
                            return (
                                <TabPanel style={index === 0 ? PANELS_STYLE : {}}>
                                    {
                                        panel.props.children
                                    }
                                </TabPanel>
                            );
                        })
                    }
                </div>
            </div>
        );
    },
    clickCallBack(new_active_index) {
        this.setState({
            active_index: new_active_index
        });
    }
});

const TabSelector = React.createClass({
    handleClick() {
        this.props.clickCallBack(this.props.index);
    },
    render() {
        // Set classnames
        const SelectorClass = classnames([material.col, style.selector]);
        
        return (
            <div className={SelectorClass} style={this.props.style} onClick={this.handleClick}>
                {
                    this.props.children
                }
            </div>
        );
    }
});

const TabPanel = React.createClass({
    render() {
        // Set classnames
        const PANEL_CLASS = classnames([material.animate, style.panel]);
        return (
            <div className={PANEL_CLASS} style={this.props.style}>
                {
                    this.props.children
                }
            </div>
        );
    }
});

export default Tab;
export {
    Tab,
    TabPanel
};
