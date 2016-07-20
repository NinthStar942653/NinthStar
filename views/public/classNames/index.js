/*
 * Tool:   Classnames
 * Create: 2016-07-15
 */
'use strict';

function classNames(classes) {
    let ret = '';
    for (let i = 0, l = classes.length; i < l; ++i) {
        if (classes.hasOwnProperty(i)) {
            const c = classes[i];
            if (c !== undefined) {
                ret += c + ' ';
            }
        }
    }
    ret = ret.replace(/ $/, '');
    return ret;
}

export default classNames;
