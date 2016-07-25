/*
 * Component: Card
 * Create:    2016-07-25
 */
'use strict';

import React from 'react';
import classNames from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

import {Ripple} from '../../components/Ripple';

export const Card = React.createClass({
	render() {
		const {className: CLASSNAME, ...PROPS} = this.props;
		const CARD_CLASS = classNames([CLASSNAME, style.card, material.shadow1]);
		
		return (
			<div className={CARD_CLASS} {...PROPS}/>
		);
	}
});

export const CardTitle = React.createClass({
	render() {
		const {className: CLASSNAME, ...PROPS} = this.props;
		const TITLE_CLASS = classNames([CLASSNAME, style.title]);
		
		return (
			<h3 className={TITLE_CLASS} {...PROPS}/>
		);
	}
});

export const CardImg = React.createClass({
	render() {
		const {className: CLASSNAME, children: CHILDREN, ...PROPS} = this.props;
		const IMG_CLASS = classNames([CLASSNAME, style.img]);
		
		return (
			<div className={IMG_CLASS} {...PROPS}>
				{
					React.Children.map(CHILDREN, item => {
						return (
							item
						);
					})
				}
				<Ripple/>
			</div>
		);
	}
});

export const CardItem = React.createClass({
	render() {
		const {className: CLASSNAME, ...PROPS} = this.props;
		const ITEM_CLASS = classNames([CLASSNAME, style.item]);
		
		return (
			<div className={ITEM_CLASS} {...PROPS}/>
		);
	}
});
