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
		const {className: CLASSNAME, min: MIN, max: MAX, step, value, type, ...PROPS} = this.props;
		const SLIDER_CLASS = classNames([CLASSNAME, style.slider]);
		
		if (MIN > MAX) {
			console.warn('[Slider] Min(' + MIN + ') is larger than max(' + MAX + ').');
		}
		
		return (
			<div className={SLIDER_CLASS}>
			{
				React.Children.map(this.props.children, sub => {
					const TYPE = typeof(sub.type) === 'string' ? sub.type : sub.type.displayName;
					
					switch (TYPE) {
					case 'SliderBar':
						return (
							<SliderBar min={MIN} max={MAX} value={this.state.value} setValue={this.setValue} {...PROPS}/>
						);
					case 'SliderInput':
						return (
							<SliderInput min={MIN} max={MAX} value={this.state.value} {...PROPS}/>
						);
					default:
						console.warn('[Slider] Illegal subcomponent "' + TYPE + '".');
					}
				})
			}
			</div>
		);
	},
	setValue(value) {
		const STEP = this.props.step;
		
		this.setState({
			value: Math.round(value / STEP) * STEP
		});
	}
});

export const SliderBar = React.createClass({
	handleClick(evt) {
		const {min: MIN, max: MAX} = this.props;
		const BAR = ReactDOM.findDOMNode(this);
		const X = evt.pageX - BAR.getBoundingClientRect().left;
		const LENGTH = BAR.offsetWidth;
		const VALUE = X * (MAX - MIN) / LENGTH + MIN;
		
		this.props.setValue(VALUE);
	},
	render() {
		const {className: CLASSNAME, min: MIN, max: MAX, value: VALUE, type, setValue, ...PROPS} = this.props;
		const BAR_CLASSNAME = classNames([CLASSNAME, style.bar]);
		const BAR_DISPLAY_CLASSNAME = classNames([style.display]);
		const CONTROLLER_STYLE = {
			left: VALUE * 100 / (MAX - MIN) + '%'
		};
		
		return (
			<div className={BAR_CLASSNAME} onMouseDown={this.handleClick} {...PROPS}>
				<div className={BAR_DISPLAY_CLASSNAME}/>
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
			<div className={INPUT_CLASS}>{this.props.value}</div>
		);
	}
});
