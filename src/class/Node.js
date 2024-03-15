class Node {
  constructor(word, read, index) {
    (this.word = {
      wordItem: word,
      read: read,
      index: index,
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

  insert(word, read, index) {
    const newNode = new Node(word, read, index);

    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(root, newNode) {
    if (
      newNode.word.wordItem.word < root.word.wordItem.word ||
      (newNode.word.wordItem.word === root.word.wordItem.word &&
        newNode.word.index !== root.word.index)
    ) {
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

  search(root, value) {
    if (!root) {
      return false;
    } else {
      if (
        root.word.wordItem.word === value.word &&
        root.word.index === value.index
      ) {
        return true;
      } else if (value.word <= root.word.wordItem.word) {
        return this.search(root.left, value);
      } else {
        return this.search(root.right, value);
      }
    }
  }

  searchNode(root, searchQuery, dataSearch) {
    if (root) {
      if (root.word.wordItem.word === searchQuery) {
        dataSearch.push({
          data: root.word.wordItem,
          index: root.word.index,
          read: root.word.read,
        });
      }
      if (searchQuery <= root.word.wordItem.word) {
        this.searchNode(root.left, searchQuery, dataSearch);
      } else {
        this.searchNode(root.right, searchQuery, dataSearch);
      }
    }
  }

  min(root) {
    if (!root.left) {
      return root.word;
    } else {
      return this.min(root.left);
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }

    if (
      value.word < root.word.wordItem.word ||
      (value.word === root.word.wordItem.word &&
        value.index !== root.word.index)
    ) {
      root.left = this.deleteNode(root.left, value);
    } else if (value.word > root.word.wordItem.word) {
      root.right = this.deleteNode(root.right, value);
    } else if (
      value.word === root.word.wordItem.word &&
      value.index === root.word.index
    ) {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      root.word = this.min(root.right);
      this.right = this.deleteNode(root.right, {
        word: root.word.wordItem.word,
        index: root.word.index,
      });
    }
    return root;
  }

  updateReadTree(root, value) {
    if (!root) {
      return null; // Trường hợp cơ sở: cây rỗng
    }

    // So sánh từ và chỉ số index
    if (
      value.word === root.word.wordItem.word &&
      value.index === root.word.index
    ) {
      root.word.read++; // Tăng giá trị của thuộc tính read
    }

    // Chỉ gọi đệ quy vào bên trái hoặc bên phải
    if (value.word <= root.word.wordItem.word) {
      root.left = this.updateReadTree(root.left, value);
    } else {
      root.right = this.updateReadTree(root.right, value);
    }

    return root;
  }
}
