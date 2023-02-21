const isOperator = /[x/+‑]/,
      endsWithOperator = /[x+‑/]$/,
      clearStyle = {background: '#ac3939'},
      operatorStyle = {background: '#666666'},
      equalsStyle = {
        background: '#004466',
      };
      
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    }
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }
  
  maxDigitWarning() {
    this.setState({
      currentVal: 'Digit Limit Met',
      prevVal: this.state.currentVal
    });
    setTimeout(() => this.setState({currentVal: this.state.prevVal}), 1000);
  }
  
  handleEvaluate() {
    if (!this.state.currentVal.includes('Limit')) {
      let expression = this.state.formula;
      if (endsWithOperator.test(expression)) expression = expression.slice(0, -1);
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentVal: answer.toString(),
        formula: expression.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + answer,
        prevVal: answer,
        evaluated: true
      });
    }
  }
    
  handleOperators(e) { 
    if (!this.state.currentVal.includes('Limit')) {
      this.setState({currentVal: e.target.value,evaluated: false});
      if (this.state.formula.includes('=')) {
        this.setState({formula: this.state.prevVal + e.target.value}); // comment 1
      } else {
        this.setState({ // comment 2
          prevVal: !isOperator.test(this.state.currentVal) ? 
            this.state.formula : 
            this.state.prevVal,
          formula: !isOperator.test(this.state.currentVal) ? 
            this.state.formula += e.target.value : 
            this.state.prevVal += e.target.value
        });
      }
    }
  }
  
  handleNumbers(e) {
    if (!this.state.currentVal.includes('Limit')) {
      this.setState({evaluated: false})
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (this.state.evaluated === true) {
        this.setState({
          currentVal: e.target.value,
          formula: e.target.value != '0' ? e.target.value : '',
        });
      } else {
        this.setState({
          currentVal: 
            this.state.currentVal == '0' || 
            isOperator.test(this.state.currentVal) ? 
            e.target.value : this.state.currentVal + e.target.value,
          formula:  
            this.state.currentVal == '0' && e.target.value == '0' ?
            this.state.formula : 
            /([^.0-9]0)$/.test(this.state.formula) ? 
            this.state.formula.slice(0, -1) + e.target.value :
            this.state.formula + e.target.value,
        });
      }
    }
  }
  
  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: '0.',
        formula: '0.',
        evaluated: false});
    } else if (!this.state.currentVal.includes('.') &&
      !this.state.currentVal.includes('Limit')) {
      this.setState({evaluated: false})
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (endsWithOperator.test(this.state.formula) || 
        this.state.currentVal == '0' && this.state.formula === '') {
        this.setState({
          currentVal: '0.',
          formula: this.state.formula + '0.'
        });         
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.',
        });
      }
    }
  }
  
  initialize() {
    this.setState({
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    });
  }
  
  render() {
    return (
      <div>
        <div className='calculator'>
          <div className="container">
            <div className="formulaScreen">{this.state.formula.replace(/x/g, '⋅')}</div>
            <div id="display" className="outputScreen">{this.state.currentVal}</div>
            <button id="clear" className="clear" value="AC" style={clearStyle} onClick={this.initialize}>AC</button>
            <button id="divide" className="divide" value="/" style={operatorStyle} onClick={this.handleOperators}>/</button>
            <button id="multiply" className="multiply" value="x" style={operatorStyle} onClick={this.handleOperators}>x</button>
            <button id="seven" className="seven" value="7" onClick={this.handleNumbers}>7</button>
            <button id="eight" className="eight" value="8" onClick={this.handleNumbers}>8</button>
            <button id="nine" className="nine" value="9" onClick={this.handleNumbers}>9</button>
            <button id="subtract" className="subtract" value="‑" style={operatorStyle} onClick={this.handleOperators}>‑</button>
            <button id="four" className="four" value="4" onClick={this.handleNumbers}>4</button>
            <button id="five" className="five" value="5" onClick={this.handleNumbers}>5</button>
            <button id="six" className="six" value="6" onClick={this.handleNumbers}>6</button>
            <button id="add" className="add" value="+" style={operatorStyle} onClick={this.handleOperators}>+</button>
            <button id="one" className="one" value="1" onClick={this.handleNumbers}>1</button>
            <button id="two" className="two" value="2" onClick={this.handleNumbers}>2</button>
            <button id="three" className="three" value="3" onClick={this.handleNumbers}>3</button>
            <button id="zero" className="zero" value="0" onClick={this.handleNumbers}>0</button>
            <button id="decimal" className="decimal" value="." onClick={this.handleDecimal}>.</button>
            <button id="equals" className="equals" value="=" style={equalsStyle} onClick={this.handleEvaluate}>=</button>
          </div>
        </div>
        <div className="author"> Designed and Coded By <br />
          <a target="_blank" href="https://goo.gl/6NNLMG"> 
            Peter Weinberg
          </a>
        </div>
      </div>
    )
  }
};

ReactDOM.render(<Calculator />, document.getElementById('app'));
