import React, { Component } from 'react'
import styles from '../styles/about.module.css'
import dynamic from 'next/dynamic';

export class About extends Component {
    state={a:10,data_state:false,data:null}
    re=(state)=>{
        return state.a-1
    }
    click_handeler=(e)=>{
        console.log(this)
        this.setState({a:this.re(this.state)})
    }
    /*get_data=()=>{
        return new Promise((resolve,reject)=>{
            fetch('/soc')
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err)=>{
                console.log(err)

            })
        })
    }*/

    async componentWillMount(){
         
         setInterval(async()=>{
            var data= await this.get_data();
            this.setState({data:data})
            this.setState({data_state:true})
         },3000)
    }
    handel(e){
        console.log(window)
    }
    scroll(){
        window.addEventListener('click',e=>console.log(e))
    }
    todo_body(){ 
        return (
            <>
            <div onClick={this.handel}>{this.state.data.title}</div>
            <div>{this.state.data.id}</div>
            <div>{this.state.data.userId}</div>
            </>
        )
    }
    render() {
        if(this.state.data_state){
            return this.todo_body()
        }else{
            return false
        }
    }
}


export default About
