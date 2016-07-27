'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Slider = React.createClass({
	getInitialState() {
		return {
			value: 0
		};
	},
	componentDidMount() {
		const VALUE = this.props.value;
		
		this.setState({
			value: VALUE === undefined ? 0 : VALUE
		});
	},
	render() {
		const {className: CLASSNAME, ...PROPS} = this.props;
		const SLIDER_CLASS = classNames([CLASSNAME, style.slider]);
		
		return (
			<div className={SLIDER_CLASS}>
			{
				React.Children.map(this.props.children, sub => {
					const TYPE = typeof(sub.type) === 'string' ? sub.type : sub.type.displayName;
					
					switch (TYPE) {
					case 'SliderBar':
						return (
							<SliderBar/>
						);
					case 'SliderInput':
						return (
							<SliderInput/>
						);
					default:
						console.warn('[Slider] Unknown subcomponent "' + TYPE + '". It will be ignored.');
					}
				})
			}
			</div>
		);
	}
});

export const SliderBar = React.createClass({
	render() {
		const {className: CLASSNAME, min: MIN, max: MAX, value: VALUE, type, ...PROPS} = this.props;
		const BAR_CLASSNAME = classNames([CLASSNAME, style.bar]);
		
		const DOM = ReactDOM.findDOMNode(this);
		const LENGTH = DOM === null ? 0 : DOM.offsetWidth;
		const CONTROLLER_STYLE = {
			left: VALUE * LENGTH / (MAX - MIN)
		};
		
		return (
			<div className={BAR_CLASSNAME} {...this.props}>
				<SliderController style={CONTROLLER_STYLE}/>
			</div>
		);
	}
});

const SliderController = React.createClass({
	render() {
		const STYLE = this.props.style;
		const CONTROLLER_OUTER_CLASS = classNames([style.outer]);
		const CONTROLLER_INNER_CLASS = classNames([style.inner]);
		
		return (
			<div className={CONTROLLER_OUTER_CLASS} style={STYLE}>
				<div className={CONTROLLER_INNER_CLASS}/>
			</div>
		);
	}
});

export const SliderInput = React.createClass({
	render() {
		const INPUT_CLASS = classNames([style.input]);
		return (
			<div className={INPUT_CLASS}>Input</div>
		);
	}
});
