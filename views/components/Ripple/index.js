/*
 * Component: Ripple
 * Create:    2016-07-20
 */
'use strict';

import React from 'react';
import classNames from '../../public/classNames';
import getNode from '../../public/getNode';

import material from '../../public/material/material.scss';
import style from './style';

const Ripple = React.createClass({
    getInitialState() {
        return {
            counter: 0,
            effectsProps: []
        };
    },
    render() {
        const RIPPLE_CLASS = classNames([style.ripple]);
        
        return (
            <div className={RIPPLE_CLASS} onMouseDown={this.rippleShow}>
                {
                    this.state.effectsProps.map((effectProps, index) => {
                        return (
                            <RippleEffect key={effectProps.key} effectProps={effectProps} rippleHide={this.rippleHide}/>
                        );
                    })
                }
            </div>
        );
    },
    rippleShow(evt) {
        let effectsProps = this.state.effectsProps;
        
        effectsProps.push({
            key: this.state.counter,
            x: evt.pageX - getNode(this).getBoundingClientRect().left,
            y: evt.pageY - getNode(this).getBoundingClientRect().top,
            scale: Math.sqrt(getNode(this).offsetWidth * getNode(this).offsetWidth + getNode(this).offsetHeight * getNode(this).offsetHeight)
        });
        
        this.setState({
            counter: this.state.counter + 1,
            effectsProps: effectsProps
        });
    },
    rippleHide(key) {
        const RIPPLE = this;
        
        setTimeout(function() {
            let effectsProps = RIPPLE.state.effectsProps;
            
            while (effectsProps.length > 0 && effectsProps[0].key <= key) {
                effectsProps.shift();
            }
            
            console.log(effectsProps);
            
            RIPPLE.setState({
                effectsProps: effectsProps
            });
        }, 500);
    }
});

const RippleEffect = React.createClass({
    getInitialState() {
        return {
            ready: false,
            animating: true,
            pressing: true
        };
    },
    componentDidMount() {
        const RIPPLE_EFFECT = this;
        setTimeout(function() {
            RIPPLE_EFFECT.setState({
                ready: true
            });
            
            setTimeout(function() {
                RIPPLE_EFFECT.setState({
                    animating: false
                });
                
                if (!RIPPLE_EFFECT.state.pressing) {
                    RIPPLE_EFFECT.props.rippleHide(RIPPLE_EFFECT.props.effectProps.key);
                }
            }, 500);
        }, 1);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.ready !== nextState.ready || (!this.state.animating && !this.state.pressing);
    },
    render() {
        const RIPPLE_EFFECT_CLASS = classNames([style.rippleEffect, material.animate]);
        const RIPPLE_EFFECT_STYLE = {
            top: this.props.effectProps.y,
            left: this.props.effectProps.x,
            transform: this.state.ready ? 'scale(' + this.props.effectProps.scale + ')' : '',
            opacity: !this.state.animating && !this.state.pressing ? 0 : ''
        };
        
        return (
            <div className={RIPPLE_EFFECT_CLASS} style={RIPPLE_EFFECT_STYLE} onMouseUp={this.release} onMouseLeave={this.release}/>
        );
    },
    release() {
        this.setState({
            pressing: false
        });
        
        if (!this.state.animating) {
            this.props.rippleHide(this.props.effectProps.key);
        }
    }
});

export default Ripple;
export {
    Ripple
};
