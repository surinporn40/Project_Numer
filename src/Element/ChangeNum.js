import { compile, derivative } from 'mathjs';
const func = (fx, X) => {
    var expr = compile(fx); // ทำให้f(x) เป็นค่าคำนวณได้
    let scope = { x: parseFloat(X) }; //x ทำให้เป็นflaot
    return expr.evaluate(scope); //เอา x ไปทนf(x)
}
const error = (xnew, xold) => {
    return Math.abs((xnew - xold) / xnew);
}
const funcDiff = (fx, X) => {
    let scope = {x:parseFloat(X)};
    var expr = derivative(fx, 'x');
    return expr.evaluate(scope); 
}
export{ func,error,funcDiff};