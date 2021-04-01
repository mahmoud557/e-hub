import React, { Component } from 'react'
import style_white from '../styles/key_word.module.css'
import style_dark from '../styles/key_word_dark.module.css'

export class Key_word extends Component {
    style=style_white;
    detect_styles=(props)=>{
        if(props.mode=='white'){
            this.style=style_white
        }else{
            this.style=style_dark;
        }
    }
    UNSAFE_componentWillUpdate(nextProps){
        this.detect_styles(nextProps)
    }
    handel_checkbox_click=(e)=>{
        if(e.currentTarget.checked){
            this.props.get_emails_by_key_word(this.props.name)
        }else{
            console.log(true)
            this.props.remove_emails_by_key_word(this.props.name)
        }
    }
    componentWillMount(){
        this.detect_styles(this.props)
    }
    render() {
        return (
            <div className={this.style.holder}>
                <div className={this.style.left}>
                    <label 
                    className={this.style.container}>
                        <input type="checkbox"
                        onClick={this.handel_checkbox_click}
                        />
                        <span className={this.style.checkmark}></span>
                    </label>
                </div>
                <div className={this.style.right}>
                   {this.props.name}
                </div>
                <div></div>
            </div>
        )
    }
}

export default Key_word
