'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

import {Input} from '../Input';

export const Slider = React.createClass({
	propTypes: {
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		step: React.PropTypes.number,
		value: React.PropTypes.number
	},
	getDefaultProps() {
		return {
			min: 0,
			max: 1,
			step: 1,
			value: 0
		}
	},
	getInitialState() {
		return {
			value: this.props.value
		};
	},
	render() {
		// Get props
		const {className: CLASSNAME, min: MIN, max: MAX, step, value, ...PROPS} = this.props;
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
			mouseDown: false,
			drag: false
		};
	},
	handleMouseDown(evt) {
		// Get props
		const {min: MIN, max: MAX} = this.props;
		const BAR = ReactDOM.findDOMNode(this);
		const X = evt.pageX - BAR.getBoundingClientRect().left;
		const LENGTH = BAR.offsetWidth;
		const VALUE = X * (MAX - MIN) / LENGTH + MIN;
		
		this.props.setValue(VALUE);
		
		this.setState({
			mouseDown: true
		});
	},
	handleMouseMove(evt) {
		if (this.state.mouseDown) {
			// Get props
			const {min: MIN, max: MAX} = this.props;
			const BAR = ReactDOM.findDOMNode(this);
			const X = evt.pageX - BAR.getBoundingClientRect().left;
			const LENGTH = BAR.offsetWidth;
			const VALUE = X * (MAX - MIN) / LENGTH + MIN;
			
			this.props.setValue(VALUE);
			
			this.setState({
				drag: true
			});
		}
	},
	handleMouseUp() {
		this.setState({
			mouseDown: false,
			drag: false
		});
	},
	handleMouseLeave() {
		this.setState({
			mouseDown: false,
			drag: false
		});
	},
	render() {
		const {className: CLASSNAME, min: MIN, max: MAX, value: VALUE, type, setValue, ...PROPS} = this.props;
		const BAR_CLASSNAME = classNames([CLASSNAME, style.bar]);
		const BAR_CLICKER_CLASSNAME = classNames([CLASSNAME, style.clicker]);
		const BAR_OUTER_CLASSNAME = classNames([style.barOuter]);
		const BAR_INNER_CLASSNAME = classNames([style.barInner]);
		const BAR_INNER_STYLE = {
			width: VALUE * 100 / (MAX - MIN) + '%',
			transitionDuration: this.state.drag ? '0s' : ''
		};
		const CONTROLLER_OUTER_CLASS = classNames([style.controllerOuter]);
		const CONTROLLER_INNER_CLASS = classNames([style.controllerInner]);
		
		return (
			<div className={BAR_CLASSNAME}
				onMouseDown={this.handleMouseDown}
				onMouseMove={this.handleMouseMove}
				onMouseUp={this.handleMouseUp}
				onMouseLeave={this.handleMouseLeave}
				{...PROPS}>
				<div className={BAR_OUTER_CLASSNAME}>
					<div className={BAR_INNER_CLASSNAME} style={BAR_INNER_STYLE}/>
					<div className={CONTROLLER_OUTER_CLASS}>
						<div className={CONTROLLER_INNER_CLASS}/>
					</div>
				</div>
			</div>
		);
	}
});

export const SliderInput = React.createClass({
	render() {
		// Get props
		const {className: CLASSNAME, ...PROPS} = this.props;
		const INPUT_CLASS = classNames([CLASSNAME, style.input]);
		
		return (
			<Input className={INPUT_CLASS} {...PROPS}/>
		);
	}
});
