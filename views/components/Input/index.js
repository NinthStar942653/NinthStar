'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Input = React.createClass({
	propTypes: {
		value: React.PropTypes.number,
		setValue: React.PropTypes.func
	},
	getDefaultProps() {
		return {
			value: 0,
			setValue: new Function()
		};
	},
	getInitialState() {
		return {
			value: this.props.value
		};
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.value
		});
	},
	handleChange(evt) {
		this.setState({
			value: evt.target.value
		});
	},
	handleBlur(evt) {
		this.props.setValue(this.state.value);
	},
	render() {
		// Get props
		const {className: CLASSNAME, value, setValue, ...PROPS} = this.props;
		const INPUT_CLASS = classNames([CLASSNAME, style.input]);
		
		return (
			<input className={INPUT_CLASS} value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur} {...PROPS}/>
		);
	}
});
