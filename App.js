function App() {
    const [formula, setFormula] = React.useState('');
    const [display, setDisplay] = React.useState('');

    const number = (number) => {
        //input '0123' => '123'
        if(display == '0'){
            setFormula(prev => prev.slice(0,-1) + number);
            setDisplay(number);
        } 
        else if(/([+\-*\/])$/.test(formula)){
            setDisplay(number);
            setFormula(prev => prev + number);
        }
        //start new formula after hitting equal
        else if(/([=])$/.test(formula) && display != null){
            setFormula(number);
            setDisplay(number);    
        }
        else {
            setDisplay(prev => prev + number);
            setFormula(prev => prev + number);
        }
    }

    function precision(a) {
        if (!isFinite(a)) return 0;
        let e = 1, p = 0;
        while (Math.round(a * e) / e !== a) { e *= 10; p++ }
        return p;
    }

    const operand = (symbol) => {
        if (/[=]$/.test(formula)){
            let temp = (eval(formula.slice(0,-1)));
            let decimal = precision(temp);
            if (decimal > 4) temp = (eval(formula.slice(0,-1))).toFixed(4)
            else temp = (eval(formula.slice(0,-1))).toFixed(decimal)
            setFormula ((temp + symbol).slice(0,-1))
        }
        //ex: 5 * - 5 = -25; 5 * - + 5 = 10
        if(/(([+\-*\/]){2})$/.test(formula)){
            setFormula(prev => prev.slice(0,-2) + symbol);
            setDisplay(symbol)
        }
        else if(/([+\-*\/])$/.test(formula) && symbol != "-") {
            setFormula(prev => prev.slice(0,-1) + symbol);
        }
        else {
            setFormula(prev => prev + symbol);
            setDisplay(symbol)
        }
    }
    const dot = () => {
        //two "." in one number should not be accepted
        if(display.includes(".")) return;
         else {
            setDisplay(prev => prev + ".");
            setFormula(prev => prev + ".");
        }
    }
    const calculate = () => {
        if(/([+\-*\/])$/.test(formula)){
            console.log(formula);
            setDisplay(eval(formula.slice(0,-1)));
            setFormula(prev => prev.slice(0,-1) + "=");  
        }
        else{
            const answer = eval(formula);
            setFormula(prev => prev + "=")
            setDisplay(parseFloat(answer.toFixed(4)));
        }
    }
        
    const clear = () => {
        setDisplay('0');
        setFormula('')
    }
    const backspace = () => {
        if(/([=])$/.test(formula) && display != null) return
        setFormula(prev => prev.slice(0,-1));
        setDisplay(prev => prev.slice(0,-1));
    }

    return(
        <div className="container">
            <div className="calc-body">
                <div className="calc-screen">
                    <div className="calc-operation">{formula}</div>
                    <div id="display" className="calc-typed">{display}</div>
                </div>
                <div className="calc-button-row">
                    <div onClick={clear} id="clear" className="button c big">AC</div>
                    <div onClick={backspace} id="backspace" className="button c">C</div>
                    <div onClick={() => operand("/")} id="divide" className="button l">/</div>
                </div>
                <div className="calc-button-row">
                    <div onClick={() => number("7")} id="seven" className="button">7</div>
                    <div onClick={() => number("8")} id="eight" className="button">8</div>
                    <div onClick={() => number("9")} id="nine" className="button">9</div>
                    <div onClick={() => operand("*")} id="multiply" className="button l">x</div>
                </div>
                <div className="calc-button-row">
                    <div onClick={() => number("4")} id="four" className="button">4</div>
                    <div onClick={() => number("5")} id="five" className="button">5</div>
                    <div onClick={() => number("6")} id="six" className="button">6</div>
                    <div onClick={() => operand("-")} id="subtract" className="button l">−</div>
                </div>
                <div className="calc-button-row">
                    <div onClick={() => number("1")} id="one" className="button">1</div>
                    <div onClick={() => number("2")} id="two" className="button">2</div>
                    <div onClick={() => number("3")} id="three" className="button">3</div>
                    <div onClick={() => operand("+")} id="add" className="button l">+</div>
                </div>
                <div className="calc-button-row">
                    <div onClick={() => number("0")} id="zero" className="button">0</div>
                    <div onClick={dot} id="decimal" className="button">.</div>
                    <div onClick={calculate} id="equals" className="button l big">=</div>
                </div>
            </div>
        </div>);
}
ReactDOM.render(<App />, document.getElementById('root'))