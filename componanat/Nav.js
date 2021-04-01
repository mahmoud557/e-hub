import React, { Component } from 'react'
import styles from '../styles/nav.module.css'
import Link from 'next/link'
export class Nav extends Component {
    detect_color(){
        if(typeof window !== "undefined"){
            if(window.location.pathname=='/about'){
                return {background:'cornflowerblue'}
            }else{
                return {background:'coral'}
            }
        }
        return {background:'coral'}
    }
    render() {
        return (
            <div className={styles.nav} >
                <div className={styles.nav_button}>
                    <Link href='/'>main</Link>
                </div>
                 <div className={styles.nav_button}>
                    <Link href='/about'>about</Link>
                </div>               
            </div>
        )
    }
}

export default Nav
