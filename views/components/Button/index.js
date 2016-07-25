/*
 * Component: Button
 * Create:    2016-07-22
 */
'use strict';

import React from 'react';
import classNames from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

import {Ripple} from '../Ripple';

export const Button = React.createClass({
	render() {
		const {className: CLASSNAME, ...PROPS} = this.props;
		const BUTTON_CLASS = classNames([CLASSNAME, style.button, material.colorBlue, material.shadow2, material.hover, material.active, material.animate]);
		
		return (
			<div className={BUTTON_CLASS} {...PROPS}>
				<Ripple/>
			</div>
		);
	}
});
