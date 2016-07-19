/*
 * Tool:   Get Node
 * Create: 2016-07-18
 */
'use strict';

function getNode(component) {
    return component._reactInternalInstance._renderedComponent._hostNode;
}

export default getNode;
