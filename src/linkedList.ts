type ConstructorBase = new (...args: any[]) => {};

export type NodeOrNull<T> = LinkedListNode<T> | null;

abstract class Base {
    abstract [Symbol.iterator](): IterableIterator<LinkedListNode<unknown>>
    abstract length: number
    abstract toString(): string
    abstract copy(start?: number, end?: number): LinkedList<unknown> | LinkedListNode<unknown>
}

const isInBounds = function(self: { length: number }, ...indexes: number[]): true | never {
    const { length } = self;
    for(const index of indexes){
        if(index < 0 || index >= length) {
            throw new RangeError(`Index: ${index} is out of bounds Length: ${length}`);
        }
    }
    return true;
}

interface ICloneable<T> extends Base {
    head?: NodeOrNull<T>
    tail?: NodeOrNull<T>
    next?: NodeOrNull<T>
    data?: T
}

export class LinkedListNode<T extends unknown> extends Base implements ICloneable<T>  {
    constructor(
        public data: T, 
        public next: LinkedListNode<T> | null = null
    ){super()}

    * [Symbol.iterator](): IterableIterator<LinkedListNode<T>> {
        for(let current = this as LinkedListNode<T>; current !== null; current = current.next!){
            yield current;
        }
    }

    get length(): number {
        let length = 0;
        for(const _ of this) length++;
        return length;
    }

    copy(end = Infinity): LinkedListNode<T> {
        if(end === 0) return new LinkedListNode(undefined) as LinkedListNode<any>;
        let index = 0;
        const clone = (node: NodeOrNull<T>): NodeOrNull<T> => {
            return node === null || index++ >= end ? null : new LinkedListNode(node.data, clone(node.next));
        }
        return clone(this)!
    }

    toString(): string {
        return `Data: ${this.data}`;
    }
}// end of LinkedListNode


interface IAddable<T> extends ICloneable<T>{
    head: NodeOrNull<T>
    tail: NodeOrNull<T>
    add(...args: T[]): this
    addFirst(...args: T[]): this
    insert(index: number, data: T): this
    join(...iterables: (Iterable<T>)[]): this
}

type Callback<T, R> = (current: LinkedListNode<T>, index: number) => R;

interface IRemoveable<T> extends IAddable<T>{
    removeHead(): LinkedListNode<T>
    remove(indexOrNode: number | LinkedListNode<T>): LinkedListNode<T>
    filter(func: Callback<T, boolean>): this
}

interface ITraversable<T> extends ICloneable<T>{
    forEach(func: Callback<T, any>): void
    find<R extends unknown>(func: Callback<T, R>): R | undefined
    indexOf(indexOrNode: number | LinkedListNode<T>): number | -1
    get(index: number): LinkedListNode<T>
    map<R extends unknown>(func: Callback<T, R>): LinkedList<R>
}



export default class LinkedList<T extends unknown | LinkedList<T>> extends Base implements IRemoveable<T>, ITraversable<T> {

    public head: NodeOrNull<T> = null;
    public tail: NodeOrNull<T> = null;
    public length: number = 0;

    constructor(...args: T[]) {
        super();
        if(args.length) this.add(...args);
    }

    * [Symbol.iterator](): IterableIterator<LinkedListNode<T>> {
        if(!this.head) return
        for(const current of this.head){
            yield current;
        }
    }
    
    copy(start = 0, end = Infinity): LinkedList<T>{
        if(end < start) throw new RangeError(`start must be less than end\n\t\tStart: ${start}\tEnd: ${end}`);
        if(end <= start) return new LinkedList();
        return this.head ? new LinkedList(...this.get(start).copy(end)) : new LinkedList() as LinkedList<any>;
    }

    join(...iterables: (Iterable<T> | LinkedList<T> | LinkedListNode<T> | T)[]): this {
        for(const iterable of iterables){
            if(Symbol.iterator in Object(iterable)){
                for(const data of iterable as Iterable<T> | LinkedList<T> | LinkedListNode<T>){
                    this.add((data as LinkedListNode<T>)?.data ?? data);
                }
            }
            else this.add(iterable as T);
        }
        return this;
    }

    addFirst(...args: (LinkedList<T> | LinkedListNode<T> | T)[]): this {
        for(const data of args){
            if(data instanceof LinkedListNode) this.head = new LinkedListNode(data.data, this.head);
            else this.head = new LinkedListNode(data as T, this.head)
            this.tail ??= this.head;
            this.length++;
        }
        return this;
    }

    add(...args: (LinkedList<T> | LinkedListNode<T> | T)[]): this {
        for(const data of args){
            if(this.tail){
                if(data instanceof LinkedListNode) this.tail.next = new LinkedListNode(data.data);
                else this.tail.next = new LinkedListNode(data as T);
                this.tail = this.tail.next;
                this.length++;
            } 
            else this.addFirst(data);
        }
        return this;
    }

    forEach(func: Callback<T, any>): void{
        let index = 0;
        for(const node of this){
            func(node, index++);
        }
    }

    find<R extends unknown>(func: Callback<T, R>): R | undefined {
        let index = 0;
        for(const node of this){
            const response: R = func(node, index++);
            if(response !== undefined && response !== false) {
                return response;
            }
        }
    }

    indexOf(node: LinkedListNode<T>): number | -1 {
        const result = this.find((n, index) => n === node && index)!
        return result === false ? -1 : result;
    }

    get(index: number): NonNullable<LinkedListNode<T>> {
        isInBounds(this, index) as never;
        return this.find((node, i) => i === index ? node : undefined)!;
    }

    insert(index: number, data: T): this | never {
        isInBounds(this, index) as never;
        switch(index){
            case 0: return this.addFirst(data);
            case this.length-1: return this.add(data);
            default: {
                const node = this.get(index);
                node.next = new LinkedListNode(data, node.next);
                return this;
            }
        }
    }

    removeHead(): NonNullable<this['head']> {
        if(!this.head) throw new ReferenceError('cannot remove from empty list');
        const removed = this.head;
        this.head = this.head.next;
        this.length--;
        return removed as NonNullable<this['head']>;
    }

    clear(): this {
        while(this.head) this.head = this.head.next;
        this.tail = null;
        this.length = 0;
        return this;
    }


    remove(indexOrNode: number | LinkedListNode<T>): LinkedListNode<T> | never {
        if(indexOrNode instanceof LinkedListNode) {
            const index = this.indexOf(indexOrNode);
            return this.remove(index);
        }
        isInBounds(this, indexOrNode) as never;
        if(indexOrNode === 0) return this.removeHead();
        else {
            const node = this.get(indexOrNode-1);
            const removed = node.next!;
            node.next = removed.next;
            this.length--;
            return removed;
        }
    }

    filter(func: Callback<T, boolean>): this {
        let index = 0;
        let previous: LinkedListNode<T> | undefined;
        for(let current = this.head; current !== null; current = current.next, index++){
            if(func(current, index)){
                if(index === 0) this.head = current.next;
                else {
                    previous!.next = current.next;
                    if(current === this.tail) this.tail = previous!;
                    current = previous!;
                }
                this.length--, index--;
            }
            previous = current;
        }
        return this;
    }

    map<R extends unknown>(func: Callback<T, R>): LinkedList<R>{
        const newList = new LinkedList();
        this.forEach((node, index) => {
            const response = func(node, index);
            if(response !== undefined){
                if(response instanceof LinkedListNode){
                    newList.add(response.data)
                }
                newList.add((response as NodeOrNull<T>)?.data ?? response);
            }
        })
        return newList as LinkedList<R>;
    }

    toString() {
        let string = '', count = 1;
        for(const node of this){
            string += `${node.data} ${count++ === this.length ? '\n' : '==>'} `;
        }
        string += `\n%cLength: ${this.length}\n`
        console.log(string, 'font-weight: bold;');
        return string;
    }

    swap(a: LinkedListNode<T>, b: LinkedListNode<T>){
        const temp = a.data;
        a.data = b.data;
        b.data = temp;
        return this;
    }
}// end of LinkedList


const empty = new LinkedList();
const balls = {balls: 0}
empty.add('im a string', 4, balls);
console.log(empty)
const arr = Array(20).fill(1).map(v => v = Math.round(Math.random() * 20));
const obj = {};
const list = new LinkedList(...arr);
console.log(list.tail);
console.log(list.remove(list.tail!));
console.log(list.length, list.copy(0))
const clone = list.copy(1);
const map = list.map(node => node);
console.log(clone, map)
list.toString()
list.filter(node => node.data === 6);
//list.toString();
list.join(list).toString();