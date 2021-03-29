import { sleep, addElement, map } from './helpers';
import LinkedList, {LinkedListNode, NodeOrNull} from './linkedList';

type HueSatLight = { hue: number, saturation: number, lightness: number };
export class HSL implements HueSatLight {
    color = '';
    private startColor;
    constructor(
        public hue: number,
        public saturation: number,
        public lightness = 0,
    ){
        this.startColor = this.setColor({hue, saturation, lightness});
    }

    setColor({hue, saturation, lightness}: HueSatLight) {
        return this.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    reset(){
        return this.color = this.startColor;
    }
}

const numOfBars = 50;

class Bar {
    width = 0;
    height = 0;
    x = 0;
    readonly hsl: HSL;
    private readonly random: number;
    
    constructor(canvas: HTMLCanvasElement, color: Omit<HueSatLight, "lightness">){
        this.random = Math.random();
        this.resize(canvas);
        const lightness = map(this.width, 0, canvas.width, 5, 95);
        this.hsl = new HSL(color.hue, color.saturation, lightness);
    }

    resize(canvas: HTMLCanvasElement){
        this.width = this.random * canvas.width;
        this.height = canvas.height / numOfBars;
        this.x = (canvas.width/2) - (this.width/2);
    }
}

interface StyleOptions {
    node: LinkedListNode<Bar>
    next?: LinkedListNode<Bar>
    colors?: [HueSatLight, HueSatLight?]
    reset?: boolean
    ms?: number
    drawFrame?: () => void
}

const container: HTMLElement = document.querySelector('section')!,
    figure = addElement(container, 'figure', {className: 'canvasContainer'}),
    canvas = addElement(figure, 'canvas', {className: 'canvas'}) as HTMLCanvasElement,
    ctx = canvas.getContext('2d')!,
    linkedList = new LinkedList<Bar>();

let isRunning = false;

const drawFrame = (list: LinkedList<Bar>) => {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let index = 0;
    for(let bar = list.head; bar !== null; bar = bar.next){
        const { hsl, x, height, width } = bar.data
        ctx.fillStyle = hsl.color;
        ctx.fillRect(x, height * index++, width, height);
    }
}


export const refresh = async () => {
    linkedList.clear();
    const {width, height} = figure.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    for(let i = 0; i < numOfBars; i++){
        linkedList.add(new Bar(canvas, new HSL(183, 76.5)));
    }
    drawFrame(linkedList);
    await sleep(1000);
}


const style = async ({node, next, colors, reset, drawFrame, ms}: StyleOptions) => {
    if(!isRunning) return;
    if(colors){
        node.data.hsl.setColor(colors[0]);
        next?.data.hsl.setColor(colors[1] ?? colors[0]);
    } 
    drawFrame?.();
    await sleep(ms ?? 5);
    if(!reset) return;
    node.data.hsl.reset();
    next?.data.hsl.reset();
}

type Style = typeof style
type SortFunc = (list: LinkedList<Bar>, style: Style) => Promise<any>


async function startCanvas(sortFunc: SortFunc): Promise<void> {
    await refresh();

    isRunning = true;

    const draw = () => {
        if(!isRunning) return console.log('stopped early');
        drawFrame(linkedList);
        requestAnimationFrame(draw);
    }
    if(sortFunc !== mergeSort) draw();

    await sortFunc(linkedList, style);

    isRunning = false;

    linkedList.forEach(node => node.data.hsl.reset());
    drawFrame(linkedList);
}


const nav: HTMLElement = container.querySelector('nav#sortNav')!,
    navButtons = Array.from(nav.children) as HTMLButtonElement[];
const getActiveButton = () => navButtons.find(element => element.classList.contains('active'))!;

const hsl1 = new HSL(300, 100, 50),
      hsl2 = new HSL(152, 100, 50);


const bubbleSort: SortFunc = async (linkedList, style) => {
    const list = linkedList;
    for(let i = list.length; i > 1; i--){
        let j = 0;
        for(const node of list){
            if(getActiveButton() !== navButtons[1]) return;
            if(++j >= i) break;

            await style({node, next: node.next!, colors:[hsl1, hsl2], reset: true, ms: 100});
            
            if(node.data.width > node.next!.data.width){
                list.swap(node, node.next!);
                await style({node, next: node.next!, colors:[hsl2, hsl1], reset: true, ms: 130});
            }
        }
    }
}


const mergeSort: SortFunc = async (list, style) => {
    const getMiddle = (node: NodeOrNull<Bar>) => {
        if(!node) return null;
        let slow = node, fast = node;
        while(fast.next?.next){
            slow = slow.next!;
            fast = fast.next.next
        }
        return slow;
    }
    const merge = async (a: LinkedListNode<Bar>, b: LinkedListNode<Bar>) => {
        if(!a) return b;
        if(!b) return a;
        let result: NodeOrNull<Bar> = null; 
        const drawAB = () => drawFrame(new LinkedList<Bar>().join(a, b));
        if(a.data.width <= b.data.width){ 
            result = a;
            await style({node: result, colors: [hsl1], drawFrame: drawAB ,ms: 70, reset: true});
            result.next = await merge(a.next!, b);
        }
        else {
            result = b;
            await style({node: result, colors: [hsl1], drawFrame: drawAB ,ms: 70, reset: true});
            result.next = await merge(a, b.next!)
        }
        return result;
    }
    const mergeSort = async (node: LinkedListNode<Bar>): Promise<LinkedListNode<Bar>> => {
        if(!node?.next) return node;
        const left = node;
        const middle = getMiddle(node)!;
        const right = middle.next!;
        middle.next = null;
        await style({node: middle, colors: [hsl2], drawFrame: ()=> drawFrame(new LinkedList<Bar>().join(node)), ms: 250})
        return await merge(await mergeSort(left), await mergeSort(right));
    }

    const head = await mergeSort(list.head!);

    if(isRunning){
        list.head = head;
        style({node: list.head, drawFrame: () => drawFrame(new LinkedList<Bar>().join(list.head!))})
        console.log('done!', list)
    }
    else console.log('stopped early');
}


export default async function(this: any, {target}: MouseEvent) {
    if(target === this) return;
    const oldActive = getActiveButton();
    const activeBtn = target as HTMLButtonElement;
    oldActive?.classList.remove('active');
    activeBtn.classList.add('active');
    isRunning = false;

    if(activeBtn === navButtons[0]) await startCanvas(mergeSort);
    else await startCanvas(bubbleSort);
}
