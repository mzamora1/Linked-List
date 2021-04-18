import HSL, { sleep, HueSatLight, map } from './utils';
import LinkedList, { LinkedListNode } from './linkedList';
import { get, pause } from './state'

//represents a bar inside the canvas element
//used in canvasLinkedList.ts
export default class Bar {
    width = 0;
    height = 0;
    x = 0;
    readonly hsl: HSL;
    private readonly random = Math.random();
    
    constructor(canvas: HTMLCanvasElement, color: Omit<HueSatLight, "lightness">){
        this.resize(canvas);
        const lightness = map(this.width, 0, canvas.width, 5, 95);
        this.hsl = new HSL(color.hue, color.saturation, lightness);
    }

    resize({ width, height }: HTMLCanvasElement){
        this.width = this.random * width;
        this.height = height / get('numOfBars');
        this.x = (width/2) - (this.width/2);
    }
}

//used in canvasLinkedList.ts, curryStyle
export const drawFrame = function makeDrawFrame(){
    const canvas = document.querySelector('canvas')!
    const ctx = canvas.getContext('2d')!;

    return function drawFrame(list: LinkedList<Bar>) {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let index = 0;
        for(let bar = list.head; bar !== null; bar = bar.next){
            const { x, height, width } = bar.data
            ctx.fillStyle = bar.data.hsl.color;
            ctx.fillRect(x, height * index++, width, height);
        }
    }
}();

//factory function for styling bars
//used in sort.ts
export const curryStyle = function makeCurry(colors: [HueSatLight, HueSatLight]) { //yum
    return function curryStyle(getTimeOfDelay: () => number, dontReset = false){
        return async function style(node: LinkedListNode<Bar>, next?: LinkedListNode<Bar>, listToDraw?: LinkedList<Bar>) {
            if(!get('canvasIsRunning')) return;
            
            node.data.hsl.setColor(colors[0]);
            next?.data.hsl.setColor(colors[1]);

            const promiseOrFalse = pause();
            if(promiseOrFalse) await promiseOrFalse;

            if(listToDraw) drawFrame(listToDraw);
            await sleep(getTimeOfDelay());

            if(dontReset) return;
            node.data.hsl.reset();
            next?.data.hsl.reset();
        }
    }
//first: purple, second: green
}([new HSL(300, 100, 50), new HSL(152, 100, 50)]);
