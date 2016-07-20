/*
 * Component: Collapsable
 * Create:    2016-07-18
 */
'use strict';

import React from 'react';
import classNames from '../../public/classNames';
import getNode from '../../public/getNode';

import material from '../../public/material/material.scss';
import style from './style';

const Collapsable = React.createClass({
    getInitialState() {
        return {
            active: []
        };
    },
    componentDidMount() {
        // Get props
        const {children: CHILDREN, accordion: ACCORDION, ...PROPS} = this.props;
            
        let active_index = null;
        let active = [];
        
        React.Children.map(CHILDREN, (item, index) => {
            const {active: ACTIVE, ...PORPS} = item.props;
            
            if (ACTIVE === undefined) {
                active[index] = false;
            } else {
                if (ACCORDION === undefined) {
                    active[index] = true;
                } else {
                    if (active_index === null) {
                        active_index = index;
                        active[index] = true;
                    } else {
                        active[index] = false;
                        console.warn('[Collapsable] More than one active panel in accordion type. Only the first one will be set active.');
                    }
                }
            }
        });
        
        this.setState({
            active: active
        });
    },
    render() {
        // Get props
        const {className: CLASSNAME, children: CHILDREN, accordion, ...PROPS} = this.props;
        
        // Set classNames
        const COLLAPSABLE_CLASS = classNames([CLASSNAME, material.shadow1]);
        
        let active_index = null;
        
        return (
            <div className={COLLAPSABLE_CLASS} {...PROPS}>
                {
                    React.Children.map(CHILDREN, (item, index) => {
                        const {active, ...PROPS} = item.props;
                        
                        return (
                            <CollapsableItem index={index} active={this.state.active[index]} collapsableTrigger={this.collapsableTrigger} {...PROPS}/>
                        );
                    })
                }
            </div>
        );
    },
    collapsableTrigger(index) {
        const ACCORDION = this.props.accordion;
        let active = this.state.active;
        
        if (ACCORDION === undefined) {
            active[index] = !active[index];
        } else {
            for (let i = 0, l = active.length; i < l; ++i) {
                active[index] = i === index ? !active[index] : false;
            }
        }
        
        this.setState({
            active: active
        });
    }
});

const CollapsableItem = React.createClass({
    render() {
        // Get props
        const {className: CLASSNAME, name: NAME, index: INDEX, collapsableTrigger: COLLAPSABLE_TRIGGER, ...PROPS} = this.props;
        
        // Set classNames
        const ITEM_CLASS = classNames([CLASSNAME, style.item]);
        
        return (
            <div className={ITEM_CLASS}>
                <CollapsableTrigger index={INDEX} collapsableTrigger={COLLAPSABLE_TRIGGER}>
                    {
                        NAME
                    }
                </CollapsableTrigger>
                <CollapsablePanel {...PROPS}/>
            </div>
        );
    }
});

const CollapsableTrigger = React.createClass({
    handleClick() {
        this.props.collapsableTrigger(this.props.index);
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
