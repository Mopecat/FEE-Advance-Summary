// 二叉树 数据存储方式 小的放左边 大的放右边
class Node {
  constructor(element) {
    this.element = element;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor() {
    this.root = null;
  }
  insert(root, newNode) {
    if (newNode.element < root.element) {
      if (root.left == null) {
        root.left = newNode;
      } else {
        this.insert(root.left, newNode);
      }
    } else {
      if (root.right == null) {
        root.right = newNode;
      } else {
        this.insert(root.right, newNode);
      }
    }
  }
  add(element) {
    let node = new Node(element);
    if (!this.root) {
      this.root = node;
    } else {
      this.insert(this.root, node);
    }
  }
}
let tree = new Tree();
tree.add(100);
tree.add(60);
tree.add(150);
tree.add(50);
tree.add(80);
tree.add(130);
tree.add(180);
console.log(JSON.stringify(tree));
