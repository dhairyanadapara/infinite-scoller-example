# Infinite Scroller Example

There are multiple use cases in the modern UX when we are required to use infinite scrolling. Previously, dev are using the height of viewport and element to find out intersection of element is in the viewport. The main issue in same is that the function that calculates all the stuffs will be executed on main queue so it makes your app a bit slow. Few days ago I came across the Intersection API. Which can be used in following applications:

-   Lazy-loading of images or other content as a page is scrolled.
-   Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
-   Reporting of visibility of advertisements in order to calculate ad revenues.
-   Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Let's start with the solution.

```js
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        };
    }
    componentDidMount() {
        this.createObserver();
    }

    createObserver = () => {
        let options = {
            root: null,
            rootMargin: " 40px",
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        };
        const boxElement = document.getElementById("loading");
        const observer = new IntersectionObserver(
            this.handleIntersect,
            options
        );
        observer.observe(boxElement);
    };

    handleIntersect = (entries, observer) => {
        const { arr } = this.state;
        entries.forEach((entry) => {
            console.log(entry.intersectionRatio);
            if (entry.intersectionRatio > 0) {
                this.setState({
                    arr: arr.concat([
                        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                    ]),
                });
            }
        });
    };

    render() {
        const { arr } = this.state;
        return (
            <div className="App" id="app">
                <div id="infinite-container">
                    <div class="cards-list" id="card-list">
                        {arr.map((x) => (
                            <div class="card 1">
                                <div class="card_image">
                                    {" "}
                                    <img src="https://i.redd.it/b3esnz5ra34y.jpg" />
                                </div>
                                <div class="card_title title-white">
                                    <p>Card Title</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="loading" style={{ height: "100px" }}>
                        Loading
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
```

As you can see we have used the react class component so it will be easy to understand. You can use functional component also.

```js
createObserver = () => {
    let options = {
        root: null,
        rootMargin: " 40px",
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };
    const boxElement = document.getElementById("loading1");
    const observer = new IntersectionObserver(this.handleIntersect, options);
    observer.observe(boxElement);
};
```

Starting with the creating observer, the `IntersectionObserver` takes 2 arguments.

1. options
   options are basically the configuration for Intersection Observer. It has 3 properties:

    1. **root :**\
       The element which you want to use as viewport. If you want to use browser's viewport pass `null`.
    2. **rootMargin :**\
       Offset is added to the target rectangle while calculating intersections
    3. **threshold :**\
       A list of thresholds, sorted in increasing numeric order. Callback will be called when intersectionRatio passes the threshold

2. **callback**\
   callback has 2 argument:
    1. **entries**\
       list of IntersectionObserverEntry, which describes the intersection between target and root element
    1. **observer**\
       IntersectionObserver object same we have created in createObserver

In out case, we have only 1 target element in observer so we will get only 1 object in entries. If you have multiple target elements targets to same observers you will get more entries.

```javascript
handleIntersect = (entries, observer) => {
    const { arr } = this.state;
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            this.setState({
                arr: arr.concat([
                    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                ]),
            });
        }
    });
};
```

IntersectionObserverEntry object have multiple attributes like `boundingClientRect`,`intersectionRatio`,`intersectionRect`,`isIntersecting`,`rootBounds`,`target`,
`time`.

The main attributes are:

-   **intersectionRatio:** returns the percentage of intersectionRect to the boundingClientRect
-   **isIntersecting:** return if target and root are intersecting or not.
-   **target:** this is important attribute when we have multiple target attached to same observer