'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Input = React.createClass({
	getInitialState() {
		const VALUE = this.props.value;
		
		return {
			value: VALUE
		};
	},
	componentWillMount() {
		const VALUE = this.props.value;
		
		this.setState({
			value: VALUE
		});
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
		const VALUE = this.state.value;
		const INPUT_CLASS = classNames([CLASSNAME, style.input]);
		
		return (
			<input className={INPUT_CLASS} value={VALUE} onChange={this.handleChange} onBlur={this.handleBlur} {...PROPS}/>
		);
	}
});
