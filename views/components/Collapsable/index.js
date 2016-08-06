'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Collapsable = React.createClass({
	propTypes: {
		type: React.PropTypes.oneOf(['normal', 'accordion'])
	},
	getDefaultProps() {
		return {
			type: 'normal'
		};
	},
	getInitialState() {
		return {
			// Panel active state array
			active: []
		};
	},
	componentWillMount() {
		// Get props
		const {children: CHILDREN, type: TYPE} = this.props;
		
		// Variables
		let active_index = null;
		let active = [];
		
		React.Children.map(CHILDREN, (item, index) => {
			// Active
			if (item.props.active) {
				// Normal type collapsable
				if (TYPE === 'normal') {
					active[index] = true;
				// Accortion type collapsable
				} else {
					// No active panel yet
					if (active_index === null) {
						active_index = index;
						active[index] = true;
					// Active panel already
					} else {
						active[index] = false;
						console.warn('[Collapsable] More than one active panel in accordion type. Only the first one will be set active.');
					}
				}
			// No active
			} else {
				active[index] = false;
			}
		});
		
		this.setState({
			active: active
		});
	},
	render() {
		// Get props
		const {className: CLASSNAME, children: CHILDREN, type, ...PROPS} = this.props;
		const COLLAPSABLE_CLASS = classNames([CLASSNAME, material.shadow1]);
		
		return (
			<div className={COLLAPSABLE_CLASS} {...PROPS}>
			{
				React.Children.map(CHILDREN, (item, index) => {
					// Check type
					const TYPE = typeof(item.type) === 'string' ? item.type : item.type.displayName;
					
					switch (TYPE) {
					case 'CollapsablePanel':
						// Get props
						const {active, ...PROPS} = item.props;
						
						return (
							<CollapsableItem index={index} active={this.state.active[index]} collapsableTrigger={this.collapsableTrigger} {...PROPS}/>
						);
					default:
						console.error('[Collapsable] Illegal subcomponent "' + TYPE + '"');
					}
				})
			}
			</div>
		);
	},
	collapsableTrigger(index) {
		// Get state
		let active = this.state.active;
		
		// Normal type collapsable
		if (this.props.type === 'normal') {
			active[index] = !active[index];
		// Accordion type collapsable
		} else {
			for (let i = 0, l = active.length; i < l; ++i) {
				active[i] = i === index ? !active[index] : false;
			}
		}
		
		this.setState({
			active: active
		});
	}
});

const CollapsableItem = React.createClass({
	render() {
		// Get props
		const {className: CLASSNAME, name: NAME, index: INDEX, collapsableTrigger: COLLAPSABLE_TRIGGER, ...PROPS} = this.props;
		const ITEM_CLASS = classNames([CLASSNAME, style.item]);
		
		return (
			<div className={ITEM_CLASS}>
				<CollapsableTrigger index={INDEX} collapsableTrigger={COLLAPSABLE_TRIGGER}>
				{
					NAME
				}
				</CollapsableTrigger>
				<CollapsablePanel {...PROPS}/>
			</div>
		);
	}
});

const CollapsableTrigger = React.createClass({
	handleClick() {
		this.props.collapsableTrigger(this.props.index);
	},
	render() {
		// Get props
		const {index, collapsableTrigger, ...PROPS} = this.props;
		const TRIGGER_CLASS = classNames([material.shadow1, style.trigger]);
		
		return (
			<div className={TRIGGER_CLASS} onClick={this.handleClick} {...PROPS}/>
		);
	}
});

export const CollapsablePanel = React.createClass({
	propTypes: {
		active: React.PropTypes.bool
	},
	getDefaultProps() {
		return {
			active: false
		}
	},
	getInitialState() {
		return {
			// Display height
			height: 0
		};
	},
	componentDidMount() {
		this.setState({
			height: ReactDOM.findDOMNode(this).offsetHeight
		});
	},
	render() {
		// Get props
		const {className: CLASSNAME, style: STYLE, active, ...PROPS} = this.props;
		const PANEL_CLASS = classNames([style.panel]);
		const PANEL_STYLE = {
			height: this.state.height === 0 ? 'auto' : this.props.active ? this.state.height : 0,
			...STYLE
		}
		
		return (
			<div className={PANEL_CLASS} style={PANEL_STYLE} {...PROPS}/>
		);
	}
});
