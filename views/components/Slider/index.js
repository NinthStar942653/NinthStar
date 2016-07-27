'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

import {Input} from '../Input';

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
		// Get props
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
							<SliderBar min={MIN} max={MAX} value={this.state.value} setValue={this.setValue} {...sub.props}/>
						);
					case 'SliderInput':
						return (
							<SliderInput value={this.state.value} setValue={this.setValue} {...sub.props}/>
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
		// Get props
		const {min: MIN, max: MAX, step: STEP} = this.props;
		
		// Check value range
		this.setState({
			value: value < MIN ? MIN : value > MAX ? MAX : Math.round(value / STEP) * STEP
		});
	}
});

export const SliderBar = React.createClass({
	getInitialState() {
		return {
			drag: false
		};
	},
	handleClick(evt) {
		// Get props
		const {min: MIN, max: MAX} = this.props;
		const BAR = ReactDOM.findDOMNode(this);
		const X = evt.pageX - BAR.getBoundingClientRect().left;
		const LENGTH = BAR.offsetWidth;
		const VALUE = X * (MAX - MIN) / LENGTH + MIN;
		
		this.props.setValue(VALUE);
	},
	handleMouseDown(evt) {
		this.setState({
			drag: true
		});
	},
	handleMouseMove(evt) {
		if (this.state.drag) {
			// Get props
			const {min: MIN, max: MAX} = this.props;
			const BAR = ReactDOM.findDOMNode(this);
			const X = evt.pageX - BAR.getBoundingClientRect().left;
			const LENGTH = BAR.offsetWidth;
			const VALUE = X * (MAX - MIN) / LENGTH + MIN;
			
			this.props.setValue(VALUE);
		}
	},
	handleMouseUp() {
		this.setState({
			drag: false
		});
	},
	handleMouseLeave() {
		this.setState({
			drag: false
		});
	},
	render() {
		const {className: CLASSNAME, min: MIN, max: MAX, value: VALUE, type, setValue, ...PROPS} = this.props;
		const BAR_CLASSNAME = classNames([CLASSNAME, style.bar]);
		const BAR_DISPLAY_CLASSNAME = classNames([style.display]);
		const CONTROLLER_STYLE = {
			left: VALUE * 100 / (MAX - MIN) + '%'
		};
		
		return (
			<div className={BAR_CLASSNAME}
				onClick={this.handleClick}
				onMouseDown={this.handleMouseDown}
				onMouseMove={this.handleMouseMove}
				onMouseUp={this.handleMouseUp}
				onMouseLeave={this.handleMouseLeave}
				{...PROPS}>
				<div className={BAR_DISPLAY_CLASSNAME}/>
				<SliderController style={CONTROLLER_STYLE}/>
			</div>
		);
	}
});

const SliderController = React.createClass({
	render() {
		// Get props
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
		// Get props
		const {className: CLASSNAME, value: VALUE, setValue: SET_VALUE} = this.props;
		const INPUT_CLASS = classNames([CLASSNAME, style.input]);
		
		return (
			<Input className={INPUT_CLASS} value={VALUE} setValue={SET_VALUE}/>
		);
	}
});
