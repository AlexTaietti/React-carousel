import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const SHAPES = [['heart', `#heart {

  position: relative;
  width: 100px;
  height: 90px;

}

#heart::before, #heart::after {

  content: '';
  position: absolute;
  left: 50px;
  top: 0;
  width: 50px;
  height: 80px;
  background: red;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;

}

#heart::after {

  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;

}`

], ['pacman', `#pacman {

  width: 0px;
  height: 0px;
  border-right: 60px solid transparent;
  border-top: 60px solid orange;
  border-left: 60px solid orange;
  border-bottom: 60px solid orange;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;

}`

], ['yin-yang', `#yin-yang {

  width: 96px;
  box-sizing: content-box;
  height: 48px;
  background: #eee;
  border-color: black;
  border-style: solid;
  border-width: 2px 2px 50px 2px;
  border-radius: 100%;
  position: relative;

}

#yin-yang::before {

  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  background: #eee;
  border: 18px solid black;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  box-sizing: content-box;

}

#yin-yang::after {

  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background: black;
  border: 18px solid #eee;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  box-sizing: content-box;

}`], ['cut-diamond', `#cut-diamond {

  border-style: solid;
  border-color: transparent transparent red transparent;
  border-width: 0 25px 25px 25px;
  height: 0;
  width: 50px;
  box-sizing: content-box;
  position: relative;
  margin: 20px 0 50px 0;

}

#cut-diamond::after {

  content: "";
  position: absolute;
  top: 25px;
  left: -25px;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: red transparent transparent transparent;
  border-width: 70px 50px 0 50px;

}`], ['space-invader', `#space-invader {

  box-shadow: 0 0 0 1em green,
  0 1em 0 1em green,
  -2.5em 1.5em 0 .5em green,
  2.5em 1.5em 0 .5em green,
  -3em -3em 0 0 green,
  3em -3em 0 0 green,
  -2em -2em 0 0 green,
  2em -2em 0 0 green,
  -3em -1em 0 0 green,
  -2em -1em 0 0 green,
  2em -1em 0 0 green,
  3em -1em 0 0 green,
  -4em 0 0 0 green,
  -3em 0 0 0 green,
  3em 0 0 0 green,
  4em 0 0 0 green,
  -5em 1em 0 0 green,
  -4em 1em 0 0 green,
  4em 1em 0 0 green,
  5em 1em 0 0 green,
  -5em 2em 0 0 green,
  5em 2em 0 0 green,
  -5em 3em 0 0 green,
  -3em 3em 0 0 green,
  3em 3em 0 0 green,
  5em 3em 0 0 green,
  -2em 4em 0 0 green,
  -1em 4em 0 0 green,
  1em 4em 0 0 green,
  2em 4em 0 0 green;
  background: green;
  width: 1em;
  height: 1em;
  overflow: hidden;
  margin: 50px 0 50px 0;

}`]];

class App extends Component{

  constructor () {
    super();
    this.state = {
      activeIndex: 0,
      lastActive: undefined,
      direction: 0
    }
    this.update = this.update.bind(this);
  }

  update (newIndex, lastIndex, newDirection) {
    this.setState({ activeIndex: newIndex,
                    lastActive: lastIndex,
                    direction: newDirection });
  }

  render () {

    if(this.state.lastActive === undefined) this.state.lastActive = -1;

    return (

      <div className="wrapper">

        <div className="intro">
            <h1>“The Shapes of CSS”</h1>
            <h2>from CSS Tricks</h2>
            <p>an incredibly clever article written by <span>Chris Coyier</span>,</p>
            <p>shamelessly copied (only a part) by me</p>
        </div>

        <Carousel parentUpdate={ this.update } shapes={this.props.shapes} />

        <Code direction={ this.state.direction } lastShape={ this.props.shapes[this.state.lastActive] } currentShape={ this.props.shapes[this.state.activeIndex] } shapes={this.props.shapes}/>

      </div>

    )

  }

}

class Carousel extends Component {

  constructor () {
    super();
    this.state = {
      currentIndex: 0,
      lastActive: undefined,
      direction: 0
    }
  }

  showNext(currentIndex){

    this.state.lastActive = currentIndex < 0 ? 0 : currentIndex === this.props.shapes.length ? this.props.shapes.length - 1 : currentIndex;
    this.state.currentIndex = currentIndex + 1 === this.props.shapes.length ? 0 : currentIndex + 1;
    this.props.parentUpdate(this.state.currentIndex, this.state.lastActive, 1);

  }

  showPrevious(currentIndex){

    this.state.lastActive = currentIndex < 0 ? 0 : currentIndex;
    this.state.currentIndex = currentIndex - 1 < 0 ? this.props.shapes.length - 1 : currentIndex - 1;
    this.props.parentUpdate(this.state.currentIndex, this.state.lastActive, -1);


  }

  render = () => {

    return (

      <div className={ "carousel carousel--" + this.props.shapes[this.state.currentIndex][0] }>

        <div onClick={() => this.showPrevious(this.state.currentIndex) } className="controls controls--back"><span>&lt;</span></div>

        <Slide key={this.props.shapes[this.state.currentIndex][0]} shape={this.props.shapes[this.state.currentIndex][0]} />

        <div onClick={() => this.showNext(this.state.currentIndex) } className="controls controls--next"><span>&gt;</span></div>

      </div>

    )

  }

}

class Slide extends Component {

  render () {

    return (

      <div key={this.props.shape} className={ "slide slide--" + this.props.shape }>

        <div className={ "slide__shape slide__shape--" + this.props.shape }></div>

      </div>

    )

  }

}

class Code extends Component {

  render(){

    return(

      <div className={"code-wrapper code-wrapper--" + this.props.currentShape[0]}>

        <pre key={this.props.currentShape[0]} className={ "code code--active" + ( (this.props.direction < 0) ? " slide-left" : " slide-right") }>{ this.props.currentShape[1] }</pre>

        { this.props.lastShape && <pre key={this.props.lastShape[0]} className={"code code--last" + ( (this.props.direction < 0) ? " slide-left" : " slide-right")}>{ this.props.lastShape[1] }</pre> }

      </div>

    )

  }

}

ReactDOM.render( <App shapes={SHAPES} />, document.getElementById('app') );
