import HSL, { sleep } from './utils';
import sortFuncs from './sort';
import Bar, { drawFrame } from './style'
import LinkedList from './linkedList';
import { get, set, algorithms, pause } from './state'

export const figure: HTMLElement = document.querySelector('figure.canvasContainer')!
const linkedList = new LinkedList<Bar>();

const refresh = function makeRefresh(canvas: HTMLCanvasElement, figure: HTMLElement){
    return function refresh() {
        set('canvasIsRunning', false);
        linkedList.clear();
        const {width, height} = figure.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        for(let i = 0; i < get('numOfBars'); i++){
            linkedList.add(new Bar(canvas, new HSL(183, 76.5)));
        }
    }
}(figure.querySelector('canvas')!, figure);


const startCanvas = function makeStartCanvas() {
    const sortInstructions = document.querySelector('#sortInstructions')!;
    const startDelay = 1500;
    let timeOfLastStart = 0;
    return async function startCanvas(): Promise<void> {
        if(Date.now() - timeOfLastStart <= startDelay) return;
        timeOfLastStart = Date.now();

        sortInstructions.classList.remove('visible');
        refresh();
        drawFrame(linkedList);

        await sleep(startDelay);
        await pause();

        set('canvasIsRunning', true)
        const sortFunc = get('algorithm') === algorithms.mergeSort ? sortFuncs.mergeSort : sortFuncs.bubbleSort;
        if(sortFunc.name !== 'mergeSort') {
            const draw = () => {
                if(!get('canvasIsRunning')) return console.log('stopped early');
                drawFrame(linkedList);
                requestAnimationFrame(draw);
            }
            draw();
        }
        
        await sortFunc(linkedList);

        if(!get('canvasIsRunning')) return;
        set('canvasIsRunning', false);
        drawFrame(linkedList);
    }
}();

export default startCanvas



