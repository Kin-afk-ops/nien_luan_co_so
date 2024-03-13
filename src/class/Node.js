class Node {
  constructor(word) {
    (this.word = {
      wordItem: word,
      like: false,
      done: false,
    }),
      (this.left = null),
      (this.right = null);
  }
}

export default class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  insert(word) {
    const newNode = new Node(word);

    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(root, newNode) {
    if (newNode.word.wordItem.word <= root.word.wordItem.word) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }
}
