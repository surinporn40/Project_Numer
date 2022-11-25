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

var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    },
    {
        title: "F(x)",
        key: "fxanser",
        dataIndex: "fxanser"
    }
];

class Secant extends Component{
    constructor(){
        super();
        this.state={
            fx: "",
            x0: 0,
            x1: 0,
            errorinput : 0.0000001,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }
    secant(x0,x1,errorinput){
        var x = [], 
        y = 0,
        epsilon = parseFloat(0.000000);
        var n = 1
        var i = 1
        var data=[]
        data['y'] = []
        data['error'] = []
        data['fxanser']=[]
        x.push(x0);
        x.push(x1);
        data['y'][0] = x0;
        data['error'][0] = "---";
        data['fxanser'][0]= "---";
        do {
            y = x[i] - (func(this.state.fx, x[i]) * ((x[i] - x[i - 1]))) / (func(this.state.fx, x[i]) - func(this.state.fx, x[i - 1]));
            x.push(y);
            epsilon = error(y, x[i]);
            data['y'][n] = y.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            data['fxanser'][n] =func(this.state.fx ,y)

            n++;
            i++;
        } while (Math.abs(epsilon) >errorinput);
        this.createTable(data['y'], data['error'],data['fxanser']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
        
    }


    createTable(y, error,fxanser) {
        dataInTable = []
        for (var i = 0; i < y.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                y: y[i],
                error: error[i],
                fxanser : fxanser[i]
            });
        }
    }
    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    
    render(){
        let { fx, x0, x1 ,errorinput} = this.state;
        return (
            <body>
                <div class="page1 ">
                    <div class="content ">
                        <h2>SECANT METHOD</h2>
                        <div class="inputbox">
                   <Card title="Secant Method" bordered style={{top: '150px',width: 450,height: 480,border: '15px solid silver',background: "dark", fontSize: "1px",}} onChange={this.handleChange} id="inputCard">
                   <h6 style={{color:"black"}}>f(x)</h6>
                   <Input size="large" name="fx" style={StyleInput}></Input>
                   <h6 style={{color:"black"}}>X<sub>0</sub></h6>
                   <Input size="large" name="x0" style={StyleInput}></Input>
                   <h6 style={{color:"black"}}>X<sub>1</sub></h6>
                   <Input size="large" name="x1" style={StyleInput}></Input>
                   <h6 style={{color:"black"}}>Error</h6>
                   <Input size="large" name="inputerror" style={StyleInput}></Input><br /><br /><br /><br />
                   <div className="row">
                                <div className="center">
                                    <Button id="submit" onClick= {
                                        () => this.secant(parseFloat(x0), parseFloat(x1),parseFloat(errorinput))
                                    }
                                    style={{ background: "red", color: "white"  }}>Submit</Button>
                                </div>
							</div>
                   </Card>
                   <Card style={{top: '150px',height:'100px'}}>      
                <div class="page">
                        {this.state.showGraph && <Graph fx={fx} title="Secant Method" />}   
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
export default Secant;