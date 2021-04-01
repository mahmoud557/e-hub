import React, { Component } from 'react'
import style_white from '../styles/email_holder.module.css'
import style_dark from '../styles/email_holder_dark.module.css'
export class Email_holder extends Component {
    style=style_white;

    detect_styles=(props)=>{
        if(props.mode=='white'){
            this.style=style_white
        }else{
            this.style=style_dark;
            console.log('iwilee take dark')
        }
    }
    UNSAFE_componentWillUpdate(nextProps){
        this.detect_styles(nextProps)
    }
    componentWillMount(){
        this.detect_styles(this.props)
    }
    render() {
        return (
            <div className={this.style.holder}>
                <div className={this.style.data_row}>
                    <div className={this.style.left}>
                        {this.props.name}
                    </div>
                    <div className={this.style.right}>
                            <img src='icons/dot.svg'/>
                    </div>
                </div>
                <div className={this.style.data_row}>
                    <div className={this.style.left+' '+this.style.email}>
                        {this.props.email}
                    </div>
                    <div className={this.style.right}>
                        <img src='icons/dot.svg'/>
                    </div>
                </div>
                <div className={this.style.data_row}>
                    <div className={this.style.key_word}>
                        {this.props.key_word}
                    </div>
                    <div className={this.style.right}>
                        <img src='icons/dot.svg'/>
                    </div>
                </div>                               
            </div>
        )
    }
}

export default Email_holder
