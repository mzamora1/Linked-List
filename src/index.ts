import linkedList from './domLinkedList';
import sorter from './sort';
import LinkedList, { LinkedListNode } from './linkedList';
import './style.css';
import navHandler, { refresh } from './canvasLinkedList';
import { sleep } from './helpers';
import('particles.js').then((particles) => {
    interface pjsWindow extends Window {
        pJSDom?: any;
        particlesJS?: any;
    }
    const global: pjsWindow = window;
    global.particlesJS.load('particles', 'particles.json');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                console.log('paused')
                global.pJSDom[0].pJS.particles.move.enable = false;
            } else {
                global.pJSDom[0].pJS.particles.move.enable = true;
                global.pJSDom[0].pJS.fn.particlesRefresh();
            }
        })
    }, { root: null, rootMargin: '0px', threshold: 0.75 });
    observer.observe(linkedList.figure);
})
//sorter;
 
const sortNav: HTMLElement = document.querySelector('nav#sortNav')!;
window.onload = () => refresh();
sortNav.onclick = navHandler;

const list = new LinkedList(new LinkedListNode(''));
const head = new LinkedListNode('sosnoh');
console.log(head, list);


const isClicked: number[] = [];
const insturctions = linkedList.figure.querySelector('#instructions')!;
const nav = document.querySelector('nav')!,
    navButtons = Array.from(nav.children) as HTMLButtonElement[];
const getActiveButton = () => navButtons.find(element => element.classList.contains('active'))!;

navButtons[0].classList.add('active');
insturctions.classList.add('visible');
insturctions.children[0].classList.add('visible');

nav.onclick = function(this: any, { target }) {
    if(target === this) return;

    const oldActive = getActiveButton();
    if(linkedList.length === 0 && oldActive === navButtons[0]) return;

    linkedList.searchContainer.classList.remove('visible');
    insturctions.classList.remove('visible');

    oldActive.classList.remove('active');
    const activeBtn = target as HTMLButtonElement;
    activeBtn.classList.add('active');

    linkedList.isRunning = false;
    
    const oldIndex = navButtons.indexOf(oldActive);
    insturctions.children[oldIndex].classList.remove('visible');

    const newIndex = navButtons.indexOf(activeBtn);
    if(isClicked.includes(newIndex)) return;
    isClicked.push(newIndex);
    insturctions.classList.add('visible');
    insturctions.children[newIndex].classList.add('visible');
} 


linkedList.figure.onclick = async function(this: any, ev) {
    if(linkedList.isRunning) return;
    if(insturctions.classList.contains('visible')){
        return insturctions.classList.remove('visible');
    }
    const target = (ev.composedPath() as HTMLElement[]).find(element => element.classList.contains('node') || element === this)!;
    linkedList.isRunning = true;
    switch(getActiveButton()){
        case navButtons[0]: await linkedList.insert(target); break;
        case navButtons[1]: await linkedList.delete(target); break;
        case navButtons[2]: await linkedList.search(target); break;
        case navButtons[3]: await linkedList.sort((node, next) => {
                if(document.body.clientWidth > 800){
                    return node.clientWidth > next.clientWidth;
                }
                else {
                    const firstData = node.querySelector('.node-data')!.textContent!, 
                        secondData = next.querySelector('.node-data')!.textContent!;
                    return firstData.split(' ').length > secondData.split(' ').length;
                }
            });
    }
    linkedList.isRunning = false;
}


