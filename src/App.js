import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    isOn: true,
    text: "Let's Rock!",
  };

  drumSounds = [
    {
      key: 'Q',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
    },
    {
      key: 'W',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    },
    {
      key: 'E',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    },
    {
      key: 'A',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    },
    {
      key: 'S',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    },
    {
      key: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    },
    {
      key: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    },
    {
      key: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    },
    {
      key: 'C',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    },
  ];

  handleKeyDown = e => {
    e.stopImmediatePropagation();
    const pad = document.getElementById(e.key.toUpperCase());
    if (this.state.isOn) {
      pad.play();
    }
    console.log(e.key);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  togglePower = () => {
    this.setState({
      isOn: !this.state.isOn,
      text: !this.state.isOn ? "Let's Rock!" : '',
    });
  };

  showText = padText => {
    const text = padText.replace(/-/g, ' ');
    this.setState({
      text,
    });
  };

  drumMachineStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  };

  render() {
    return (
      <div
        id='drum-machine'
        className='container'
        style={this.drumMachineStyle}
      >
        <Display text={this.state.text} />
        <DrumPads
          isOn={this.state.isOn}
          drumSounds={this.drumSounds}
          showText={this.showText}
        />
        <PowerSwitch isOn={this.state.isOn} togglePower={this.togglePower} />
      </div>
    );
  }
}

const Display = ({ text }) => {
  const displayStyle = {
    margin: 10,
    width: 260,
    textAlign: 'center',
    padding: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  };

  return (
    <input
      type='text'
      disabled
      style={displayStyle}
      value={text}
      id='display'
    />
  );
};

const DrumPads = ({ drumSounds, isOn, showText }) => {
  const padContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '5px',
  };

  return (
    <div className='pad-container' style={padContainerStyle}>
      {drumSounds.map(pad => (
        <DrumPad key={pad.id} pad={pad} isOn={isOn} showText={showText} />
      ))}
    </div>
  );
};

const DrumPad = ({ pad: { key, id, url }, isOn, showText }) => {
  const padStyle = {
    padding: '30px',
    boxShadow: '1px 2px 3px 1px #333',
    fontSize: 24,
    fontWeight: 'bold',
  };

  const play = () => {
    const audio = document.getElementById(key);
    if (isOn) {
      audio.play();
      showText(id);
    }
  };

  return (
    <button
      id={id.toLowerCase()}
      className='drum-pad'
      onClick={play}
      style={padStyle}
    >
      {key}
      <audio id={key} src={url} className='clip'></audio>
    </button>
  );
};

const PowerSwitch = ({ isOn, togglePower }) => {
  const switchStyle = {
    position: 'relative',
    margin: 10,
  };
  const buttonStyle = {
    padding: '5px 20px 5px 5px',
  };
  const lightStyle = {
    position: 'absolute',
    top: 14,
    right: 5,
    borderRadius: '50%',
    border: '1px solid #333',
    background: isOn ? '#f00' : '#333',
    width: 10,
    height: 10,
  };

  return (
    <div style={switchStyle}>
      <div id='power-light' style={lightStyle}></div>
      <button id='power-switch' style={buttonStyle} onClick={togglePower}>
        <i className='fas fa-power-off fa-2x'></i>
      </button>
    </div>
  );
};

export default App;
