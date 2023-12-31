
## A simple Pattern-Creator...
based on the reuse of a z-stack web-component
(vanilla JS, CSS, HTML)

For more details have a look at the [DOCUMENTATION](/documentation.txt)

***

To play with the idea click the button to an example on netlify:

[![Netlify Status](https://api.netlify.com/api/v1/badges/792f24bb-caf9-4a6b-98c1-9fcff4261772/deploy-status)](https://zstack-pattern-maker.netlify.app)



The example below was initialised like:

```js
const elements = `
    <div class="square one"></div>
    <div class="square two"></div>
    <div class="square three"></div>
    <div class="square four"></div>
    <div class="square five"></div>
    <div class="square six"></div>
`;

const zStackGrid = new ZStackGrid({

	parentId: 'container', // required
	rows: 6, // optional - default 6
	columns: 6, // optional - default 6
	alignment: 'bottom-right', // optional - default 'default' (same as 'center')
	mirrorType: 'both', // optional - default 'none'
	content: elements, // optional -default ''
});
```

... and the elements tweaked in CSS

***
![ZStack-Pattern-Maker, example of usage](/ZStack/ZStack_PatternMaker.png)


<details>
 <summary><b>License<b></summary>
MIT License

Copyright (c) 2023 BarbWire-1

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
SOFTWARE..</br>
    </details>