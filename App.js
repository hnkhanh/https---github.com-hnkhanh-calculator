function App() {
    const [formula, setFormula] = React.useState('');
    const [display, setDisplay] = React.useState('');

    const number = (number) => {
        //input '0123' => '123'
        if(display == "0"){
            setFormula(number);
            setDisplay(number);
        } 
        //push the operand up before add number
        else if(/([+\-*\/])$/.test(formula)){
            setDisplay(number);
            setFormula(formula + number);
        }
        else {
            setDisplay(display + number);
            setFormula(formula + number);
        }
    }
    const operand = (symbol) => {
        //If 2 or more operators are entered consecutively,
        //the operation performed should be the last operator entered
        //excluding the negative (-) sign.
        //ex: 5 * - 5 = -25; 5 * - + 5 = 10
        if(/(([+\-*\/]){2,})$/.test(formula)){
            setFormula(formula.slice(0,-2) + symbol);
            setDisplay(symbol);
        }
        else if(/([+\-*\/])$/.test(formula) && symbol != "-") {
            setFormula(formula.slice(0,-1) + symbol);
            setDisplay(symbol);
        }
        else {
            setFormula(formula + symbol);
            setDisplay(symbol)
        }
    }
    const dot = () => {
        //two "." in one number should not be accepted
        if(display.includes(".")){
            return;
        } else {
            setDisplay(display + ".");
            setFormula(formula + ".");
        }
    }
    const calculate = () => {
        const answer = eval(formula);
            setFormula(parseFloat(answer.toFixed(5)));
            setDisplay(parseFloat(answer.toFixed(5)));
        }
        
    const clear = () => {
        setDisplay('0');
        setFormula('')
    }
    const backspace = () => {
        setFormula(formula.slice(0,-1));
        setDisplay(formula.slice(0,-1));
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