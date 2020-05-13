import React, {Component} from 'react'
import classes from "./Queue.module.css"

class Queue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: null,
            loading: false,
            code: "6667 1414"
        }
    }

    //not updating, fix the live update
    //css

    componentDidMount() {
        var url = "http://localhost:8080/api/getCode?code=" + encodeURI(this.state.code)
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*", 
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.queue)
            this.setState({
                items: data.queue
            })
        })
    }

    render() {
        return (
            <div className={classes.QueueContainer}>
                <ul>
                    {!this.state.items && 
                    <div>
                        <p>No queue</p>
                    </div>}

                    {this.state.items && 
                    this.state.items.map((item) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Queue;