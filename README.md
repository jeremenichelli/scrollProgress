# scrollProgress [![Build Status](https://travis-ci.org/jeremenichelli/scrollProgress.svg)](https://travis-ci.org/jeremenichelli/scrollProgress)

Light weight library to observe the viewport scroll position.

In previous versions this package injected a scroll bar showing the scrolling progress. **Why did I change it?** Because it wasn't flexible to be adapted to others uses or UI libraries.

**This means you still can create a progress bar as before** and even with less code, keep scrolling to the **Recipes** section to see how.


## Add it to your project

Include the `dist` file in a script tag or run `npm install scrollprogress --save`.


## Use

In this last version, you have to create a new instance to create an observer and pass a callback to the contructor. That observer can be destroy at any time.

```js
import ScrollProgress from 'scrollprogress';

const progressObserver = new ScrollProgress((x, y) => {
  console.log(x, y);
});
```

The callback will get two arguments, the first one being a decimal number for the horizontal scrolling progress and the second one for the vertical scrolling progress.

The method you pass will also get called on resize since the viewport and body metrics might change.

### destroy

Whenever you want the observer to stop working just call `progressObserver.destroy()`.


## Recipes

### Vanilla scroll progress bar

To accomplish the old functionality you will need to add the DOM element and the styles, something that the old version did for you, and then create an observer to update the bar width.

#### HTML

```html
<div class="progress-bar"></div>
```

#### CSS

```css
.progress-bar {
  background-color: rebeccapurple;
  height: 5px;
  position: fixed;
  top: 0;
  bottom: 0;
}
```

#### JS

```js
const progressElement = document.querySelector('.progress-bar');

const progressObserver = new ScrollProgress((x, y) => {
  progressElement.style.width = y * 100 + '%';
});
```

And that's it! Super simple.

What if you don't like inline styles and you want to handle the look of it in your CSS style sheet, then you just need to pass a **styles** flag and set it to ```false```.

```js
scrollProgress.set({ styles: false });
```

The only thing that the script will control will be the width of the progress bar as you scroll, the rest of the styling is all on you. _Remember that the script won't put any styles at all so make sure to position the bar as fixed in your page or you won't be able to see it._


### Scroll bar component

One of the main reasons this library was moved to this new approach is because you can easily couple an observer with any component library used nowadays. For example, create a React scroll bar component.

```jsx
import { Component } from 'react';
import ScrollProgress from 'scrollprogress';

export default class ScrollProgress extends Component {
  constructor() {
    this.state = {
      progress: 0;
    };
  }

  componentDidMount() {
    this.progressObserver = new ScrollProgress((x, y) => {
      this.setState({ progress: y });
    });
  }

  componentWillUnmount() {
    this.progressObserver.destroy();
  }

  render() {
    const style = {
      backgroundColor: 'rebeccapurple',
      height: '5px',
      position: 'fixed',
      top: 0,
      bottom: 0,
      width: this.state.progress
    };

    return (
      <div
        className="progress-bar"
        style={ style }
      />
    );
  }
}
```

It's easy to imagine how to create the same component for other frameworks. If you want to add a recipe or any other use case to the documentation clone this repo and make a pull request.

## License

```
The MIT License (MIT)

Copyright (c) 2017 Jeremias Menichelli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
