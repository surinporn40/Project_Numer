import {React,Component} from "react";
import { Button, Container } from "react-bootstrap";
import { Card} from 'antd';

import IconElectron from './logo-electron.svg';
import background from '../Element/img/backgroud.jpg';

class Home extends Component{
    constructor(){
        super();
        console.log("contructor called");
    }
    componentDidMount(){
        console.log("contructor called");
    }
    getValue() {
        var Num = document.getElementById("number").value;
        var Root = document.getElementById("rootof").value;
        console.log(Num);
        console.log(Root);
        document.getElementById("shownumber").innerHTML=Num;
        document.getElementById("showrootof").innerHTML=Root;
    }
    createinputMatrics=()=>{
        
    }



    render(){
        
        return (
            <body>
                <div class="Boxpage">
                <div class="content">
                    <h4>PRESENT</h4>
                    <h1 class="auto-type">PROJECT NUMER</h1>
                    
                </div>
            </div>
            
           
            <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
            
            </body>
            
        )
    }
}
export default Home;