// TODO adjust class: extract common behaviour and import it instead of adding as method?
import { MIRRORTYPES } from '../index.js';
/**
 * Factory function to provide the different eventCallbacks
 * @param {*} ele the element to apply the eventHandling to
 * @returns an object of all eventHandler functions
 */
export function createEventCallbacks(ele) {
	const alignments = ele.styleKeys;

	// Indices for cycling
	let mirrorIndex = 0;
	let styleIndex = 0;

	function cycleAlignment(e) {
		styleIndex = (styleIndex + 1) % alignments.length;
		const alignment = alignments[styleIndex];

		ele.alignment = alignment; // set new alignment
		ele.mirrorTiles(); // re-apply current mirroring
		e.target.innerText = `alignment: "${alignment}"`;
	}

	function cycleMirrorType(e) {
		mirrorIndex = (mirrorIndex + 1) % 5;
		const mirrorType = MIRRORTYPES[mirrorIndex];

		ele.mirrorType = mirrorType;
		ele.mirrorTiles();
		e.target.innerHTML = `mirror: "${mirrorType}"`;
	}

	// updates and replaces grid with new grid
	function updateNumCols(e) {
		ele.columns = +e.target.value;
	}

	// updates and replaces grid with new grid
	function updateNumRows(e) {
		ele.rows = +e.target.value;
	}

	// TODO add more possible filters in a dropdown and switch in here? Or in input?
	function updateHueRange(e) {
		const hueValue = e.target.value;
		ele.container.style.filter = `hue-rotate(${hueValue}deg)`;
	}

	return {
		handleAlignment: cycleAlignment,
		handleMirrorType: cycleMirrorType,
		handleNumColsInput: updateNumCols,
		handleNumRowsInput: updateNumRows,
		handleHueRange: updateHueRange,
	};
}
