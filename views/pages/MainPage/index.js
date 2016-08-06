'use strict';

import React from 'react';

import {Tab, TabPanel} from '../../components/Tab';
import {Collapsable, CollapsablePanel} from '../../components/Collapsable';
import {Ripple} from '../../components/Ripple';
import {Dialog} from '../../components/Dialog';
import {Button} from '../../components/Button';
import {Card, CardTitle, CardImg, CardItem} from '../../components/Card';
import {Slider, SliderBar, SliderInput} from '../../components/Slider';
import {Table} from '../../components/Table';

import material from '../../public/material/material.scss';

import Img_1 from '../../img/1.jpg';

const column = [{
	title: 'Name',
	index: 'name',
	sortable: true
}, {
	title: 'ID',
	index: 'id',
	sortable: true
}];
const data = [{
	name: 'Alice',
	id: 1
}, {
	name: 'Bob',
	id: 2
}, {
	name: 'Steve',
	id: 3
}];

export const MainPage = React.createClass({
	render() {
		return (
			<div>
				<Tab>
					<TabPanel name="Tab 1">
						<h3>Tab Panel 1</h3>
					</TabPanel>
					<TabPanel name="Tab 2" active={true}>
						<h3>Tab Panel 2</h3>
					</TabPanel>
					<TabPanel name="Tab 3" active={false}>
						<h3>Tab Panel 3</h3>
					</TabPanel>
					<TabPanel name="Tab 4">
						<h3>Tab Panel 4</h3>
					</TabPanel>
				</Tab>
				<Collapsable type="accordion">
					<CollapsablePanel name="Collapsable 1">
						<p>Collapsable Panel 1</p>
						<p>Collapsable Panel 1</p>
						<p>Collapsable Panel 1</p>
					</CollapsablePanel>
					<CollapsablePanel name="Collapsable 2" active={true}>
						<p>Collapsable Panel 2</p>
						<p>Collapsable Panel 2</p>
						<p>Collapsable Panel 2</p>
					</CollapsablePanel>
					<CollapsablePanel name="Collapsable 3">
						<p>Collapsable Panel 3</p>
						<p>Collapsable Panel 3</p>
						<p>Collapsable Panel 3</p>
					</CollapsablePanel>
				</Collapsable>
				<Dialog visible={true}>
					<Table column={column} data={data}/>
					<Slider min={0} max={100} step={1} value={10}>
						<SliderBar/>
						<SliderInput/>
					</Slider>
				</Dialog>
				<Button type='flat' className={material.colorMain}>
					<Ripple/>
					Click Me
				</Button>
				<Button type='flat' className={material.colorMain}>
					<Ripple color="red"/>
					Click Me
				</Button>
				<Card style={{width: 400}}>
					<CardTitle>This is a card</CardTitle>
					<CardImg>
						<img src={Img_1}/>
						<CardTitle>Title</CardTitle>
						<Ripple color='blue'/>
					</CardImg>
					<CardItem>
						<p>This is a text in card item</p>
						<p>This is another text in card item</p>
					</CardItem>
				</Card>
			</div>
		);
	}
});
