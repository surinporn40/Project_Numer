import {React,Component} from "react";
import "antd/dist/antd.css";
import { Card,Input,Button} from 'antd';
import { inv, multiply, fraction, format,det } from 'mathjs';

const InputStyle = {
	background: "#ff6500",
	color: "white",
	fontWeight: "bold",
	fontSize: "15px",
    borderRadius:"35px"

};

var A = [], B = [], X, matrixA = [], matrixB = [], output = [],answer
class Inverse extends Component{
    constructor(){
        super()
        this.state={
            row: 0,
            column: 0,
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.inverse = this.inverse.bind(this);

    }
    inverse(n){
        console.log(n)
        this.matrixCreate();
        A= inv(A)
        if (det(A)==0) {
            output.push("Matrix doesn't exist, Determinant is zero")
        }
        else{
           answer = multiply(A, B)
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (!Number.isInteger(A[i][j])) {
                        A[i][j] = this.printFraction(fraction(A[i][j]));
                    }
                }
            }
            for (i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                    output.push(A[i][j]);
                    output.push("  ");
                }
                output.push(<br />)
            }
        }
        this.setState({
            showOutputCard: true
        });
    }

    printFraction(value) {
        console.log( format(value, { fraction: 'ratio' }))
        return format(value, { fraction: 'ratio' })
    }

createMatrix(row, column) {

        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "14%",
                    height: "50%",
                    backgroundColor:  "#DAA520",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
           matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor: "#DAA520",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
        }
        this.setState({
            showDimentionForm: false,
            showMatrixForm: true,
        })


    }

    matrixCreate() {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
                console.log(A[i][j])
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
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
                    <h2>INVERSE MATRIX</h2>
                 </div>
                
                <div className="row">
                    <div className="col">
                        <Card bordered={true}
                            style={{ background: "orange", color: "#FFFFFFFF" , width: 450,height: 480 }}
                            onChange={this.handleChange}
                        >

                            {this.state.showDimentionForm &&
                                <div>
                                    <h4 style={{color : "white"}}>Row</h4><Input size="large" name="row" style={InputStyle}></Input>
                                    <h4 style={{color : "white"}}>Column</h4><Input size="large" name="column" style={InputStyle}></Input>
                                    <Button id="dimention_button" onClick={
                                        () => this.createMatrix(this.state.row, this.state.column)
                                    }
                                        style={{ background: "#4caf50", color: "white" }}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }

                            {this.state.showMatrixForm &&
                                <div>
                                    <h4 style={{color : "white"}}>Matrix [A]</h4><br />{matrixA}
                                    <h4 style={{color : "white"}}>Vector [B]<br /></h4>{matrixB}
                                    <br/>
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "blue", color: "white" }}
                                        onClick={() => this.inverse(this.state.row)}>
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
                                style={{ width: 400, background: "#3d683d", color: "#FFFFFFFF", float: "left" }}
                                onChange={this.handleChange} id="answerCard">
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>X = {JSON.stringify(answer)}</p>
                            </Card>
                        }
                    </div>
                </div>

            </div>
        );
    }
}
export default Inverse;
