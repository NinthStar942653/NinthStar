'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

import {Ripple} from '../Ripple';

export const Button = React.createClass({
	propTypes: {
		type: React.PropTypes.oneOf(['float', 'raised', 'flat'])
	},
	getDefaultProps() {
		return {
			type: 'flat'
		};
	},
	render() {
		// Get props
		const {className: CLASSNAME, type: TYPE, ...PROPS} = this.props;
		const BUTTON_CLASS = classNames([CLASSNAME, style.button,
			TYPE === 'float' || TYPE === 'raised' ?
				classNames([TYPE === 'float' ? material.shadow3 : material.shadow2, material.interactHover]) : '',
			material.interactActive
		]);
		
		return (
			<div className={BUTTON_CLASS} {...PROPS}/>
		);
	}
});
