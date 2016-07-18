/*
 * Tool:   Classnames
 * Create: 2016-07-15
 */
'use strict';

export default function classnames(classes) {
    let ret = "";
    for (let i = 0, l = classes.length; i < l; ++i) {
        if (classes.hasOwnProperty(i)) {
            let c = classes[i];
            ret += c + " ";
        }
    }
    ret = ret.replace(/ $/, "");
    return ret;
}
