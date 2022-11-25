import React from "react";
import {Navbar,Container,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import NavDropdown from 'react-bootstrap/NavDropdown';
import IconHome from './home-outline.svg';

var Brandstyle ={
    color:'#ffffff',
    fontSize: '140%',
    shadow: '20px 20px 50px'
};

var Fontstyle = {
  color:'#FFA500',
    fontSize: '100%',
    fontFamily:'Arial'
}


export const NavBar = () =>{
    return(

        <Navbar bg="dark" expand="lg" variant='dark'>
        <Container>
        <Link style={Fontstyle} to="/"><Navbar.Brand style={Brandstyle}>Numerical Method</Navbar.Brand></Link>
          <Link style={Fontstyle} to="/"><img src={IconHome} className="App-icon" alt="logo" /></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="me-auto">
              <NavDropdown  style={Fontstyle} title="Root of equatioins" id="collasible-nav-dropdown" >
                <DropdownItem><Link style={Fontstyle} to="/Graphical">Graphical Method</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Bisection">Bisection <br/></Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/FalsePosition">False position</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/NewtonRapson">Newton raphson</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Onepoint">Onepoint Iteration</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Secant">Secant Method</Link></DropdownItem>
              </NavDropdown>
              <NavDropdown  style={Fontstyle} title="Linea Equation" id="collasible-nav-dropdown" >
                <DropdownItem><Link style={Fontstyle} to="/Cramer">Cramer's Rule Method</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Gass">Gauss Elimination Method</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Gjordan">Gauss Jordan Elimination Method</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Inverse">Inverse Matrix</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Lu">LU Decomposition</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Conjuate">Conjugate Gradient  Method</Link></DropdownItem>
              </NavDropdown>
              <NavDropdown  style={Fontstyle} title="Interpolation" id="collasible-nav-dropdown" >
                <DropdownItem><Link style={Fontstyle} to="/NewtonDiv">Newton's Divided Differences Interpolation</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Largange">Lagrange Interpolation</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/spline">Spline Interpolation</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/LestSquare">Linear Regression</Link></DropdownItem>
                
              </NavDropdown>
              <NavDropdown  style={Fontstyle} title="Regression" id="collasible-nav-dropdown" >
                <DropdownItem><Link style={Fontstyle} to="/Linear">Linear Regression</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/MultipleLinear">Multiple Linear Regression</Link></DropdownItem>
                <DropdownItem><Link style={Fontstyle} to="/Polynomial">Polynomial Regression</Link></DropdownItem>
              </NavDropdown>
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
