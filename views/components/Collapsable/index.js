/*
 * Component: Collapsable
 * Create:    2016-07-18
 */
'use strict';

import React from 'react';
import classNames from '../../public/classNames';
import getNode from '../../public/getNode';

import material from '../../public/material';
import style from './style';

const Collapsable = React.createClass({
    render() {
        // Get props
        const {className: CLASSNAME, children: CHILDREN, ...PROPS} = this.props;
        
        // Set classNames
        const COLLAPSABLE_CLASS = classNames([CLASSNAME, material.shadow1]);
        
        return (
            <div className={COLLAPSABLE_CLASS} {...PROPS}>
                {
                    React.Children.map(CHILDREN, item => {
                        {
                            return (
                                <CollapsableItem {...item.props}/>
                            );
                        }
                    })
                }
            </div>
        );
    }
});

const CollapsableItem = React.createClass({
    getInitialState() {
        return {
            active: this.props.active !== undefined
        };
    },
    render() {
        // Get props
        const {className: CLASSNAME, name: NAME, active, ...PROPS} = this.props;
        
        // Set classNames
        const ITEM_CLASS = classNames([CLASSNAME, style.item]);
        
        return (
            <div className={ITEM_CLASS} {...PROPS}>
                <CollapsableTrigger collapsableTrigger={this.collapsableTrigger}>
                    {
                        NAME
                    }
                </CollapsableTrigger>
                <CollapsablePanel active={this.state.active} {...PROPS}/>
            </div>
        );
    },
    collapsableTrigger() {
        this.setState({
            active: !this.state.active
        });
    }
});

const CollapsableTrigger = React.createClass({
    handleClick() {
        this.props.collapsableTrigger();
    },
    render() {
        // Set classNames
        const TRIGGER_CLASS = classNames([material.shadow1, style.trigger]);
        
        return (
            <div className={TRIGGER_CLASS} onClick={this.handleClick}>
                {
                    this.props.children
                }
            </div>
        );
    }
});

const CollapsablePanel = React.createClass({
    getInitialState() {
        return {
            height: 0
        };
    },
    componentDidMount() {
        this.setState({
            height: getNode(this).offsetHeight
        });
    },
    render() {
        const {className: CLASSNAME, style: STYLE, active, ...PROPS} = this.props;
        
        // Set classNames
        const PANEL_CLASS = classNames([style.panel]);
        
        return (
            <div className={PANEL_CLASS} style={{height: this.state.height === 0 ? 'auto' : this.props.active ? this.state.height : 0, ...STYLE}} {...PROPS}/>
        );
    }
});

export default Collapsable;
export {
    Collapsable,
    CollapsablePanel
};
