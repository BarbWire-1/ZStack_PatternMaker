
import { eventCallbacks } from "./eventCallbacks.js";



export function eventHandlers(element) {
const {
	handleAlignment,
	handleMirrorType,
	handleHueRange,
	handleNumColsInput,
	handleNumRowsInput,
} = eventCallbacks(element);

    function handleClick(e) {
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

    function handleInput(e) {
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
    return { handleClick, handleInput}
}
