import { ZStackGrid } from './ZStack/index.js';
import { eventHandlers } from './ZStack/eventHandlers.js';

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

//zStackGrid.addInnerHTML(append-any-other-elements);

// -------------------------------------------------------------------------------------TESTING
// get the used handlers from evetHandlers(el)
const {
	handleAlignment,
	handleMirrorType,
	handleNumColsInput,
	handleNumRowsInput,
	handleHueRange,
} = eventHandlers(zStackGrid);

// Event Delegation
const controlPanel = document.getElementById('control-panel');
controlPanel.addEventListener('click', handleControlPanelClick);
controlPanel.addEventListener('input', handleControlPanelInput);

function handleControlPanelClick(e) {
	const targetId = e.target.id;

	switch (targetId) {
		case 'style-Btn':
			handleAlignment(e);
			break;
		case 'mirror-Btn':
			handleMirrorType(e);
			break;
	}
}

function handleControlPanelInput(e) {
	const targetId = e.target.id;

	switch (targetId) {
		case 'hueRange':
			handleHueRange(e);
			break;
		case 'numColsInput':
			handleNumColsInput(e); // currently max 15
			break;
		case 'numRowsInput':
			handleNumRowsInput(e); // currently max 15
			break;
	}
}
