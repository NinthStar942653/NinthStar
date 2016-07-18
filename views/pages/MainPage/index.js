/*
 * Page:   Main Page
 * Create: 2016-07-15
 */
'use strict';

import React from 'react';

import {Tab, TabPanel} from '../../components/Tab';

const MainPage = React.createClass({
    render() {
        return (
            <Tab>
                <TabPanel name="Tab 1" active="active">Tab Panel 1</TabPanel>
                <TabPanel name="Tab 2">Tab Panel 2</TabPanel>
                <TabPanel name="Tab 3">Tab Panel 3</TabPanel>
                <TabPanel name="Tab 4">Tab Panel 4</TabPanel>
            </Tab>
        );
    }
});

export default MainPage;
