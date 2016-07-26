'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

import {Ripple} from '../Ripple';

export const Button = React.createClass({
	render() {
		// Get props
		const {className: CLASSNAME, children: CHILDREN, type: TYPE, rippleColor: RIPPLE_COLOR, ...PROPS} = this.props;
		const BUTTON_CLASS = classNames([CLASSNAME, style.button,
			TYPE === 'float' || TYPE === 'raised' ? classNames([
				TYPE === 'float' ? material.shadow3 : material.shadow2
			, material.interactHover, material.interActActive]) : ''
		]);
		
		// Unknown type
		if (TYPE !== 'float' && TYPE !== 'raised' && TYPE !== 'flat') {
			console.warn('[Button] Unknown type "' + TYPE + '". Regard as type flat');
		}
		
		return (
			<div className={BUTTON_CLASS} {...PROPS}>
				<Ripple color={RIPPLE_COLOR}/>
				{
					CHILDREN
				}
			</div>
		);
	}
});
