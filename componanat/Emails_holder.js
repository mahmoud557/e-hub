import React, { Component } from 'react'
import style_white from '../styles/emails_holder.module.css'
import style_dark from '../styles/emails_holder_dark.module.css'
import Email_holder from './Email_holder'
export class Emails_holder extends Component {
    style=style_white;
    detect_styles=(nextProps)=>{
        if(nextProps.mode=='white'){
            this.style=style_white
        }else{
            this.style=style_dark;
            console.log('iwilee take dark')
        }
    }
    UNSAFE_componentWillUpdate(nextProps){
        this.detect_styles(nextProps)
    }


    render() {
        return (
            <div className={this.style.holder}>
                {this.props.emails.map((email_data)=>{
                    try{
                        return (
                            <Email_holder
                            mode={this.props.mode}
                            name={email_data.name}
                            email={email_data.email}
                            key_word={email_data.key_word}
                            />
                            )
                    }catch(err){
                        console.log(err)
                        return false
                    }
                })}       
            </div>
        )
    }
}

export default Emails_holder
