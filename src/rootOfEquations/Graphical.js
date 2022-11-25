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
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        key: "y",
        dataIndex: "y"
    }
];

class Graphical extends Component{
    constructor() {
        super();
        this.state = {
            fx: "",
            start: 0,
            finish: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.graphical = this.graphical.bind(this);
    }

    graphical() {
        var data = []
        data['x'] = []
        data['y'] = []
        data['fxanser']=[]
        for (var i = parseInt(this.state.start); i <= parseInt(this.state.finish); i++) {
            data['x'].push(i);
            data['y'].push(func(this.state.fx, i));

        }


        this.createTable(data['x'], data['y']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }


    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i <= parseInt(this.state.finish - this.state.start); i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                y: y[i]
            });
        }

    }
    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    
    render(){
        let { fx, start, finish } = this.state;
        return (
            <body>
                <div class="page1 ">
                    <div class="content ">
                        <h2>GRAPHICAL</h2>
                        <div class="inputbox">
                   <Card title="Graphical" bordered style={{top: '150px',width: 450,height: 430,border: '15px solid silver'
                   ,background: "dark", fontSize: "1px",}} onChange={this.handleChange} id="inputCard">
                   <h6 style={{color:"black"}}>f(x)</h6>
                   <Input size="large" name="fx" style={StyleInput}></Input>
                   <h6 style={{color:"black"}}>Start</h6>
                   <Input size="large" name="start" style={StyleInput}></Input>
                   <h6 style={{color:"black"}}>Finish</h6>
                   <Input size="large" name="finish" style={StyleInput}></Input>
                   <div className="row">
                                <div className="center">
                                    <Button id="submit" onClick= {
                                        () => this.graphical(parseFloat(start), parseFloat(finish))
                                    }
                                    style={{ background: "red", color: "white"  }}>Submit</Button>
                                </div>
							</div>
                   </Card>
                   
                <Card style={{top: '150px',height:'100px'}}>   
                <div class="page">
                    {this.state.showGraph && <Graph fx={fx}  title="Graphical Method" />}
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
                            <Table columns={columns} dataSource={dataInTable} 
                            bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
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
export default Graphical;