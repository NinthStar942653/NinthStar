'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {classNames} from '../../public/classNames';

import material from '../../public/material/material.scss';
import style from './style';

export const Ripple = React.createClass({
    getInitialState() {
        return {
            // ID counter
            counter: 0,
            // Effects array
            effectsProps: []
        };
    },
    render() {
        // Get props
        const COLOR = this.props.color;
        const RIPPLE_CLASS = classNames([style.ripple]);
        
        // Unknown color
        if (COLOR !== undefined && style[COLOR] === undefined) {
            console.warn('[Ripple] Unknown color "' + COLOR + '". Regard as not set(default white).');
        }
        
        return (
            <div className={RIPPLE_CLASS} onMouseDown={this.rippleShow}>
                {
                    this.state.effectsProps.map((effectProps, index) => {
                        return (
                            <RippleEffect className={style[COLOR]} key={effectProps.key} effectProps={effectProps} rippleHide={this.rippleHide}/>
                        );
                    })
                }
            </div>
        );
    },
    rippleShow(evt) {
        // Get DOM node
        const RIPPLE = ReactDOM.findDOMNode(this);
        
        // Get effects array
        let effectsProps = this.state.effectsProps;
        
        // Add new effect
        effectsProps.push({
            key: this.state.counter,
            x: evt.pageX - RIPPLE.getBoundingClientRect().left,
            y: evt.pageY - RIPPLE.getBoundingClientRect().top,
            scale: Math.sqrt(RIPPLE.offsetWidth * RIPPLE.offsetWidth + RIPPLE.offsetHeight * RIPPLE.offsetHeight)
        });
        
        // Rerender
        this.setState({
            counter: this.state.counter + 1,
            effectsProps: effectsProps
        });
    },
    rippleHide(key) {
        // Get this
        const RIPPLE = this;
        
        // Wait
        setTimeout(function() {
            // Get effects array
            let effectsProps = RIPPLE.state.effectsProps;
            
            // Remove outdated effects
            while (effectsProps.length > 0 && effectsProps[0].key <= key) {
                effectsProps.shift();
            }
            
            RIPPLE.setState({
                effectsProps: effectsProps
            });
        }, 500);
    }
});

const RippleEffect = React.createClass({
    getInitialState() {
        return {
            // Effect showing
            show: false,
            // Effect hiding
            hide: false
        };
    },
    componentDidMount() {
        // Get this
        const RIPPLE_EFFECT = this;
        
        // Wait
        setTimeout(function() {
            RIPPLE_EFFECT.setState({
                show: true
            });
            
            // Wait
            setTimeout(function() {
                RIPPLE_EFFECT.setState({
                    hide: true
                });
                
                // Hide effect
                RIPPLE_EFFECT.props.rippleHide(RIPPLE_EFFECT.props.effectProps.key);
            }, 500);
        }, 1);
    },
    render() {
        // Get props
        const CLASSNAME = this.props.className;
        const RIPPLE_EFFECT_CLASS = classNames([CLASSNAME, style.rippleEffect, material.animate]);
        const RIPPLE_EFFECT_STYLE = {
            // Set visibility acoording to this.props.effectProps and this.state
            top: this.props.effectProps.y,
            left: this.props.effectProps.x,
            transform: this.state.show ? 'scale(' + this.props.effectProps.scale + ')' : '',
            opacity: this.state.hide ? 0 : 0.25
        };
        
        return (
            <div className={RIPPLE_EFFECT_CLASS} style={RIPPLE_EFFECT_STYLE}/>
        );
    }
});
