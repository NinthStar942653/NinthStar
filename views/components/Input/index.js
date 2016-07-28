'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Input = React.createClass({
	handleChange(evt) {
		this.props.onChange(evt.target.value);
	},
	render() {
		// Get props
		const {className: CLASSNAME, value: VALUE, onChange, ...PROPS} = this.props;
		const INPUT_CLASS = classNames([CLASSNAME, style.input]);
		
		return (
			<input className={INPUT_CLASS} value={VALUE} onChange={this.handleChange} {...PROPS}/>
		);
	}
});
