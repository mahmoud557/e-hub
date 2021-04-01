import React, { Component } from 'react'
import style_white from '../styles/sid_par.module.css'
import style_dark from '../styles/sid_par_dark.module.css'
import Key_word from './Key_word'
export class Sid_par extends Component {
    Key_word_holder=React.createRef()
    cunk_on_reqesting=false;
    style=style_white;
    chunk_offset=50;
    state={
        Key_wordS:this.props.key_words_firest_chunk,
    }

    test=(()=>{
       var dd=['man','tan','ban','tata','man','tan','ban','tata','man','tan','ban','tata']
       /*dd.sort((a,b)=>{
           console.log('.')
           if(a.indexOf('ta')==0){
            return -1
           }  
       })
        console.log(dd)*/
        for(var i=0;i<dd.length;i++){
            console.log('.')
            if(dd[i].indexOf('ma')==0){
                dd.splice(0,0,dd[i])
                dd.splice(i+1,1)
            }
        }
        console.log(dd)
    })();

    detect_holder_apiriance() {
        if (this.props.side_par_state) {
            return { opacity: '1' }
        } else {
            return { opacity: '0' }
        }
    }

    search=(e)=>{
        var key=e.currentTarget.value;
        var temp=this.state.Key_wordS;
        for(var i=0;i<temp.length;i++){
            if(temp[i]['name'].indexOf(key)==0){
                temp.splice(0,0,temp[i])
                temp.splice(i+1,1)
            }
        }
        this.setState({Key_wordS:temp})      
    }

    get_chunk=async()=>{
       var res=await fetch(`http://192.168.1.5:3000/api/key_word/get_chunk?offset=${this.chunk_offset}`)
       var json = await res.json()
       this.set_chuk(json)
    }
    set_chuk=(json)=>{
        if(!json.err){
            if(!json.limit){
                this.setState({Key_wordS:this.state.Key_wordS.concat(json.chunk)},()=>{
                    this.chunk_offset+=50;
                    this.cunk_on_reqesting=false
                })
            }else{
                return true
            }
       }else{
        console.log('err')
       }
    }
    scroll_holder=(e)=>{
        var real_destant=e.currentTarget.scrollHeight-(e.currentTarget.scrollTop+e.currentTarget.clientHeight);
        if(((real_destant/e.currentTarget.scrollHeight)*100)<=10){
            e.currentTarget.dispatchEvent(this.scroll_end)
        }     
    }
    scroll_end_handeler=()=>{
        if(!this.cunk_on_reqesting){
            this.get_chunk()
            this.cunk_on_reqesting=true;
        }
    }

    set_end_scroll_event=()=>{
        this.scroll_end = new Event('scroll_end');
        this.Key_word_holder.current.addEventListener('scroll_end',this.scroll_end_handeler)
    }
    detect_styles=(nextProps)=>{
        if(nextProps.mode=='white'){
            this.style=style_white
        }else{
            this.style=style_dark;
        }
    }
    UNSAFE_componentWillUpdate(nextProps){
        this.detect_styles(nextProps)
    }
    componentDidMount(){
        this.set_end_scroll_event()
    }
    render() {
        return (
            <div
                className={this.style.holder}
                style={this.detect_holder_apiriance()}
            >
                <div className={this.style.top_aria + ' ' + 'center'}>
                    <div className={this.style.search_aria}>
                        <input onChange={this.search} type='text' placeholder='Serash'/>
                    </div>
                </div>
                <div 
                ref={this.Key_word_holder}
                className={this.style.bottom_aria}
                onScroll={this.scroll_holder}
                >
                    {
                    this.state.Key_wordS
                    .map((key_word)=>{
                        return (<Key_word 
                        name={key_word.name} 
                        mode={this.props.mode}
                        get_emails_by_key_word={this.props.get_emails_by_key_word}
                        remove_emails_by_key_word={this.props.remove_emails_by_key_word}
                        />)
                    })
                    }
                </div>
            </div>
        )
    }
}

export default Sid_par
