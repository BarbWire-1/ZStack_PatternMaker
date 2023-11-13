// TODO check transform for evtl enable transform in css so needs to concatenate
/**
 * This component actually only creates a slot
 * Its only purpose is to set slotted children's positions
 * in a way, that all children take the same passed positioning.
 * In order to achieve this, it has a custom attribute "alignment"
 * and an associated object holding the style-settings.
 *
 * The children are all stacked.
 * The z-index can be changed in global CSS
 */

import { STYLES } from './STYLES.js';

export class ZStack extends HTMLElement {
	#styles;
	#alignment;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.#alignment = 'default'; // get the alignment set in HTML/JS
		this.#styles = Object.freeze(STYLES);
		this.#updateAlignment();
    }

	/* as this would not work with dot-notation, I stick with a getter/setter */

	/*
    static get observedAttributes() {
        return ["alignment"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "alignment" && oldValue !== newValue) {
            this.#alignment = newValue;
            this.#updateAlignment();
        }
    }
    */

	connectedCallback() {
		const shadow = this.shadowRoot;
		const style = this.#styles[this.#alignment];
		const alignmentStyles = this.#getStyleString(style);

		//console.log(alignmentStyles);

		shadow.innerHTML = `
        <style>
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            :host * {
                box-sizing: border-box;
                margin: 0;
                padding:0;
                border: none;
                outline: none;
            }

            /* Apply alignment styles to the children */
            ::slotted(*) {
                position: absolute !important;
                ${alignmentStyles} /* variable holding the css-string alignment-attribute (ONLY necessary for set in z-stack inline)*/
            }
        </style>
        <slot></slot>
        `;
	}

	get alignment() {
		return this.#alignment;
	}

    set alignment(value) {

		if (!(value in this.#styles)) {
			console.warn(
				'Please choose a valid alignment style!\nHave a look at the keys in the alignmentStyles property'
			);
			return;
		}
		if (value !== this.#alignment) {
			this.#alignment = value;
			this.setAttribute('alignment', value); // need to sync attribute and property manually here
			this.#updateAlignment();
		}
	}

	styleKeys() {
		return Object.keys(this.#styles);
	}

	/**
	 * apply the new alignment style to all children inside the slot
	 * if of type ELEMENT_NODE
	 */
	#updateAlignment() {
		const slot = this.shadowRoot.querySelector('slot');
		const assignedNodes = slot?.assignedNodes();

		// Apply alignment styles to the children
		assignedNodes?.forEach((node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				node.style = this.#getStyleString();
			}
		});
	}

	/**
	 *
	 * Function to create a string from the chosen alignment, looking up in styles object
	 * @returns the style-string to apply to all children holding top, left, transform: translate
	 */
	#getStyleString() {
		const style = this.#alignment;
		if (style in this.#styles) {
			const { top, left, transform } = this.#styles[style];
			return `top: ${top}; left: ${left}; transform: ${transform};`;
		}
	}

	/**
	 *
	 * @param {*} string HTML templateString with elements to append
	 */
	appendChildren(string) {
		this.innerHTML += string;
	}
}

customElements.define('z-stack', ZStack);
