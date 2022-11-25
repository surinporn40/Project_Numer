import {React,Component} from "react";
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.min.css';
import { lusolve, squeeze, sum } from 'mathjs';



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
var x, y, tableTag, regressionMatrixX, regressionMatrixY, matrixA, matrixB, answer

class Polynomial extends Component {

    constructor() {
        super();
        x = []
        y = []

        tableTag = []
        this.state = {
            nPoints: 0,
            m: 0,
            interpolatePoint: 0,
            showInputForm: true,
            showTableInput: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);


    }
    createTableInput(n, m) {
        for (var i = 1; i <= n; i++) {
            x.push(<Input style={{
                width: "70%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                justifyContent: "center"
            }}
                id={"x" + i} key={"x" + i} placeholder={"x" + i} />);
            y.push(<Input style={{
                width: "100%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"y" + i} key={"y" + i} placeholder={"y" + i} />);
            tableTag.push({
                no: i,
                x: x[i - 1],
                y: y[i - 1]
            })

        }
        regressionMatrixX = new Array(m + 1)
        regressionMatrixY = new Array(m + 1)
        for (i = 1; i <= m + 1; i++) {
            regressionMatrixX[i] = []
            for (var j = 1; j <= m + 1; j++) {
                regressionMatrixX[i][j] = []
            }
        }

        this.setState({
            showInputForm: false,
            showTableInput: true
        })
    }
    initialValue(n, m) {
        x = new Array(m + 1)
        y = []
        for (var i = 1; i <= n; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);

        }
        for (i = 1; i <= n; i++) {
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
    }
    polynomial(n, m) {
        var exponent = 1
        //find matrix X
        for (var i = 1; i <= m + 1; i++) {
            for (var j = 1; j <= m + 1; j++) {
                if (i === 1 && j === 1) {
                    regressionMatrixX[i][j] = n
                    continue
                }
                regressionMatrixX[i][j] = this.summation(x, exponent)
                exponent++

            }
            exponent = i
        }
        //find matrix Y
        regressionMatrixY[1] = sum(y)
        for (i = 2; i <= m + 1; i++) {
            regressionMatrixY[i] = this.summationOfTwo(x, y, i - 1)
        }
        console.log(regressionMatrixY)
        this.findX(m)

    }
    findX(m) {
        matrixA = new Array(m + 1)
        matrixB = new Array(m + 1)
        for (var i = 0; i < m + 1; i++) {
            matrixA[i] = []
            for (var j = 0; j < m + 1; j++) {
                matrixA[i][j] = regressionMatrixX[i + 1][j + 1]
            }
            matrixB[i] = regressionMatrixY[i + 1]
        }
        answer = squeeze(lusolve(matrixA, matrixB))
        console.log(answer)
        this.setState({
            showOutputCard: true
        })
    }
    summation(A, exponent) {
        var sum = 0
        for (var i = 1; i < A.length; i++) {
            sum += Math.pow(A[i], exponent)
        }
        return sum
    }
    summationOfTwo(x, y, exponent) {
        var sum = 0
        for (var i = 1; i < y.length; i++) {
            sum += Math.pow(x[i], exponent) * y[i]
        }
        return sum
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    
    render(){
        let { row, column } = this.state;
        return (
            <div style={{padding: "30px" }}>
                 <div class="content ">
                    <h2>POLYNOMIAL REGRESSION</h2>
                 </div>
                
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "orange", color: "#FFFFFFFF" , width: 450,height: 350 }}
                            onChange={this.handleChange}
                        >

                            {this.state.showInputForm &&
                                <div>
                                    <h4 style={{color:"white"}}>Number of points(n)</h4><Input size="large" name="nPoints" style={InputStyle}></Input>
                                    <h4 style={{color:"white"}}>Order(m)</h4><Input size="large" name="m" style={InputStyle}></Input>
                                    <Button id="dimention_button" onClick={
                                        () => this.createTableInput(parseInt(this.state.nPoints), parseInt(this.state.m))}
                                        style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }
                            {this.state.showTableInput &&
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "white", overflowY: "scroll", minWidth: 120, maxHeight: 300 }}></Table>
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "blue", color: "white", fontSize: "20px" }}
                                        onClick={() => {
                                            this.initialValue(parseInt(this.state.nPoints), parseInt(this.state.m));
                                            this.polynomial(parseInt(this.state.nPoints), parseInt(this.state.m))
                                        }}
                                    >
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
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>x = {JSON.stringify(answer).replace(',', '\n')}</p>
                            </Card>
                        }
                    </div>
              
              
                </div>

            </div>
        );
    }
}
export default Polynomial;