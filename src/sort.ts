import Bar, { curryStyle } from './style'
import LinkedList, { NodeOrNull, LinkedListNode } from './linkedList'
import { get } from './state'

const fastStyle = curryStyle(() => get('speed') * 0.25);

const bubbleSort = async (list: LinkedList<Bar>) => {
    const slowStyle = curryStyle(() => get('speed') * 0.35);
    for(let i = list.length; i > 1; i--){
        let j = 0;
        for(const node of list){
            if(!get('canvasIsRunning')) return console.log('stopped early');
            if(++j >= i) break;

            await fastStyle(node, node.next!);
            
            if(node.data.width > node.next!.data.width){
                list.swap(node, node.next!);
                await slowStyle(node.next!, node);
            }
        }
    }
}


const mergeSort = async (list: LinkedList<Bar>) => {
    const reallyFastStyle = curryStyle(() => get('speed') * 0.15);
    const reallySlowStyle = curryStyle(() => get('speed') * 0.5);

    const getMiddle = (node: NodeOrNull<Bar>) => {
        if(!node) return null;
        let slow = node, fast = node;
        while(fast.next?.next){
            slow = slow.next!;
            fast = fast.next.next
        }
        return slow;
    }
    const merge = async (a: NodeOrNull<Bar>, b: NodeOrNull<Bar>): Promise<LinkedListNode<Bar>> => {
        if(!a) return b!;
        if(!b) return a!;
        let result: NodeOrNull<Bar> = null; 
        if(a.data.width <= b.data.width){ 
            result = a;
            await fastStyle(result, b, new LinkedList(...a).join(b));
            result.next = await merge(a.next!, b);
        }
        else {
            result = b;
            await fastStyle(result, a, new LinkedList(...a).join(b));
            result.next = await merge(a, b.next!)
        }
        await reallyFastStyle(result, undefined, new LinkedList(...result));
        return result;
    }
    const mergeSort = async (node: LinkedListNode<Bar>): Promise<LinkedListNode<Bar>> => {
        if(!node?.next) return node;
        const left = node;
        const middle = getMiddle(node)!;
        const right = middle.next!;
        middle.next = null;
        await reallySlowStyle(middle, left, new LinkedList(...node));
        return await merge(await mergeSort(left), await mergeSort(right));
    }

    const head = await mergeSort(list.head!);

    if(get('canvasIsRunning')){
        list.head = head;
        console.log('done!', list)
    }
    else console.log('stopped early');
}

//must export as default or else error in production build with no source map
//extremely annoying to figure out
export default { mergeSort, bubbleSort }