import {React,Component} from "react";

class About extends Component{
    constructor(){
        super();
        console.log("contructor called");
    }
    componentDidMount(){
        console.log("contructor called");
    }
    render(){
        console.log("render called")
        return (
            
            <div>
                <h3>This is About</h3>
            </div>
        )
    }
}
export default About;