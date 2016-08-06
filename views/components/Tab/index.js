'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Tab = React.createClass({
	getInitialState() {
		// Set initial active_index
		let active_index = null;
		
		React.Children.map(this.props.children, (panel, index) => {
			// Get props
			const ACTIVE = panel.props.active;
			
			// Active
			if (ACTIVE === true) {
				// No active panel yet
				if (active_index === null) {
					active_index = index;
				// Active panel already
				} else {
					console.warn('[Tab] More than one active panel. Only the first one will be set active.');
				}
			}
		});
		
		// No active panel at all
		if (active_index === null) {
			active_index = 0;
		}
		
		return {
			active_index: active_index
		};
	},
	render() {
		// Get props
		const {className: CLASSNAME, children: CHILDREN, ...PROPS} = this.props;
		const TAB_CLASS = classNames([CLASSNAME, style.tab]);
		const SELECTOR_CLASS = classNames([style.selectors, material.row, material.shadow1]);
		const SELECTOR_STYLE = {
			width: 100 / CHILDREN.length + '%'
		};
		const INDICATOR_CLASS = classNames([style.indicator, material.colorBlue, material.animate]);
		const INDICATOR_STYLE = {
			marginLeft: 100 * this.state.active_index / CHILDREN.length + '%',
			width: 100 / CHILDREN.length + '%'
		};
		const PANELS_CLASS = classNames([style.panels, material.animate]);
		
		return (
			<div className={TAB_CLASS} {...PROPS}>
				<div className={SELECTOR_CLASS}>
				{
					React.Children.map(CHILDREN, (panel, index) => {
						// Check type
						const TYPE = typeof(panel.type) === 'string' ? panel.type : panel.type.displayName;
						
						switch (TYPE) {
						case 'TabPanel':
							return (
								<TabSelector style={SELECTOR_STYLE} index={index} tabSelect={this.tabSelect}>
								{
									panel.props.name
								}
								</TabSelector>
							);
						default:
							console.error('[Tab] Illegal subcomponent "' + TYPE + '".');
						}
					})
				}
				</div>
				<div className={INDICATOR_CLASS} style={INDICATOR_STYLE}/>
				<div className={PANELS_CLASS}>
				{
					React.Children.map(CHILDREN, (panel, index) => {
						// Check type
						const TYPE = typeof(panel.type) === 'string' ? panel.type : panel.type.displayName;
						
						switch (TYPE) {
						case 'TabPanel':
							// Get props
							const {style: STYLE, ...PROPS} = panel.props;
							const PANEL_STYLE = {
								marginLeft: index === 0 ? -100 * this.state.active_index + '%' : 0,
								...STYLE
							}
							
							return (
								<TabPanel style={PANEL_STYLE} {...PROPS}/>
							);
						default:
						}
					})
				}
				</div>
			</div>
		);
	},
	tabSelect(new_active_index) {
		this.setState({
			active_index: new_active_index
		});
	}
});

const TabSelector = React.createClass({
	handleClick() {
		this.props.tabSelect(this.props.index);
	},
	render() {
		// Get props
		const {className: CLASSNAME, index, tabSelect, ...PROPS} = this.props;
		const SelectorClass = classNames([CLASSNAME, style.selector, material.col]);
		
		return (
			<div className={SelectorClass} onClick={this.handleClick} {...PROPS}/>
		);
	}
});

export const TabPanel = React.createClass({
	propTypes: {
		active: React.PropTypes.bool
	},
	getDefaultProps() {
		return {
			active: false
		};
	},
	render() {
		// Get props
		const {className: CLASSNAME, active, ...PROPS} = this.props;
		const PANEL_CLASS = classNames([CLASSNAME, style.panel]);
		
		return (
			<div className={PANEL_CLASS} {...PROPS}/>
		);
	}
});
