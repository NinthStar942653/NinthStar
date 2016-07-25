/*
 * Component: Dialog
 * Create:    2016-07-21
 */
'use strict';

import React from 'react';
import classNames from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Dialog = React.createClass({
    render() {
        const {className: CLASSNAME, style: STYLE, visible: VISIBLE, ...PROPS} = this.props;
        const PANEL_CLASS = classNames([CLASSNAME, style.panel, material.shadow3, material.animate]);
        const PANEL_STYLE = {
            top: VISIBLE ? '30%' : '-10%',
            opacity: VISIBLE ? 1 : 0,
            ...PANEL_STYLE
        };
        
        return (
            <div className={PANEL_CLASS} style={PANEL_STYLE} {...PROPS}/>
        );
    }
});
