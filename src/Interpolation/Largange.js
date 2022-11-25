import {React,Component} from "react";
import "antd/dist/antd.css";
import { Card,Input,Button,Table} from 'antd';


const InputStyle = {
	background: "#ff6500",
	color: "white",
	fontWeight: "bold",
	fontSize: "15px",
    borderRadius:"35px"

};

var columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];


var x, y, tableTag,  interpolatePoint, tempTag, fx
class Largange extends Component{
    constructor() {
        super();
        x = []
        y = []
        interpolatePoint = []
        tempTag = []
        tableTag = []
        this.state = {
            nPoints: 0,
            X: 0,
            interpolatePoint: 0,
            showInputForm : true,
            showTableInput: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.lagrange = this.lagrange.bind(this);
    
    }   createTableInput(n) {
        for (var i=1 ; i<=n ; i++) {
            x.push(<Input style={{
                width: "100%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
            id={"x"+i} key={"x"+i} placeholder={"x"+i}/>);
            y.push(<Input style={{
                width: "100%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"y"+i} key={"y"+i} placeholder={"y"+i}/>);   
            tableTag.push({
                no: i,
                x: x[i-1],
                y: y[i-1]
            });
        }


        this.setState({
            showInputForm: false,
            showTableInput: true,
        })
    }
    createInterpolatePointInput(){
        for (var i=1 ; i<=this.state.interpolatePoint ; i++) {
            tempTag.push(<Input style={{
                width: "14%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"p"+i} key={"p"+i} placeholder={"p"+i} />)
        }
    }
    initialValue() {
        x = []
        y = []
        for (var i=1 ; i<=this.state.nPoints ; i++) {
            x[i] = parseFloat(document.getElementById("x"+i).value);
            y[i] = parseFloat(document.getElementById("y"+i).value);
        }
        for (i=1 ; i<=this.state.interpolatePoint ; i++) {
            interpolatePoint[i] = parseFloat(document.getElementById("p"+i).value);
        }
    }

    L(X, index, n) {
        var numerate = 1/*ตัวเศษ*/, denominate = 1/*ตัวส่วน*/;
        for (var i=1 ; i<=n ; i++) {
            if (i !== index) {
                numerate *= x[i]-X;
                denominate *= x[i] - x[index];
            }
        } 
        console.log(numerate/denominate)
        return parseFloat(numerate/denominate);
    }

    lagrange(n, X) {
        fx = 0
        this.initialValue()
        for (var i=1 ; i<=n ; i++) {
            fx += this.L(X, i, n)*y[i];
        }
        this.setState({
            showOutputCard: true
        })

    } 

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    
    render(){
        return (
            <div style={{padding: "30px" }}>
                 <div class="content ">
                    <h2>LAGRANGE INTERPOLATION</h2>
                 </div>
                
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "orange", color: "#FFFFFFFF" , width: 450,height: 480 }}
                            onChange={this.handleChange}
                        >

                            {this.state.showInputForm && 
                                <div>
                                <h4 style={{color:"white"}}>Number of points(n)</h4><Input size="large" name="nPoints" style={InputStyle}></Input>
                                <h4 style={{color:"white"}}>X</h4><Input size="large" name="X" style={InputStyle}></Input>
                                <h4 style={{color:"white"}}>interpolatePoint</h4><Input size="large" name="interpolatePoint" style={InputStyle}></Input>
                                <Button id="dimention_button" onClick= {
                                    ()=>{this.createTableInput(parseInt(this.state.nPoints));
                                    this.createInterpolatePointInput()}
                                }  
                                    style={{background: "#4caf50", color: "white" }}>
                                    Submit
                                </Button>
                            </div> 
                            }

                            {this.state.showTableInput && 
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "white" , overflowY: "scroll", minWidth: 120, maxHeight: 300}}></Table>
                                    <br/><h4>interpolatePoint {parseInt(this.state.interpolatePoint) === 2 ? "(Linear)": 
                                                            parseInt(this.state.interpolatePoint) === 3 ? "(Quadratic)" :
                                                            "(Polynomial)"}</h4>{tempTag}
                                    <Button 
                                        id="matrix_button"  
                                        style={{background: "blue", color: "white", fontSize: "20px"}}
                                        onClick={()=>this.lagrange(parseInt(this.state.interpolatePoint), parseFloat(this.state.X))}>
                                        Submit
                                    </Button>
                                </div>
                            }

                        </Card>
                    </div>

                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                            title={"Output"}
                            bordered={true}
                            style={{ border: "2px solid black", background: "rgb(61, 104, 61) none repeat scroll 0% 0%", color: "white" }}
                            >
                                <p style={{fontSize: "24px", fontWeight: "bold"}}>{fx}</p>
                            </Card>                        
                        }                        
                    </div>   
                </div>

            </div>
        );
    }
}
export default Largange;