import { sleep, addElement, colors } from './helpers';

let numOfBars = 100;
const figure = addElement(document.querySelector('section')!, 'figure', { id: 'sorting' });
const figureChildren = Array.from(figure.childNodes);

class Bar {
    readonly element: HTMLElement;

    constructor(public data: number, index: number){
        this.element = addElement(figure, 'div', { className: 'bar' }); 
        this.update(data, index);
    }
    async update(data: number, index: number, activeColor?: string){
        if(data) this.data = data;
        //else return;
        this.element.style.width = `${this.data}%`;
        this.element.style.transform = `translateY(${( index ?? Array.from(figure.childNodes).indexOf(this.element) ) * this.element.getBoundingClientRect().height}px)`;
        if(activeColor){
            this.element.style.backgroundColor = activeColor;
            await sleep(150);
        }
        this.element.style.backgroundColor = `hsl(${183}, ${76.5}%, ${this.data}%)`;
    }
}

const sorter = new class Sorter {
    readonly figure: HTMLElement = figure;
    bars: Bar[] = [];

    constructor(){
        for(let i = 0; i < numOfBars; i++){
            this.bars.push(new Bar(Math.round(Math.random() * numOfBars), i));
        }
    }
    async swap(a: Bar, b: Bar, aIndex: number, bIndex: number){
        const temp = a.data;
        a.element.style.backgroundColor = colors.purple;
        b.element.style.backgroundColor = colors.yellow;
        await sleep(150)
        a.update(b.data, aIndex, colors.yellow);
        await b.update(temp, bIndex, colors.purple);
    }
    async bubble(func: (node: HTMLElement, next: HTMLElement) => boolean){
        for(let i = this.bars.length - 1; i > 1; i--){
            for(let j = 0; j < i; j++){
                if(func(this.bars[j].element, this.bars[j+1].element)){
                    await this.swap(this.bars[j], this.bars[j+1], j, j+1);
                } else {
                    this.bars[j].element.style.backgroundColor = colors.purple;
                    await sleep(50);
                    this.bars[j].element.style.backgroundColor = `hsl(${183}, ${76.5}%, ${this.bars[j].data}%)`;
                }
            }
        }
        console.log(this.bars)
    }
}
sorter.bubble((bar, next) => {
    return bar.getBoundingClientRect().width > next.getBoundingClientRect().width;
})

export default sorter;