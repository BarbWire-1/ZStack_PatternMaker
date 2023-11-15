import { ZStackGrid, createEventHandlers } from './ZStack/index.js';

window.onload = e => {
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
        rows: 6, // optional - default 6
        columns: 6, // optional - default 6
        alignment: 'bottom-right', // optional - default 'default' (same as 'center')
        mirrorType: 'both', // optional - default 'none'
        content: elements,
    });



    // -------------------------------------------------------------------------------------TESTING
    // Event Delegation
    const { onClick, onInput } = createEventHandlers(zStackGrid);

    const controlPanel = document.getElementById('control-panel');
    controlPanel.addEventListener('click', onClick);
    controlPanel.addEventListener('input', onInput);

    // testing to include svg
    // const nonRootSvg = document.querySelectorAll('svg :not(svg)');
    // console.log(nonRootSvg)
    // zStackGrid.alignment = 'bottom-right';// ok
    //zStackGrid.mirrorType = 'both';// ok
    //zStackGrid.content = `<div class="square one"></div>`// ok
    //zStackGrid.addContent(`<div class="square one"></div>`);// ok
}