import React, { Component } from 'react'
import styles_white from '../styles/app_holder.module.css'
import styles_dark from '../styles/app_holder_dark.module.css'
import Conttrole_par from '../componanat/Conttrole_par'
import Sid_par from '../componanat/Sid_par'
import Emails_holder from '../componanat/Emails_holder'
import ReactSwipeEvents from 'react-swipe-events'
export class Home extends Component {
  styles=styles_white;
  state = {
    side_par_state: false,
    mode:'white',
    emails:[]
  }
  device_type = null;


  open_side_par_if_pc = (type) => {
    if (type == 'pc') {
      this.setState({ side_par_state: true })
    }
  }

  togel_mode=()=>{
    if(this.state.mode=='white'){
      this.styles=styles_dark;
      console.log(styles_dark)
      this.setState({mode:'dark'})
    }else{
      this.styles=styles_white;
      this.setState({mode:'white'})
    }
  }

  detect_device_type = () => {
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return 'mobile'
    } else {
      return 'pc'
    }
  }
  detect_device_width = () => {
      this.device_width=window.innerWidth;
  }  

  detect_side_par_style = () => {
    if(this.device_width){    
      if(this.device_width>660){
        if (this.state.side_par_state) {
          return { width: '360px' }
        } else {
          return { width: '0px' }
        }
      }else{
        if (this.state.side_par_state) {
          return {
          width: '80%',
          position:'relative', 
          left:`-80%`,
        }
        } else {
          return {
            width: '80%',
            position:'relative', 
            left:`0%`,
          }
        }
      }
    }
  }

  detect_right_aria_style = () => {
    if(this.device_width){    
      if(this.device_width>660){
        return
      }else{
        if (this.state.side_par_state) {
          return {
          width: '100%',
          position:'relative', 
          right:`${this.device_width-40+'px'}`,
          transition:'right 0.6s'
        }
        } else {
          return { width: '100%',
          position:'relative',
          right:'0%',
          transition:'right 0.6s'
          }
        }
      }
    }
  }

  togel_side_par = () => {
    var side_par_state = !this.state.side_par_state;
    this.setState({ side_par_state: side_par_state })
  }

  search_with_controll_par=(e)=>{

    var key=e.currentTarget.value;
    var temp=this.state.emails;
    if(key){
      for(var i=0;i<temp.length;i++){
          if(temp[i]['key_word'].indexOf(key)==0){
              temp.splice(0,0,temp[i])
              temp.splice(i+1,1)
          }
      }
      this.setState({emails:temp})  
    }

  }


  componentDidMount() {
    this.detect_device_width()
    this.device_type = this.detect_device_type()
    this.open_side_par_if_pc(this.device_type)
  }
  get_emails_by_key_word=async (key_word)=>{
    const res = await fetch(`http://192.168.1.5:3000/api/emails/get_by_key_word?key_word=${key_word}`)
    const json = await res.json()
    if(!json.limit){
      this.setState({emails:this.state.emails.concat(json.chunk)})
    }
  }

  remove_emails_by_key_word=(key_Word)=>{
    var temp=this.state.emails.filter((email)=>{
      try{
        return email.key_word!=key_Word;
      }catch(err){
        return false
      }
    })
    this.setState({emails:temp})
  }
  handel_swip_lift=(e,originalX, endX)=>{
    if(!this.state.side_par_state&&originalX-endX>=80){
      this.togel_side_par()
    }
  }
  handel_swip_right=(e,originalX, endX)=>{
    if(this.state.side_par_state&&endX-originalX>=80){
      this.togel_side_par()
    }
  }

  render() {
    return (
      <ReactSwipeEvents 
        onSwipedLeft={this.handel_swip_lift}
        onSwipedRight={this.handel_swip_right}
      >
        <div className={this.styles.app_holder}>
          <div 
            style={this.detect_right_aria_style()}
            className={this.styles.right_aria}
          >
            <div className={this.styles.right_aria_top}>
              <Conttrole_par
                refAs={ref => (this.Conttrole_par = ref)}
                side_par_state={this.state.side_par_state}
                on_contole_bt_click={this.togel_side_par}
                togel_mode={this.togel_mode}
                mode={this.state.mode} 
                search={this.search_with_controll_par}
              />
            </div>
            <div className={this.styles.right_aria_bottom}>
              <Emails_holder
              emails={this.state.emails}
              mode={this.state.mode}
              />
            </div>
          </div>
          <div
            className={this.styles.left_aria}
            style={this.detect_side_par_style()}
          >
            <Sid_par 
            side_par_state={this.state.side_par_state}
            key_words_firest_chunk={this.props.key_word_firest_chunk}
            mode={this.state.mode}
            get_emails_by_key_word={this.get_emails_by_key_word}
            remove_emails_by_key_word={this.remove_emails_by_key_word}
            />
          </div>
        </div>
      </ReactSwipeEvents>
    )
  }
}


export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/key_word/firest_chunk')
  const json = await res.json()

  return {
    props: { key_word_firest_chunk: json }, // will be passed to the page component as props
  }
}

export default Home
