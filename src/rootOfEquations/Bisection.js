import {React,Component} from "react";
import "antd/dist/antd.css";
import { Card,Input,Button,Table} from 'antd';
import { error, func} from '../Element/ChangeNum';
import Graph from '../Element/Graph';


const StyleInput = {
	background: "#ff6500",
	color: "white",
	fontWeight: "bold",
	fontSize: "15px",
    borderRadius:"35px"

};

var dataTable=[]
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

class Bisection extends Component{
    constructor(){
        super();
        this.state={
            fx: "",
            xl: 0,
            xr: 0,
            error: 0,
            showOutputCard: false,
            showGraph: false,
            showcheckans : false,
        };
		this.handleChange=this.handleChange.bind(this);// JavaScript เมธอดของคลาสจะไม่ถูกผูกไว้โดยค่าเริ่มต้น bind เพื่อกำหนดFuc onclick 
		this.bisection=this.bisection.bind(this);
    }
    
	bisection(xl,xr,inputerror){
		var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var n = 0; 
		var data=[]
		data['xl']=[]
		data['xr'] = []
        data['x'] = []
        data['error'] = []
		if (func(this.state.fx, xl) < func(this.state.fx, xr)) {
            increaseFunction = true;
        }
		do{
			xm=(xl+xr)/2;
            if (func(this.state.fx, xm) * func(this.state.fx, xr) < 0){
                sum = error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }
            }else {
                sum = error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm;
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;

		}while (Math.abs(sum) > 0.000006 );
		this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,

        })
	}
    createTable(xl,xr,x,error){
        dataTable=[]
        for (let i = 0; i < xl.length; i++) {
            dataTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            })
            
        }
    }
    reversefunc(){

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    
    render(){
        let { fx, xl, xr } = this.state;
        return (
            <body>
                <div class="page1 ">
                    <div class="content ">
                        <h2>BISECTION</h2>
                        <div class="inputbox">
                   <Card title="Bisection" bordered style={{top: '150px',width: 450,height: 430,border: '15px solid silver',background: "dark", fontSize: "1px",}} onChange={this.handleChange} id="inputCard">
                   <h6 style={{color:"black"}}>f(x)</h6>
                   <Input size="large" name="fx" style={StyleInput}></Input>
                   <h6 style={{color:"black"}}>X<sub>L</sub></h6>
                   <Input size="large" name="xl" style={StyleInput}></Input>
                   <h6 style={{color:"black"}}>X<sub>R</sub></h6>
                   <Input size="large" name="xr" style={StyleInput}></Input><br /><br /><br /><br />
                   <div className="row">
                                <div className="center">
                                    <Button id="submit" onClick= {()=> this.bisection(parseFloat(xl), parseFloat(xr))} 
                                    style={{ background: "red", color: "white"  }}>Submit</Button>
                                </div>
							</div>
                   </Card>
                   <Card style={{top: '150px',height:'100px'}}>      
                <div class="page">
                        {this.state.showGraph && <Graph fx={fx} title="Bisection Method" />}
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
                            <Table columns={columns} dataSource={dataTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
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
export default Bisection;