import { Component } from "react";

class Clock extends Component{
    state = {
        hrs: 0,
        mins: 0,
        secs: 0
    }
    componentDidMount(){
        setInterval(()=>{
            const now = new Date();
            const hrs = now.getHours();
            const mins = now.getMinutes();
            const secs = now.getSeconds();

            this.setState({hrs, mins, secs});

        }, 1000)
    }
    render(){
        const { hrs, mins, secs } = this.state;
        return (
            <div className="clock">
                {`${hrs<10?("0"+hrs):(hrs)}: ${mins<10?("0"+mins):mins}: ${secs<10?("0"+secs):secs}`}
            </div>
        )
    }
}

export default Clock;