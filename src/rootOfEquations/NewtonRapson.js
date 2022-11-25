import {React,Component} from "react";
import "antd/dist/antd.css";
import { Card,Input,Button,Table} from 'antd';

import { error, func,funcDiff} from '../Element/ChangeNum';
import Graph from '../Element/Graph';

const StyleInput = {
	background: "#ff6500",
	color: "white",
	fontWeight: "bold",
	fontSize: "15px",
    borderRadius:"35px"

};

var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class NewtonRapson extends Component{
    constructor(){
        super();
        this.state={
            fx: "",
            x0: 0,
            inputerror: 0,
            showOutputCard: false,
            showGraph: false
        };
		this.handleChange=this.handleChange.bind(this);// JavaScript เมธอดของคลาสจะไม่ถูกผูกไว้โดยค่าเริ่มต้น bind เพื่อกำหนดFuc onclick 
		this.NewtonRapson=this.NewtonRapson.bind(this);
    }
    
	NewtonRapson(xold,inputerror){
		var xnew =0
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []
        do{
            xnew =xold-(func(this.state.fx , xold)/ funcDiff(xold))
            epsilon = error(xnew,xold)
            data['x'][n]=xnew.toFixed(8)
            data['erroe'][n] =Math.abs(epsilon).toFixed(8)
            data['fxanser'][n] =func(this.state.fx , xnew)
            n++
            xold = xnew
        }while (Math.abs(epsilon)>inputerror)
        this.createtable(data['x'],data['error'],data['fxanser'])
        this.setState({
            showOutputCard: true,
            showGraph : true 
        })
        
    }
	createtable(x ,error,fxanser){
        dataInTable =[]
        for (let i = 0; i < x.length; i++) {
           dataInTable.push({
            iteration: i + 1,
            x: x[i],
            error: error[i],
            fxanser : fxanser[i]
           })
            
        }

    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    
    render(){
        let {fx,x0,inputerror} = this.state
        return (
           <body>
            <div class="page1">
                <div class="content ">
                    <h2>NEWTON RAPSON</h2>
                        <div class="inputbox">
                            <Card title="Newton Rapson" bordered style={{top: '150px',width: 450,height: 430,border: '15px solid silver',background: "dark", fontSize: "1px"}} onChange={this.handleChange} id="inputCard">
                            <h6 style={{color:"black"}}>f(x)</h6>
                            <Input size="large" name="fx" style={StyleInput}></Input>
                            <h6 style={{color:"black"}}>X<sub>0</sub></h6>
                            <Input size="large" name="x0" style={StyleInput}></Input>
                            <h6 style={{color:"black"}}>Error</h6>
                            <Input size="large" name="inputerror" style={StyleInput}></Input><br /><br /><br /><br />
                            <div className="row">
                                <div className="center">
                                <Button id="submit" onClick= {() => this.NewtonRapson(parseFloat(x0),parseFloat(inputerror))}
                                    style={{ background: "red", color: "white"  }}>Submit</Button>
                                </div>
                            </div>
                            </Card>
                            <Card style={{top: '150px',height:'100px'}}>
                            <div class="page">
                                {this.state.showGraph && <Graph fx={fx} title="Newton-Raphson" />}
                            </div>
                            </Card>
                            <div class='page1' display='block'>
                            {this.state.showOutputCard &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "100%", background: "silver", color: "#FFFFFFFF" }}
                            id="outputCard" width='50' height='30'
                        >
                            <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                        </Card>
                    }
                            </div>

                        </div>

                    </div>
                </div>
           </body>
            
            
            
            
        )
    }
}
export default NewtonRapson;