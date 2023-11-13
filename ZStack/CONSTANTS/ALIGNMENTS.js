export const ALIGNMENTS = {
    center: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    "top-left": {
        top: "0",
        left: "0",
        transform: "translate(0, 0)"
    },
    "top-center": {
        top: "0",
        left: "50%",
        transform: "translate(-50%, 0)"
    },
    "top-right": {
        top: "0",
        left: "100%",
        transform: "translate(-100%, 0)"
    },
    "center-right": {
        left: "100%",
        top: "50%",
        transform: "translate(-100%, -50%)"
    },
    "bottom-right": {
        top: "100%",
        left: "100%",
        transform: "translate(-100%, -100%)"
    },
    "bottom-center": {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -100%)"
    },
    "bottom-left": {
        top: "100%",
        left: "0",
        transform: "translate(0, -100%)"
    },
    "center-left": {
        top: "50%",
        left: "0",
        transform: "translate(0, -50%)"
    },
    default: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
};