/*
 * Page:   Main Page
 * Create: 2016-07-15
 */
'use strict';

import React from 'react';

import {Tab, TabPanel} from '../../components/Tab';
import {Collapsable, CollapsablePanel} from '../../components/Collapsable';

const MainPage = React.createClass({
    render() {
        return (
            <div>
                <Tab className="tab" style={{color: "blue"}}>
                    <TabPanel name="Tab 1" style={{color: "red"}} active="active">Tab Panel 1</TabPanel>
                    <TabPanel name="Tab 2">Tab Panel 2</TabPanel>
                    <TabPanel name="Tab 3">Tab Panel 3</TabPanel>
                    <TabPanel name="Tab 4">Tab Panel 4</TabPanel>
                </Tab>
                <Collapsable>
                    <CollapsablePanel name="Collapsable 1">Collapsable Panel 1</CollapsablePanel>
                    <CollapsablePanel name="Collapsable 2">Collapsable Panel 2</CollapsablePanel>
                    <CollapsablePanel name="Collapsable 3">Collapsable Panel 3</CollapsablePanel>
                </Collapsable>
            </div>
        );
    }
});

export default MainPage;
