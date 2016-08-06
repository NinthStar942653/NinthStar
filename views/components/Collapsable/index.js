'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Collapsable = React.createClass({
	getInitialState() {
		return {
			// Panel active state array
			active: []
		};
	},
	componentWillMount() {
		// Get props
		const {children: CHILDREN, accordion: ACCORDION} = this.props;
		
		// Variables
		let active_index = null;
		let active = [];
		
		React.Children.map(CHILDREN, (item, index) => {
			const ACTIVE = item.props.active;
			
			// No active
			if (ACTIVE === undefined) {
				active[index] = false;
			// Active
			} else {
				// Accortion type collapsable
				if (ACCORDION === true) {
					// No active panel yet
					if (active_index === null) {
						active_index = index;
						active[index] = true;
					// Active panel already
					} else {
						active[index] = false;
						console.warn('[Collapsable] More than one active panel in accordion type. Only the first one will be set active.');
					}
				// Normal type collapsable
				} else {
					active[index] = true;
				}
			}
		});
		
		this.setState({
			active: active
		});
	},
	render() {
		// Get props
		const {className: CLASSNAME, children: CHILDREN, accordion, ...PROPS} = this.props;
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
		// Get props
		const ACCORDION = this.props.accordion;
		
		// Get state
		let active = this.state.active;
		
		// Accordion type collapsable
		if (ACCORDION === true) {
			for (let i = 0, l = active.length; i < l; ++i) {
				active[i] = i === index ? !active[index] : false;
			}
		// Normal type collapsable
		} else {
			active[index] = !active[index];
		}
		
		this.setState({
			active: active
		});
	}
});

const CollapsableItem = React.createClass({
	render() {
		// Get props
		const {className: CLASSNAME, name: NAME, index: INDEX, disable: DISABLE, collapsableTrigger: COLLAPSABLE_TRIGGER, ...PROPS} = this.props;
		const ITEM_CLASS = classNames([CLASSNAME, style.item]);
		
		return (
			<div className={ITEM_CLASS}>
				<CollapsableTrigger index={INDEX} disable={DISABLE} collapsableTrigger={COLLAPSABLE_TRIGGER}>
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
		// Get props
		const DISABLE = this.props.disable;
		
		// Not disable
		if (!DISABLE) {
			this.props.collapsableTrigger(this.props.index);
		}
	},
	render() {
		// Get props
		const DISABLE = this.props.disable;
		const TRIGGER_CLASS = classNames([material.shadow1, style.trigger, DISABLE ? style.disable : '']);
		
		return (
			<div className={TRIGGER_CLASS} onClick={this.handleClick}>
			{
				this.props.children
			}
			</div>
		);
	}
});

export const CollapsablePanel = React.createClass({
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
