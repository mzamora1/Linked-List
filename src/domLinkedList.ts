import { sleep } from './helpers';

const toggle = async (element: Element, classes: string[], ms: number) => {
    classes.forEach(c => element.classList.toggle(c));
    await sleep(ms);
    classes.forEach(c => element.classList.toggle(c));
}

interface Joke {
    id: string;
    joke: string;
}

interface JokeResponse {
    current_page: number;
    limit: 20;
    next_page: 11;
    previous_page: number;
    results: Joke[];
    search_term: string;
    status: number;
    total_jokes: number;
    total_pages: number;
}

let content: IterableIterator<Joke>, speed = 700;
const template: DocumentFragment = (document.querySelector('template#node')! as HTMLTemplateElement).content;


const setContent = () => {
    return fetch('https://icanhazdadjoke.com/search?page='+ Math.round(Math.random() * 15), {
        headers: {
            'User-Agent': 'Linked List Visualization (https://github.com/mzamora1/repo)',
            'Accept': 'application/json'
        },
        method: 'GET'
    }).then(res => res.json())
    .then(({ results }: JokeResponse) => {
        return content = results.values()
    });
}
setContent();

const speedSlider: HTMLInputElement = document.querySelector('#speed')!;
speedSlider.onchange = function({ target }) {
    speed = +(target as HTMLInputElement).value;
}

const cloneNode = () => {
    const clone = template.firstElementChild!.cloneNode(true) as Element;
    const span = clone.querySelector('span')!;
    const {done, value} = content.next();
    if(done) setContent()
        .then(_ => span.textContent = content.next().value.joke);
    else span.textContent = value.joke;
    return clone;
}


class DOMLinkedList {
    readonly figure: HTMLElement = document.querySelector('figure#linkedList')!;
    readonly head: HTMLElement = this.figure.querySelector('#head')!;
    readonly end: HTMLElement = this.figure.querySelector('.null')!;
    readonly searchContainer: HTMLElement = this.figure.querySelector('#searchResult')!;
    isRunning: boolean = false;
    length: number = 0;
    constructor(){
        this.searchContainer.onclick = e => { 
            e.stopPropagation();
            this.searchContainer.classList.remove('visible');
        }
    }
    * [Symbol.iterator](){
        for(const node of this.figure.children as HTMLCollection){
            if(!this.isRunning) return;
            if(!node.classList.contains('node') || node === this.head) continue;
            yield node as HTMLElement;
        }
    }
    async* [Symbol.asyncIterator](){
        for(const node of this){
            await toggle(node, ['active'], speed);
            yield node as HTMLElement;
        }
    }
    async insert(target: Element){
        const clone = cloneNode();
        switch(target){
            case this.head: 
                this.head.after(clone);
                await toggle(clone, ['new'], speed * 0.5);
                break;
            case this.end.previousElementSibling:
            case this.figure: 
                this.end.before(clone);
                await toggle(clone, ['new'], speed * 0.5);
                break;
            default: 
                for await(const node of this) {
                    if(node === target){
                        node.after(clone);
                        await toggle(clone, ['new'], speed * 1.25);
                        break;
                    } 
                }
        }
        this.length++;
    }
    async delete(target: Element){
        if(this.head.nextElementSibling === this.end) return;
        if(target === this.head) target = this.head.nextElementSibling!;
        else if(target === this.figure) target = this.end.previousElementSibling!;
        for await(const node of this) {
            if(node === target){
                await toggle(node, ['remove'], speed * 1.25);
                node.remove();
                break;
            } 
        }
        this.length--;
    }
    async search(target: Element | null){
        switch(target){
            case this.head: target = this.head.nextElementSibling; break;
            case this.end: target = this.end.previousElementSibling; break;
            case this.figure: target = null; break;
        } 
        for await(const node of this) {
            if(node === target){
                this.searchContainer.classList.add('visible');
                return this.searchContainer.firstElementChild!.textContent = node.querySelector('span')!.textContent;
            }
        }
    }
    async sort(func: (node: HTMLElement, next: HTMLElement) => boolean){
        for(let last = this.length - 1; last > 0; last--){
            let i = 0;
            for(const node of this as any) {
                if(i++ > last) break;
                const nextNode = node.nextElementSibling;
                toggle(node, ['active'], speed);
                await toggle(nextNode, ['new'], speed);
                const nextSpan = nextNode.querySelector('span');
                if(nextSpan && func(node, nextNode)){
                    const span = node.querySelector('span');
                    const temp = span.textContent;
                    span.textContent = nextSpan.textContent;
                    nextSpan.textContent = temp;
                    toggle(node, ['new'], speed * 1.25);
                    await toggle(nextNode, ['active'], speed * 1.25);
                }
            }
        }
    }
}

const linkedList = new DOMLinkedList();
export default linkedList;
