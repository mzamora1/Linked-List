import './style.css';
import { set, get } from './state'
import { make } from './utils'
import linkedList from './domLinkedList';
import startCanvas, { figure as sortFigure } from './canvasLinkedList';
import('particles.js').then((particles) => {
    interface pjsWindow extends Window{
        pJSDom?: any;
        particlesJS?: any;
    }
    const global: pjsWindow & typeof globalThis = window;
    global.particlesJS.load('particles', 'particles.json');
    const observer = new IntersectionObserver(entries => {
        if(!global.pJSDom[0]?.pJS) return;
        entries.forEach(entry => {
            if(entry.isIntersecting){
                global.pJSDom[0].pJS.particles.move.enable = false;
                console.count('paused')
            } else {
                global.pJSDom[0].pJS.particles.move.enable = true;
                global.pJSDom[0].pJS.fn.particlesRefresh();
            }
        })
    }, { root: null, rootMargin: '0px', threshold: 0.75 });
    observer.observe(linkedList.figure);
});


void function setGlobalHandlers(){
    void function setSpeedInputHandler(){
        const speedSlider: HTMLInputElement = document.querySelector('#speed')!;
        speedSlider.onchange = () => set('speed', +speedSlider.value);
    }();

    void function setBarInputHandler() {
        const barInput = document.querySelector('#bar-input')! as HTMLInputElement;
        barInput.onchange = function() {
            set('numOfBars', +barInput.value);
            if(get('algorithm') !== null) startCanvas();
        }
    }();

    const makeForEach = make('forEach');
    const show = makeForEach('add', 'visible'),
        hide = makeForEach('remove', 'visible'),
        activate = makeForEach('add', 'active'),
        deactivate = makeForEach('remove', 'active'),
        findActiveIndex = make('findIndex')('contains', 'active');
    const sortInput = document.querySelector('#algorithms')!;
    const sortInstructions = document.querySelector('#sortInstructions')!;

    void function setAlgorithmInputHandler(){
        const sortButtons = sortInput.querySelector<HTMLElement>('#sortContainer')!;
        sortButtons.onclick = ({ target }) => {
            if(target === sortButtons) return;
            hide(sortInstructions);

            const indexOfOldActive = findActiveIndex(...sortButtons.children)
            if(indexOfOldActive !== -1) deactivate(sortButtons.children[indexOfOldActive]);

            const newActiveBtn = target as HTMLButtonElement;
            activate(newActiveBtn);
            set('algorithm', findActiveIndex(...sortButtons.children));

            startCanvas();
        }
    }();

    void function setMainHandlers() {
        const apiInput = document.querySelector('#api')!;
        const barInput = document.querySelector<HTMLInputElement>('#bars')!;
        const insturctions = linkedList.figure.querySelector('#mainInstructions')!;
        const nav = document.querySelector<HTMLElement>('nav')!;

        void function setNavHandler() {
            const isClicked: number[] = [];
            const sortButton = nav.children[3] as HTMLButtonElement;

            sortButton.onclick = () => {
                hide(linkedList.figure);
                show(sortFigure, sortInput, sortInstructions, barInput);
            }

            activate(nav.children[0]);
            show(insturctions, insturctions.children[0]);

            nav.onclick = ({ target }) => {
                if(target === nav) return;

                set('isPaused', false);

                if(target !== sortButton) {
                    show(linkedList.figure);
                    hide(sortFigure, sortInput, barInput);
                }
                
                const oldActiveIndex = findActiveIndex(...nav.children);
                //if list is empty and insert btn was active then dont change active btn except if user clicked on sort btn
                if(linkedList.length === 0 && oldActiveIndex === 0 && target !== sortButton) return;

                hide(linkedList.searchContainer, insturctions, insturctions.children[oldActiveIndex], apiInput);
                deactivate(nav.children[oldActiveIndex]);

                set('domIsRunning', false);
                set('canvasIsRunning', false);
                
                const activeBtn = target as HTMLButtonElement;
                activate(activeBtn);
                if(activeBtn === nav.children[0]){
                    show(apiInput)
                }
                
                const newIndex = findActiveIndex(...nav.children);
                if(target === sortButton || isClicked.includes(newIndex)) return;
                isClicked.push(newIndex);
                show(insturctions, insturctions.children[newIndex]);
            }
        }();//end of setNavHandler

        void function setLinkedListHandler () {
            const findTarget = make('find')('contains', 'node', element => element === linkedList.figure);
            linkedList.figure.onclick = async e => {
                if(get('domIsRunning')) return;
                if(insturctions.classList.contains('visible')) return hide(insturctions);
                const target = findTarget(...e.composedPath() as Element[]);
                set('domIsRunning', true);
                switch(findActiveIndex(...nav.children)){
                    case 0: await linkedList.insert(target); break;
                    case 1: await linkedList.delete(target); break;
                    case 2: await linkedList.search(target); break;
                    case 3: await linkedList.sort((node, next) => {
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
                set('domIsRunning', false);
            }
        }();//end of setLinkedListHandler

    }();//end of setMainHandlers

}();//end of setGlobalHandlers
