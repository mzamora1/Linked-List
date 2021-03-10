import linkedList from './linkedList.js';
particlesJS.load('particles', 'particles.json');

const isClicked = [];
const insturctions = linkedList.figure.querySelector('#instructions');
const nav = document.querySelector('nav'),
    navButtons = Array.from(nav.children);
const getActiveButton = () => navButtons.find(element => element.classList.contains('active'));

navButtons[0].classList.add('active');
insturctions.classList.add('visible');
insturctions.children[0].classList.add('visible');

nav.onclick = function(e) {
    if(e.target === this) return;

    const oldActive = getActiveButton();
    if(linkedList.length === 0 && oldActive === navButtons[0]) return;

    linkedList.searchContainer.classList.remove('visible');
    insturctions.classList.remove('visible');

    oldActive.classList.remove('active');
    const activeBtn = e.target;
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


linkedList.figure.onclick = async function(e) {
    if(linkedList.isRunning) return;
    if(insturctions.classList.contains('visible')){
        return insturctions.classList.remove('visible');
    }
    const target = e.path.find(element => element.classList.contains('node') || element === this);
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
                    const firstData = node.querySelector('.node-data').textContent, 
                        secondData = next.querySelector('.node-data').textContent;
                    return firstData.split(' ').length > secondData.split(' ').length;
                }
            });
    }
    linkedList.isRunning = false;
}







const addElement = (parent, tag, textContent, className, id) => {
    const newElement = document.createElement(tag);
    if(textContent) newElement.textContent = textContent;
    if(className) newElement.classList.add(className);
    if(id) newElement.id = id;
    parent.append(newElement);
    return newElement;
}

const sortFigure = addElement(document.querySelector('section'), 'figure', null, null, 'sorting');
const data = [];
console.log(sortFigure)
for(let i = 0; i < 100; i++){
    const newNode = addElement(sortFigure, 'div', null, 'bar');
    newNode.data = Math.round(Math.random() * 100);
    data.push(newNode.data);
    newNode.style.width = `${newNode.data}%`;
    newNode.style.transform = `translateY(${i * newNode.getBoundingClientRect().height}px)`;
    newNode.style.backgroundColor = `hsl(${183}, ${76.5}%, ${newNode.data}%)`;
}

const draw = (arr) => {
    let i = 0;
    for(const element of sortFigure.children){
        element.style.transform = `translateY(${i++ * element.getBoundingClientRect().height}px)`;
    }
    requestAnimationFrame(draw);
}
draw();

// const worker = new Worker('worker.js');
// worker.onmessage = (e) => requestAnimationFrame(() => draw(e.data));
// worker.postMessage(data);
