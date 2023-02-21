class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pads: [
        {title: 'Heater-1', key: 'Q', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
        {title: 'Heater-2', key: 'W', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
        {title: 'Heater-3', key: 'E', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        {title: 'Heater-4', key: 'A', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
        {title: 'Clap', key: 'S', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
        {title: 'Open-HH', key: 'D', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
        {title: "Kick-n'-Hat", key: 'Z', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
        {title: 'Kick', key: 'X', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
        {title: 'Closed-HH', key: 'C', srcAudio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"},
      ],
      displayText: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keyup', (event) => {
      let key = String.fromCharCode(event.keyCode);
      document.getElementById(key).play();
      this.setState({displayText: this.state.pads.filter(obj => obj.key == key)[0].title});
    });
  }
  
  handleClick(key, title) {
    document.getElementById(key).play();
    this.setState({displayText: title});
  }
  
  render() {
    return (
      <div className='inner-container' id='drum-machine'>
        
        <div className="pad-bank">
          {this.state.pads.map((pad) => (<div key={pad.title} onClick={() => this.handleClick(pad.key, pad.title)} className="drum-pad" id={pad.title} style={{backgroundColor: 'grey', marginTop: '10px', boxShadow: 'black 3px 3px 5px'}}><audio className="clip" id={pad.key} src={pad.srcAudio}></audio>{pad.key}</div>))}
        </div>
        
        <div className="logo">
          <div className="inner-logo ">
            FCC&nbsp;
          </div>
          <i className="inner-logo fa-brands fa-free-code-camp"></i>
        </div>
        
        <div className="controls-container">
          <div className="control">
            <p>Power</p>
            <div className="select">
              <div className="inner" style={{float: 'right'}}></div>
            </div>
          </div>
          <p id="display">{this.state.displayText}</p>
          <div className="volume-slider">
            <input max="1" min="0" step="0.01" type="range" value="0.3" />
          </div>
          <div className="control">
            <p>Bank</p>
            <div className="select">
              <div className="inner" style={{float: 'left'}}></div>
            </div>
          </div>
        </div>
      </div>);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);