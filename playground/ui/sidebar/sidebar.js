import React, { Component } from 'react';
import ColorPicker from 'react-color';
import examples from 'examples';
import Examples from '../examples/examples';
import Logo from './logo';

const styles = {
  sidebar: {
    backgroundColor: 'rgba(0,0,0,.8)',
    height: '100%'
  }
};

class Sidebar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      example: null,
      color: this.props.color,
      displayColorPicker: false,
      theme: this.props.theme
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: true });
  };

  changeColor = (color) => {
    this.setState({ color: `#${color.hex}` });
    this.props.onColorChange(`#${color.hex}`);
  };

  changeTheme = () => {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    this.props.onThemeChange(this.state.theme);
  };

  render() {
    const isChecked = this.state.theme === 'dark';

    return (
      <div style={{ ...styles.sidebar, ...this.props.style }}>
        <Logo/>

        <h1
          style={{
            margin: 0,
            padding: '10px',
            fontFamily: 'sans-serif',
            color: 'white',
            fontSize: '16px',
            letterSpacing: '0.7px',
            textTransform: 'uppercase',
            fontWeight: 'normal'
          }}
        >
          Playground
        </h1>

        <br/>

        <label style={{ margin: '10px', fontFamily: 'sans-serif', color: 'white', fontSize: '11px', clear: 'both' }}>
          <input type="checkbox" onChange={this.changeTheme.bind(this)} defaultChecked={isChecked}/>
          Dark Theme
        </label>

        <div style={{ margin: '10px' }}>
          <a
            style={{
              height: '16px',
              width: '16px',
              display: 'block',
              border: '2px solid rgba(255, 255, 255, 1)',
              borderRadius: '3px',
              backgroundColor: this.state.color,
              float: 'left'
            }}
            onClick={this.handleClick}
          />
          <span style={{ margin: '10px', fontFamily: 'sans-serif', color: 'white', fontSize: '11px' }}>
            Color
          </span>
          <ColorPicker
            positionCSS={{ position: 'absolute',top: '100px', left: '20px' }}
            display={this.state.displayColorPicker}
            color={this.state.color}
            onChangeComplete={this.changeColor}
            type="sketch"
          />
        </div>

        {this.renderExamples()}
      </div>
    );
  }

  renderExamples() {
    let list = {};
    for (var prop in examples) {
      if (examples.hasOwnProperty(prop)) {
        let path = prop.replace(/^\/examples\//, '').split('/');
        let currentList = list;
        path.forEach((item, index) => {
          if (index === path.length - 1) currentList[item] = examples[prop];
          else if (typeof currentList[item] === 'undefined') currentList[item] = {};
          currentList = currentList[item];
        });
      }
    }

    return <Examples list={list}/>;
  }
}

export default Sidebar;
