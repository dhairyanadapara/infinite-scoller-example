
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      arr1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      arr2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    };
  }
  componentDidMount() {
    this.createObserver1();
    this.createObserver2();

  }

  createObserver1 = () => {

    let options = {
      // root: document.getElementById('infinite-container1'),
      root: null,
      rootMargin: " 40px",
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };
    const boxElement = document.getElementById('loading1');
    const observer = new IntersectionObserver(this.handleIntersect1, options);
    observer.observe(boxElement);
  };

  createObserver2 = () => {
    let options = {
      root: document.getElementById('infinite-container2'),
      rootMargin: " 40px",
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };
    const boxElement = document.getElementById('loading2');
    const observer = new IntersectionObserver(this.handleIntersect2, options);
    observer.observe(boxElement);
  };

  handleIntersect1 = (entries, observer) => {
    const { arr1 } = this.state;
    entries.forEach((entry) => {
      console.log(entry.intersectionRatio);
      if (entry.intersectionRatio > 0) {
        this.setState({ arr1: arr1.concat([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]) });
      }
    });
  };

  handleIntersect2 = (entries, observer) => {
    const { arr2 } = this.state;
    entries.forEach((entry) => {
      console.log(entry.intersectionRatio);
      if (entry.intersectionRatio > 0) {
        this.setState({ arr2: arr2.concat([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]) });
      }
    });
  };

  render() {
    const { arr1, arr2 } = this.state;
    return (
      <div className="App" id="app" >
        <div id="infinite-container1">
          <label>Root: null </label>
          <div class="cards-list" id="card-list">
            {arr1.map((x) => (
              <div class="card 1">
                <div class="card_image"> <img alt="test" src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
                <div class="card_title title-white">
                  <p>Card Title</p>
                </div>
              </div>
            ))}
          </div>
          <div id="loading1" style={{ height: "100px" }}>Loading</div>
        </div>
        <div id="infinite-container2">
          <label>Root: parent </label>
          <div class="cards-list" id="card-list">
            {arr2.map((x) => (
              <div class="card 1">
                <div class="card_image"> <img alt="test" src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
                <div class="card_title title-white">
                  <p>Card Title</p>
                </div>
              </div>
            ))}
          </div>
          <div id="loading2" style={{ height: "100px" }}>Loading</div>
        </div>
      </div>);
  }
}

export default App;
