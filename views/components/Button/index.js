'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

import {Ripple} from '../Ripple';

export const Button = React.createClass({
	render() {
		// Get props
		const {className: CLASSNAME, children: CHILDREN, ...PROPS} = this.props;
		const BUTTON_CLASS = classNames([CLASSNAME, style.button, material.shadow2, material.hover, material.active, material.animate]);
		
		return (
			<div className={BUTTON_CLASS} {...PROPS}>
				{
					CHILDREN
				}
				<Ripple/>
			</div>
		);
	}
});
