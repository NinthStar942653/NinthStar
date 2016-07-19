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
                    <TabPanel name="Tab 1" style={{color: "red"}}>
                        <h3>Tab Panel 1</h3>
                    </TabPanel>
                    <TabPanel name="Tab 2">
                        <h3>Tab Panel 2</h3>
                    </TabPanel>
                    <TabPanel name="Tab 3">
                        <h3>Tab Panel 3</h3>
                    </TabPanel>
                    <TabPanel name="Tab 4">
                        <h3>Tab Panel 4</h3>
                    </TabPanel>
                </Tab>
                <Collapsable>
                    <CollapsablePanel name="Collapsable 1" active>
                        <div>
                            <p>Collapsable Panel 1</p>
                            <p>Collapsable Panel 1</p>
                            <p>Collapsable Panel 1</p>
                        </div>
                    </CollapsablePanel>
                    <CollapsablePanel name="Collapsable 2">
                        <div>
                            <p>Collapsable Panel 2</p>
                            <p>Collapsable Panel 2</p>
                            <p>Collapsable Panel 2</p>
                        </div>
                    </CollapsablePanel>
                    <CollapsablePanel name="Collapsable 3">
                        <div>
                            <p>Collapsable Panel 3</p>
                            <p>Collapsable Panel 3</p>
                            <p>Collapsable Panel 3</p>
                        </div>
                    </CollapsablePanel>
                </Collapsable>
            </div>
        );
    }
});

export default MainPage;
