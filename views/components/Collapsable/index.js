'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Collapsable = React.createClass({
    getInitialState() {
        return {
            // Panel active state array
            active: []
        };
    },
    componentDidMount() {
        // Get props
        const {children: CHILDREN, accordion: ACCORDION} = this.props;
        
        // Variables
        let active_index = null;
        let active = [];
        
        React.Children.map(CHILDREN, (item, index) => {
            const ACTIVE = item.props.active;
            
            // No active
            if (ACTIVE === undefined) {
                active[index] = false;
            // Active
            } else {
                // Normal type collapsable
                if (ACCORDION === undefined) {
                    active[index] = true;
                // Accortion type collapsable
                } else {
                    // No active panel yet
                    if (active_index === null) {
                        active_index = index;
                        active[index] = true;
                    // Active panel already
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
        const COLLAPSABLE_CLASS = classNames([CLASSNAME, material.shadow1]);
        
        return (
            <div className={COLLAPSABLE_CLASS} {...PROPS}>
                {
                    React.Children.map(CHILDREN, (item, index) => {
                        // Get props
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
        // Get props
        const ACCORDION = this.props.accordion;
        
        // Get state
        let active = this.state.active;
        
        // Normal type collapsable
        if (ACCORDION === undefined) {
            active[index] = !active[index];
        // Accordion type collapsable
        } else {
            for (let i = 0, l = active.length; i < l; ++i) {
                active[i] = i === index ? !active[index] : false;
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
        // Get props
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

export const CollapsablePanel = React.createClass({
    getInitialState() {
        return {
            // Display height
            height: 0
        };
    },
    componentDidMount() {
        this.setState({
            height: ReactDOM.findDOMNode(this).offsetHeight
        });
    },
    render() {
        // Get props
        const {className: CLASSNAME, style: STYLE, active, ...PROPS} = this.props;
        const PANEL_CLASS = classNames([style.panel]);
        const PANEL_STYLE = {
            height: this.state.height === 0 ? 'auto' : this.props.active ? this.state.height : 0,
            ...STYLE
        }
        
        return (
            <div className={PANEL_CLASS} style={PANEL_STYLE} {...PROPS}/>
        );
    }
});
