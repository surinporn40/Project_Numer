
import { NavBar } from './NavBar';
import Home from './Element/Home';
import About from './Element/About';
import Contact from './Element/Contact';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Bisection from './rootOfEquations/Bisection';
import FalsePosition from './rootOfEquations/FalsePosition';
import NewtonRapson from './rootOfEquations/NewtonRapson';
import Onepoint from './rootOfEquations/Onepoint';
import Secant from './rootOfEquations/Secant';
import Graphical from './rootOfEquations/Graphical';

import Cramer from './linea/Cramer';
import Gass from './linea/Gass';
import Gjordan from './linea/Gjordan';
import Inverse from './linea/Inverse';
import Lu from './linea/Lu'; 
import Conjuate from './linea/Conjuate'; 

import NewtonDiv from './Interpolation/NewtonDiv';
import Largange from './Interpolation/Largange';
import Spline from './Interpolation/Spline';
import LestSquare from './Interpolation/LestSquare';

import Linear from './regression/Linear';
import MultipleLinear from './regression/MultipleLinear';
import Polynomial from './regression/Polynomial';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Bisection' element={<Bisection/>} />
        <Route path='/FalsePosition' element={<FalsePosition/>} />
        <Route path='/NewtonRapson' element={<NewtonRapson/>} />
        <Route path='/Onepoint' element={<Onepoint/>} />
        <Route path='/Secant' element={<Secant/>} />
        <Route path='/Graphical' element={<Graphical/>} />

        <Route path='/Cramer' element={<Cramer/>} />
        <Route path='/Gass' element={<Gass/>} />
        <Route path='/Gjordan' element={<Gjordan/>} />
        <Route path='/Inverse' element={<Inverse/>} />
        <Route path='/Lu' element={<Lu/>} />
        <Route path='/Conjuate' element={<Conjuate/>} />

        <Route path='/NewtonDiv' element={<NewtonDiv/>} />
        <Route path='/Largange' element={<Largange/>} />
        <Route path='/Spline' element={<Spline/>} />
        <Route path='/LestSquare' element={<LestSquare/>} />

        <Route path='/Linear' element={<Linear/>} />
        <Route path='/MultipleLinear' element={<MultipleLinear/>} />
        <Route path='/Polynomial' element={<Polynomial/>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
