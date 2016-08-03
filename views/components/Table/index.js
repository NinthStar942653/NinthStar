'use strict';

import React from 'react';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Table = React.createClass({
	render() {
		// Get props
		const {column: COLUMN, data: DATA, ...PROPS} = this.props;
		
		return (
			<table {...PROPS}>
				<thead>
					<tr>
					{
						COLUMN.map((column, index) => {
							return (
								<th key={index}>
								{
									column.title
								}
								</th>
							)
						})
					}
					</tr>
				</thead>
				
				<tbody>
					{
						DATA.map((item, index) => {
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
										)
									})
								}
								</tr>
							)
						})
					}
				</tbody>
			</table>
		);
	}
});
