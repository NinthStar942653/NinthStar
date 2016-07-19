/*
 * Component: Tab
 * Create:    2016-07-15
 */

'use strict';

import React from 'react';
import classNames from '../../public/classNames';

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
            let active_index = null;
            
            React.Children.map(this.props.children, (panel, index) => {
                if (panel.props.active) {
                    if (active_index === null) {
                        active_index = index;
                    } else {
                        console.warn('[Tab] More than one active panel. Only the first one will be set active.');
                    }
                }
            });
            
            if (active_index === null) {
                active_index = 0;
            }
        
            this.state.active_index = active_index;
        }
    },
    render() {
        // Get props
        const {className: CLASSNAME, children: CHILDREN, ...PROPS} = this.props;
        
        // Set classNames
        const TAB_CLASS = classNames([CLASSNAME, style.tab]);
        const SELECTOR_CLASS = classNames([style.selectors, material.row, material.shadow1, ]);
        const SELECTOR_STYLE = {
            width: 100 / CHILDREN.length + '%'
        };
        const INDICATOR_CLASS = classNames([style.indicator, material.colorBlue, material.animate]);
        const INDICATOR_STYLE = {
            marginLeft: 100 * this.state.active_index / CHILDREN.length + '%',
            width: 100 / CHILDREN.length + '%'
        };
        const PANELS_CLASS = classNames([style.panels, material.animate]);
        
        return (
            <div className={TAB_CLASS} {...PROPS}>
                <div className={SELECTOR_CLASS}>
                    {
                        React.Children.map(CHILDREN, (panel, index) => {
                            return (
                                <TabSelector style={SELECTOR_STYLE} index={index} tabSelect={this.tabSelect}>
                                    {
                                        panel.props.name
                                    }
                                </TabSelector>
                            );
                        })
                    }
                </div>
                <div className={INDICATOR_CLASS} style={INDICATOR_STYLE}/>
                <div className={PANELS_CLASS}>
                    {
                        React.Children.map(CHILDREN, (panel, index) => {
                            const {name, ...PROPS} = panel.props;
                            
                            return (
                                <TabPanel ofs={index === 0 ? -100 * this.state.active_index + '%' : 0} {...PROPS}/>

                            );
                        })
                    }
                </div>
            </div>
        );
    },
    tabSelect(new_active_index) {
        this.setState({
            active_index: new_active_index
        });
    }
});

const TabSelector = React.createClass({
    handleClick() {
        this.props.tabSelect(this.props.index);
    },
    render() {
        // Get props
        const {className: CLASSNAME, index, tabSelect, ...PROPS} = this.props;
        
        // Set classNames
        const SelectorClass = classNames([CLASSNAME, style.selector, material.col]);
        
        return (
            <div className={SelectorClass} onClick={this.handleClick} {...PROPS}/>
        );
    }
});

const TabPanel = React.createClass({
    render() {
        // Get props
        const {className: CLASSNAME, ofs: OFS, style: STYLE, active, ...PROPS} = this.props;
        
        // Set classNames
        const PANEL_CLASS = classNames([CLASSNAME, style.panel]);
        
        return (
            <div className={PANEL_CLASS} style={{marginLeft: OFS, ...STYLE}} {...PROPS}/>
        );
    }
});

export default Tab;
export {
    Tab,
    TabPanel
};
