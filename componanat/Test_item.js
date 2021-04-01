import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
export class Test_item extends Component {

    render() {
        return (
            <div id={this.props.item.key}
                className={styles.card}
                onClick={this.props.onClick}
            >
                <h3>{this.props.item.name}</h3>
                <div>{this.props.item.age}</div>
            </div>
        )
    }
}

export default Test_item
