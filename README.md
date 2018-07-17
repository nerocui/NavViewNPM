# Fluent Navigation View React
# 
## Installation
```
npm install --save fluent-nav-view-react
```
# 
## Usage
#### import the package
~~~javascript
import NavigationView from 'fluent-nav-view-react';
~~~
#### immport your dark icons and light icons
~~~javascript
import cube from './icons/cube.svg';
import bookmark from './icons/bookmark.svg';
import diamond from './icons/diamond-outlined-shape.svg';
import network from './icons/network.svg';
import star from './icons/star.svg';

import lightcube from './icons/cube(1).svg';
import lightbookmark from './icons/bookmark(1).svg';
import lightdiamond from './icons/diamond-outlined-shape(1).svg';
import lightnetwork from './icons/network(1).svg';
import lightstar from './icons/star(1).svg';
~~~
#### define the Navigation View Items list with dark icon, light icon, text and click handler
~~~javascript
const items = [
  {
    darkicon:cube,
    lighticon:lightcube,
    text:'item1',
    handler:()=>{console.log('hello from 1')}
  },
  {
    darkicon:bookmark,
    lighticon:lightbookmark,
    text:'item2',
    handler:()=>{console.log('hello from 2')}
  },
  {
    darkicon:diamond,
    lighticon:lightdiamond,
    text:'item3',
    handler:()=>{console.log('hello from 3')}
  },
  {
    darkicon:network,
    lighticon:lightnetwork,
    text:'item4',
    handler:()=>{console.log('hello from 4')}
  },
  {
    darkicon:star,
    lighticon:lightstar,
    text:'item5',
    handler:()=>{console.log('hello from 5')}
  },
];
~~~
#### add a background image to you style file for the see thru effect
~~~css
body {
  margin: 0;
  font: 1em/1.4 Sans-serif;
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?w=700") center/cover;
  background-attachment: fixed;
}
~~~
#### or if you want the effect to be only under the Navigation View panel
~~~javascript
const image = 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?w=700';
~~~
#### use it in your app with "dark" or "light" theme
~~~javascript
class App extends Component {
  render() {
    return (
      <div className="App">
              <NavigationView background={image} items={items} theme="dark"/>
      </div>
    );
  }
}
~~~