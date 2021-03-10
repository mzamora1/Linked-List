const sleep = ms => new Promise(res => setTimeout(res, ms));
const toggle = async (element, classes, func, ms) => {
    classes.forEach(c => element.classList.toggle(c));
    if(func) func();
    await sleep(ms);
    classes.forEach(c => element.classList.toggle(c));
}

let content = [].values(), speed = 700;
const template = document.querySelector('template#node').content;


const setContent = () => {
    return fetch('https://icanhazdadjoke.com/search?page='+ Math.round(Math.random() * 15), {
        headers: {
            'User-Agent': 'Linked List Visualization (https://github.com/mzamora1/repo)',
            'Accept': 'application/json'
        },
        method: 'GET'
    }).then(res => res.json())
    .then(json => content = json.results.values());
}
setContent();

document.querySelector('#speed').onchange = function() {
    speed = this.value;
}

const cloneNode = () => {
    const clone = template.firstElementChild.cloneNode(true);
    const span = clone.querySelector('span');
    const {done, value} = content.next();
    if(done) setContent()
        .then(_ => span.textContent = content.next().value.joke);
    else span.textContent = value.joke;
    return clone;
}


export default new class DOMLinkedList {
    constructor(){
        this.figure = document.querySelector('figure#linkedList');
        this.head = this.figure.querySelector('#head');
        this.end = this.figure.lastElementChild;
        this.searchContainer = this.figure.querySelector('#searchResult');
        this.isRunning = false;
        this.length = 0;
        
        this.searchContainer.onclick = function(e) { 
            e.stopPropagation();
            this.classList.remove('visible');
        }
    }
    * [Symbol.iterator](){
        for(const node of this.figure.children){
            if(!this.isRunning) return;
            if(!node.classList.contains('node') || node === this.head) continue;
            yield node;
        }
    }
    async* [Symbol.asyncIterator](){
        for(const node of this){
            await toggle(node, ['active'], null, speed);
            yield node;
        }
    }
    async insert(target){
        const clone = cloneNode();
        switch(target){
            case this.head: 
                await toggle(clone, ['new'], () => this.head.after(clone), speed * 0.5); break;
            case this.end, this.end.previousElementSibling:
            case this.figure: 
                await toggle(clone, ['new'], () => this.end.before(clone), speed * 0.5); break;
            default: 
                for await(const node of this) {
                    if(node === target){
                        await toggle(clone, ['new'], () => node.after(clone), speed * 1.25);
                        break;
                    } 
                }
        }
        this.length++;
    }
    async delete(target){
        const remove = async (element, delay) => {
            element.classList.add('remove');
            await sleep(delay);
            element.remove();
        }
        if(this.head.nextElementSibling === this.end) return;
        switch(target){
            case this.head: 
                await remove(this.head.nextElementSibling, speed * 0.5); break;
            case this.end, this.figure: target = this.end.previousElementSibling;
            default: 
                for await(const node of this) {
                    if(node === target){
                        await remove(node, speed * 1.25);
                        break;
                    } 
                }
        }
        this.length--;
    }
    async search(target){
        switch(target){
            case this.head: target = this.head.nextElementSibling; break;
            case this.end: target = this.end.previousElementSibling; break;
            case this.figure: target = null; break;
        } 
        for await(const node of this) {
            if(node === target){
                this.searchContainer.classList.add('visible');
                this.searchContainer.firstElementChild.textContent = node.querySelector('span').textContent;
                return;
            }
        }
    }
    async sort(func){
        for(let last = this.length - 1; last > 0; last--){
            let i = 0;
            for(const node of this) {
                if(i++ > last) break;
                const nextNode = node.nextElementSibling;
                toggle(node, ['active'], null, speed);
                await toggle(nextNode, ['new'], null, speed);
                const nextSpan = nextNode.querySelector('span');
                if(nextSpan && func(node, nextNode)){
                    const span = node.querySelector('span');
                    const temp = span.textContent;
                    span.textContent = nextSpan.textContent;
                    nextSpan.textContent = temp;
                    toggle(node, ['new'], null, speed * 1.25);
                    await toggle(nextNode, ['active'], null, speed * 1.25);
                }
            }
        }
    }
}
