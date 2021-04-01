import React, { Component } from 'react'
import styles_white from '../styles/conttrol_par.module.css'
import styles_dark from '../styles/conttrol_par_dark.module.css'
import Svg_cont from '../componanat/Svg_cont.js'

export class Conttrole_par extends Component {
    styles=styles_white;
    detect_sid_par_contrrol_bt_style() {
        if (this.props.side_par_state) {
            return { transform: 'rotate(180deg)' }
        } else {
            return { transform: 'rotate(0deg)' }
        }
    }
    detect_input_direction() {
        console.log(this)
    }

    componentDidMount() {
        this.props.refAs(this)
    }
    detect_styles=(nextProps)=>{
        if(nextProps.mode=='white'){
            this.styles=styles_white
        }else{
            this.styles=styles_dark
        }
    }
    UNSAFE_componentWillUpdate(nextProps){
        this.detect_styles(nextProps)
    }

    render() {
        return (
            <div className={this.styles.holder}>
                <div className={this.styles.right_aria}>
                    <div
                        className={[this.styles.control_bt + ' ' + 'center']}
                        style={this.detect_sid_par_contrrol_bt_style()}
                        onClick={this.props.on_contole_bt_click}
                    >
                        <img
                            src='icons/back_bt.svg'
                        />
                    </div>
                </div>
                <div className={this.styles.left_aria}>
                    <div
                        onClick={this.props.togel_mode}
                        className={this.styles.mode +' '+'center'}
                        title='Dark mode'
                    >
                        <img src='icons/brightness.svg'/>
                    </div>
                </div>
                <div className={this.styles.center_aria}>
                    <div 
                    className={this.styles.icon_holder + ' ' + 'center'}
                    >
                         <img
                            src='icons/search.svg'
                        />                      
                    </div>
                    <div className={this.styles.input_holder}>
                        <input onChange={this.props.search} type='text'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Conttrole_par
