const text = { 
    insert: {
        h1: 'Insert',
        h2: [
            'Click on a Node to insert after it',
            'OR',
            'Click anywhere else to insert at the end of the List',
            'Click anywhere to begin'
        ]
    },
    delete: {
        h1: 'Delete',
        h2: [
            'Click on a Node to delete it',
            'OR',
            'Click anywhere else to delete at the end of the List',
            'Click anywhere to begin'
        ]
    },
    search: {
        h1: 'Search',
        h2: [
            'Click on a Node to for search it',
            'OR',
            'Click anywhere else to search for an undefined Node',
            'Click anywhere to begin'
        ]
    }, 
    sort: {
        h1: 'Sort',
        h2: [
            'Click anywhere to sort the list by the size of each Node',
            'Click anywhere to begin',
        ]
    }
};

const addElement = (parent, tag, textContent, className, id) => {
    const newElement = document.createElement(tag);
    if(textContent) newElement.textContent = textContent;
    if(className) newElement.classList.add(className);
    if(id) newElement.id = id;
    parent.append(newElement);
    return newElement;
}

const removeChildren = parent => {
    while (parent.firstChild) parent.removeChild(parent.firstChild);
    return parent;
}

const render = (inputObj, parent, className, id) => {
    if(!inputObj) return; 
    if(className) parent.classList.add(className);
    if(id) parent.id = id;
    
    for(const tag in inputObj){
        if(typeof inputObj[tag] === 'object'){
            if(Array.isArray(inputObj[tag])){
                for(const unknown of inputObj[tag]) {
                    if(typeof unknown !== 'object') addElement(parent, tag, unknown);
                    else render(unknown, addElement(parent, unknown.tag || tag, unknown.textContent), unknown.className, unknown.id);
                }
            }
            else {
                const { className: cn, id: _id, textContent: tc, tag: t } = inputObj[tag];
                render(inputObj[tag], addElement(parent, t || tag, tc), cn, _id);
            }
        }
        else if(tag !== 'className' && tag !== 'id' && tag !== 'textContent' && tag !== 'tag') {
            addElement(parent, tag, inputObj[tag]);
        }
    }
    return parent;
}
export { text, addElement, removeChildren, render };