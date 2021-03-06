import { sleep } from './utils';
import { get, pause } from './state'

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
interface KanyeResponse {
    quote: string
}

const cloneNode = function makeCloneNode() {
    const enum source { kanyeRest, dataJokes };
    let content: Iterator<string, string> = [].values();
    let currentSource = source.kanyeRest;
    const setContent = function makeSetContent(){
        const getDadJokesUrl = () => 'https://icanhazdadjoke.com/search?page='+ Math.round(Math.random() * 15);
        const kanyeRestUrl = 'https://api.kanye.rest';
        return async function setContent(){
            const url = currentSource === source.dataJokes ? getDadJokesUrl() : kanyeRestUrl;
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' },
                method: 'GET'
            })
            if(!response.ok) return content = ['error fetching content'].values();
            const json = await response.json() as (JokeResponse | KanyeResponse);
            if('results' in json){
                return content = json.results.map(({joke}) => joke).values();
            }
            return content = [json.quote].values();
        }
    }();
    setContent();

    void function setDropwDownHandler(){
        const dropdown: HTMLSelectElement = document.querySelector('select')!;
        dropdown.onchange = function(){
            currentSource = +dropdown.value as source;
            while(content.next().value);
            setContent();
        }
    }();
    
    const template: DocumentFragment = (document.querySelector('template#node')! as HTMLTemplateElement).content;
    return async function cloneNode() {
        const clone = template.firstElementChild!.cloneNode(true) as Element;
        const title = clone.querySelector('span.data-title')!;
        const dataSpan = clone.querySelector('span.node-data')!;
        const {done, value} = content.next();
        if(done) {
            await setContent()
            dataSpan.textContent = content.next().value
        }
        else dataSpan.textContent = value;
        title.textContent = currentSource === source.dataJokes ? 'Dad Joke: ' : 'Kanye Quote: '
        return clone;
    }
}();//end of makeCloneNode

const domLinkedList = function createDOMLinkedList(){
    const toggle = async (element: Element, classes: string[], ms: number) => {
        classes.forEach(c => element.classList.toggle(c));
        await pause();
        await sleep(ms);
        classes.forEach(c => element.classList.toggle(c));
    }

    return new class DOMLinkedList {
        readonly figure: HTMLElement = document.querySelector('figure#linkedList')!;
        readonly head: HTMLElement = this.figure.querySelector('#head')!;
        readonly end: HTMLElement = this.figure.querySelector('.null')!;
        readonly searchContainer: HTMLElement = this.figure.querySelector('#searchResult')!;
        length = 0;

        constructor(){
            this.searchContainer.onclick = e => { 
                e.stopPropagation();
                this.searchContainer.classList.remove('visible');
            }
        }
        * [Symbol.iterator](){
            for(const node of this.figure.children as HTMLCollection){
                if(!get('domIsRunning')) return console.log('not running');
                if(!node.classList.contains('node') || node === this.head) continue;
                yield node as HTMLElement;
            }
        }
        async* [Symbol.asyncIterator](){
            for(const node of this){
                await toggle(node, ['active'], get('speed'));
                yield node
            }
        }
        async insert(target: Element){
            const clone = await cloneNode();
            switch(target){
                case this.head: 
                    this.head.after(clone);
                    await toggle(clone, ['new'], get('speed')* 0.5);
                    break;
                case this.end.previousElementSibling:
                case this.figure: 
                    this.end.before(clone);
                    await toggle(clone, ['new'], get('speed')* 0.5);
                    break;
                default: 
                    for await(const node of this) {
                        if(node === target){
                            node.after(clone);
                            await toggle(clone, ['new'], get('speed')* 1.25);
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
                    await toggle(node, ['remove'], get('speed')* 1.25);
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
                    return this.searchContainer.firstElementChild!.textContent = node.querySelector('span.node-data')!.textContent;
                }
            }
        }
        async sort(func: (node: HTMLElement, next: HTMLElement) => boolean){
            for(let last = this.length - 1; last > 0; last--){
                let i = 0;
                for(const node of this as any) {
                    if(i++ > last) break;
                    const nextNode = node.nextElementSibling;
                    toggle(node, ['active'], get('speed'));
                    await toggle(nextNode, ['new'], get('speed'));
                    const nextSpan = nextNode.querySelector('span');
                    if(nextSpan && func(node, nextNode)){
                        const span = node.querySelector('span');
                        const temp = span.textContent;
                        span.textContent = nextSpan.textContent;
                        nextSpan.textContent = temp;
                        toggle(node, ['new'], get('speed')* 1.25);
                        await toggle(nextNode, ['active'], get('speed')* 1.25);
                    }
                }
            }
        }
    }//end of DOMLinkedList 
}();// end of createDOMLinkedList

export default domLinkedList;
