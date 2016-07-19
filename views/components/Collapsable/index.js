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
        const COLLAPSABLE_CLASS = classNames([material.shadow1]);
        
        return (
            <div className={COLLAPSABLE_CLASS}>
                {
                    React.Children.map(this.props.children, content => {
                        {
                            return (
                                <CollapsableItem name={content.props.name}>
                                    {
                                        content.props.children
                                    }
                                </CollapsableItem>
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
            active: Boolean(this.props.active !== undefined)
        };
    },
    render() {
        const ITEM_CLASS = classNames([style.item]);
        
        return (
            <div className={ITEM_CLASS}>
                <CollapsableTrigger clickCallback={this.clickCallback}>
                    {
                        this.props.name
                    }
                </CollapsableTrigger>
                <CollapsablePanel active={Boolean(this.state.active)}>
                    {
                        this.props.children
                    }
                </CollapsablePanel>
            </div>
        );
    },
    clickCallback() {
        this.setState({
            active: Boolean(!this.state.active)
        });
    }
});

const CollapsableTrigger = React.createClass({
    handleClick() {
        this.props.clickCallback();
    },
    render() {
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
    componentWillMount() {
        //this.height = getNode(this).clientHeight;
        //this.props.style = {height: this.props.active ? this.height + 'px' : 0};
    },
    render() {
        const PANEL_CLASS = classNames([style.panel]);
        return (
            <div className={PANEL_CLASS} style={this.props.active ? {height: this.height + 'px'} : {height: 0}}>
                {
                    this.props.children
                }
            </div>
        );
    }
});

export default Collapsable;
export {
    Collapsable,
    CollapsablePanel
};
