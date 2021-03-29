const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

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

interface Colors {
    red: 'rgb(255,0,0)',
    blue: 'rgb(0,0,255)',
    purple: 'rgb(255,0,255)',
    yellow: 'rgb(213,222,51)'
}

const colors: Readonly<Colors> = {
    red: 'rgb(255,0,0)',
    blue: 'rgb(0,0,255)',
    purple: 'rgb(255,0,255)',
    yellow: 'rgb(213,222,51)'
}

const map = (value: number, a: number, b: number, c: number, d: number) => {
    const temp = (value - a) / (b - a); // first map value from (a..b) to (0..1)
    return Math.round(c + temp * (d - c)); // then map it from (0..1) to (c..d) and return it
}


export { sleep, addElement, colors, map }