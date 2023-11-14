import { ALIGNMENTS } from '../index.js';
//TODO - extend zStack?? - hmm...
/**
 * A class to create a grid in a parentElement.
 * Each cell of the grid includes a z-stack element with the given innerHTML (content)
 * number of rows, number of columns, content, alignment of each elelment
 * inside the z-stacks and mirroring of the z-stacks to patterns are settable from JS
 *
 * The z-stacks' childelements are slotted, but can be styled in global
 * Currently ALL transforms set in CSS would be overwritten by the alignment-settings
 */

export class ZStackGrid {
	#mirrorType;
	#alignment;
	#styles;
	#numCols;
	#numRows;
	#content;


	constructor(options) {
		const {
			parentId,
			rows = 6,
			columns = 6,
			alignment = 'default',
			mirrorType = 'none',
			content = '',
		} = options;

		this.container = document.getElementById(parentId);
		this.#numRows = rows;
		this.#numCols = columns;
		this.#alignment = alignment;

		this.#mirrorType = mirrorType;
		this.#styles = ALIGNMENTS;
		this.#content = content;

		this.#createGrid(); // init
	}

	#createGrid() {
		// Set grid-styling for nums/rows on the container
		this.container.style.gridTemplateRows = `repeat(${this.#numRows}, 1fr)`;
		this.container.style.gridTemplateColumns = `repeat(${
			this.#numCols
		}, 1fr)`;

		// Create a prototype and set its properties
        const prototype = document.createElement('z-stack');

		prototype.alignment = this.#alignment;
		prototype.style.setProperty('alignment', this.#alignment);
		prototype.innerHTML = this.#content;

		// Create a DocumentFragment to hold the cloned elements
		const fragment = document.createDocumentFragment();

        // loop over rows/columns to create clones,
        // aplly individual transform for mirroring
		for (let i = 0; i < this.#numRows; i++) {
			for (let j = 0; j < this.#numCols; j++) {
                const stack = prototype.cloneNode(true);

                const flip = this.#getFlipTransformation(stack);
				stack.style.transform += flip;// aplly the current mirroring on stack
				stack.setAttribute('id', `zStack_${i}_${j}`);

                // add classes for later use to mirror the stacks
				if (j % 2 === 1) {
					stack.classList.add('second-stack');
				}

				// each second row
				if (i % 2 === 1) {
					stack.classList.add('second-row');
				}

				fragment.appendChild(stack);

				// Debugging: Output alignment during cloning
				//console.log(`Alignment for ${stack.id}: ${stack.alignment}`);
			}
		}

		// Append the fragment to the container
		this.container.appendChild(fragment);

	}

	/**
	 *
	 * @param {*} string HTML templateString with elements to append
	 */
	addStacksContent(string) {
		[...this.container.children].forEach((child) =>
			child.appendChildren(string)
		);
	}

	mirrorTiles() {
		[...this.container.children].forEach((stack) => {
			stack.style.transform = ''; // reset the transform
			const flip = this.#getFlipTransformation(stack);
			stack.style.transform += flip;
		});
	}

	#getFlipTransformation(stack) {
		const mirror = this.#mirrorType;
		let flip = '';

		const isOddStack = stack.classList.contains('second-stack');
		const isOddRow = stack.classList.contains('second-row');

		if (mirror === 'each' && isOddStack) {
			flip += 'scale(-1, -1)';
		} else {
			if (
				(mirror === 'horizontal' || mirror === 'both') &&
				isOddRow
			) {
				flip += 'scaleY(-1)';
			}

			if (
				(mirror === 'vertical' || mirror === 'both') &&
				isOddStack
			) {
				flip += 'scaleX(-1)';
			}
		}

		return flip;
	}

	get mirrorType() {
		return this.#mirrorType;
	}
	set mirrorType(newValue) {
		this.#mirrorType = newValue;
		this.mirrorTiles();
	}

	get alignment() {
		return this.#alignment;
	}
	set alignment(newValue) {
		this.#alignment = newValue;
		[...this.container.children].forEach(
			(child) => (child.alignment = this.#alignment)
		);
	}

	get styleKeys() {
		return Object.keys(this.#styles);
	}

	get columns() {
		return this.#numCols;
	}
	set columns(newValue) {
		this.#numCols = newValue;
		this.container.innerHTML = '';
		this.#createGrid();
	}

	get rows() {
		return this.#numRows;
	}
	set rows(newValue) {
		this.#numRows = newValue;
		this.container.innerHTML = '';
		this.#createGrid();
	}
	get content() {
		return this.#content;
	}
	set content(newValue) {
		this.#content = newValue;
		[...this.container.children].forEach(
			(child) => (child.innerHTML = newValue)
		);
		//this.#createGrid();
	}
}
