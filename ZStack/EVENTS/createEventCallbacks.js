// TODO adjust class: extract common behaviour and import it instead of adding as method?
import { MIRRORTYPES } from '../index.js';
/**
 * Factory function to provide the different eventCallbacks
 * @param {*} element the element to apply the eventHandling to
 * @returns an object of all eventHandler functions
 */
export function createEventCallbacks(element) {
    const alignments = element.styleKeys;

	// Indices for cycling
	let mirrorIndex = 0;
	let styleIndex = 0;

	// cycles through styleKeys (for alignment) of the el
	function cycleAlignment(e) {
		styleIndex = (styleIndex + 1) % alignments.length;
		const alignment = alignments[styleIndex];

		element.alignment = alignment; // set new alignment
		element.mirrorTiles(); // re-apply current mirroring
		e.target.innerText = `alignment: "${alignment}"`;
	}

	// cycles through mirroring types
	function cycleMirrorType(e) {
		mirrorIndex = (mirrorIndex + 1) % 5;
		const mirrorType = MIRRORTYPES[mirrorIndex];

		element.mirrorType = mirrorType;
		element.mirrorTiles();
		e.target.innerHTML = `mirror: "${mirrorType}"`;
	}

	// changes number of columns and replaces the grid with new grid
	function updateNumCols(e) {
		element.numCols = +e.target.value;
	}
	// changes number of rows and replaces the grid with new grid
	function updateNumRows(e) {
		element.numRows = +e.target.value;
	}
	// TODO add more possible filters in a dropdown and switch in here? Or in input?
	// applies the recieved value for a hue-rotate filter
	function updateHueRange(e) {
		const hueValue = e.target.value;
		element.container.style.filter = `hue-rotate(${hueValue}deg)`;
	}
	return {
		handleAlignment: cycleAlignment,
		handleMirrorType: cycleMirrorType,
		handleNumColsInput: updateNumCols,
		handleNumRowsInput: updateNumRows,
		handleHueRange: updateHueRange,
	};
}
