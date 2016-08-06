'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Table = React.createClass({
	propTypes: {
		column: React.PropTypes.array,
		data: React.PropTypes.array
	},
	getDefaultProps() {
		return {
			column: [],
			data: []
		}
	},
	getInitialState() {
		return {
			data: this.props.data,
			lastSortIndex: null,
			lastSortDir: null
		};
	},
	render() {
		// Get props
		const {className: CLASSNAME, column: COLUMN, data, ...PROPS} = this.props;
		const TABLE_CLASS = classNames([CLASSNAME, style.table]);
		
		return (
			<table className={TABLE_CLASS} {...PROPS}>
				<thead>
					<tr>
					{
						COLUMN.map((column, index) => {
							return (
								<TableHead key={index} index={index} data={column} sort={this.sort}/>
							);
						})
					}
					</tr>
				</thead>
				
				<tbody>
				{
					this.state.data.map((item, index) => {
						return (
							<tr key={index}>
							{
								COLUMN.map((column, index) => {
									return (
										<td key={index}>
										{
											item[column.index]
										}
										</td>
									);
								})
							}
							</tr>
						);
					})
				}
				</tbody>
			</table>
		);
	},
	sort(column_index) {
		const INDEX = this.props.column[column_index].index;
		const {data: DATA, lastSortIndex: LAST_SORT_INDEX, lastSortDir: LAST_SORT_DIR} = this.state;
		
		if (column_index === LAST_SORT_INDEX) {
			this.setState({
				lastSortDir: !LAST_SORT_DIR,
				data: DATA.sort(function(lhs, rhs) {
					return (lhs[INDEX] < rhs[INDEX] ? -1 : 1) * (LAST_SORT_DIR ? 1 : -1);
				})
			});
		} else {
			this.setState({
				lastSortIndex: column_index,
				lastSortDir: false,
				data: DATA.sort(function(lhs, rhs) {
					return (lhs[INDEX] < rhs[INDEX] ? -1 : 1);
				})
			});
		}
	}
});

const TableHead = React.createClass({
	handleClick() {
		this.props.sort(this.props.index);
	},
	render() {
		const {className: CLASSNAME, data: DATA, index, sort} = this.props;
		const TH_CLASS = classNames([
			DATA.sortable ? style.sortable : ''
		]);
		const TH_ONCLICK = DATA.sortable ? this.handleClick : null;
		
		return (
			<th className={TH_CLASS} onClick={TH_ONCLICK}>
			{
				DATA.title
			}
			</th>
		);
	}
});
