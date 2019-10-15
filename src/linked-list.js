const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);

        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._tail = node;
            this._head = node;
        }
        this.length ++;
        return this;

    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        let node =  this.nodeByIndex(index);
        return node ? node.data : null;
    }

    insertAt(index, data) {
        if (index >= this.length) {
            return this.append(data);
        } else {
            let node = this.nodeByIndex(index),
                newNode = new Node(data);
            node.prev.next = newNode;
            newNode.prev = node.prev;
            newNode.next = node;
            node.prev = newNode;
            this.length ++;
            if (index == 0) {
                this._head = newNode;
            }

            return this;
        }
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let nodeForDelete = this.nodeByIndex(index);

        if (index == 0) {
            this._head = nodeForDelete.next;
            if (nodeForDelete.next) { odeForDelete.next.prev = null; }
        } else if (index == this.length -1) {
            this._tail = nodeForDelete.prev;
            if (nodeForDelete.prev) { nodeForDelete.prev.next = null; }
        } else {
            nodeForDelete.next.prev = nodeForDelete.prev;
            nodeForDelete.prev.next = nodeForDelete.next;
        }
        nodeForDelete.next = null;
        nodeForDelete.prev = null
        this.length --;

        return this;
    }

    reverse() {
        let start = 0,
            end = this.length - 1;
        while (start < end) {
            let firstNode = this.nodeByIndex(start),
                lastNode = this.nodeByIndex(end),
                tempData = firstNode.data;
            firstNode.data = lastNode.data;
            lastNode.data = tempData;
            start ++;
            end --;
        }
        return this;
    }

    indexOf(data) {
        if (!this.isEmpty()) {
            let node = this._head;

            for(let i = 0; i < this.length; i++) {
                if (node.data == data) {
                    return i;
                }
                node = node.next;
        }
        return -1;
    }
    }

    nodeByIndex(index) {
        if (!this.isEmpty() && this.length > index) {
            if (index == this.length) {
                return this._tail;
            } else {
                let node = this._head;

                for(let i = 0; i < index; i++) {
                    node = node.next;
                }
                return node;
            }
        }
        return null;
    }
}

module.exports = LinkedList;
