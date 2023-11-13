import { ZStackGrid, eventHandlers } from './ZStack/index.js';

// USAGE - INIT
// the HTMLelements to appent into the components slot as template string
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
	numRows: 6, // optional - default 6
	numCols: 6, // optional - default 6
	alignment: 'bottom-right', // optional - default 'default' (same as 'center')
	mirrorType: 'both', // optional - default 'none'
	content: elements,
});

// zStackGrid.addInnerHTML(elements); // add any more eles into each stack

// -------------------------------------------------------------------------------------TESTING
// Event Delegation
const {
    handleClick,
    handleInput
} = eventHandlers(zStackGrid);


const controlPanel = document.getElementById('control-panel');
controlPanel.addEventListener('click', handleClick);
controlPanel.addEventListener('input', handleInput);
