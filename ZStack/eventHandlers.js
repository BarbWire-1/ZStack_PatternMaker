
import { createEventCallbacks } from "./createEventCallbacks.js";


/**
 * Factory funcion to provide the supported eventHandlers
 * @param {*} element The element the handlers are applied to
 * @returns handler Functions:  onClick, onInput
 */
export function createEventHandlers(element) {
const {
	handleAlignment,
	handleMirrorType,
	handleHueRange,
	handleNumColsInput,
	handleNumRowsInput,
} = createEventCallbacks(element);

    function onClick(e) {
        const targetClass = e.target.classList;

        switch (true) {
            case targetClass.contains('style-btn'):
                handleAlignment(e);
                break;
            case targetClass.contains('mirror-btn'):
                handleMirrorType(e);
                break;
        }
    }

    function onInput(e) {
        const targetClass = e.target.classList;

        switch (true) {
            case targetClass.contains('hue-range'):
                handleHueRange(e);
                break;
            case targetClass.contains('num-cols-input'):
                handleNumColsInput(e); // currently max 15
                break;
            case targetClass.contains('num-rows-input'):
                handleNumRowsInput(e); // currently max 15
                break;
        }
    }
    return { onClick, onInput}
}
