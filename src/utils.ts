export type HueSatLight = { hue: number, saturation: number, lightness: number };

export default class HSL implements HueSatLight {
    color = '';
    constructor(
        readonly hue: number,
        readonly saturation: number,
        readonly lightness = 0,
    ){
        this.setColor({hue, saturation, lightness});
    }
    setColor({hue, saturation, lightness}: HueSatLight) {
        return this.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    reset(){
        return this.color = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const error = (msg?: string) => {
    throw new Error(msg)
}
type Action<T> = T extends 'findIndex'|'find' ? 'contains' : 'add'|'remove'|'toggle';
type Return<T> = T extends 'findIndex' ? number|-1 : 
                 T extends 'find' ? Element : void;
//factory for manipulating element classLists
//used in index.ts
const make = <A extends 'forEach'|'findIndex'|'find'>(arrayAction: A) =>
    <C extends Action<A>>(action:  C , className: string, orFunc?: (element: Element) => boolean) => 
    (...elements: Element[]) => elements[arrayAction](element => element.classList[action](className) || orFunc?.(element)) as Return<A>;

interface ElementOptions {
    textContent?: string;
    className?: string;
    id?: string;
}
const addElement = (parent: HTMLElement, tag: keyof HTMLElementTagNameMap, {textContent, className, id}: ElementOptions) => {
    const newElement = document.createElement(tag);
    if(textContent) newElement.textContent = textContent;
    if(className) newElement.classList.add(className);
    if(id) newElement.id = id;
    parent.append(newElement);
    return newElement;
}

const map = (value: number, a: number, b: number, c: number, d: number) => {
    const temp = (value - a) / (b - a); // first map value from (a..b) to (0..1)
    return Math.round(c + temp * (d - c)); // then map it from (0..1) to (c..d) and return it
}


export { sleep, addElement, map, make, error }


