const {
  NotImplementedError,
  checkForThrowingErrors,
} = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.mainRoot = null;
  }

  min() {
    // Задаем узел начиная с корня
    let node = this.mainRoot;
    // Ищем самый левый элемент
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    // Задаем узел начиная с корня
    let node = this.mainRoot;
    // Ищем самый правый элемент
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }

  root() {
    return this.mainRoot;
  }

  add(data) {
    // Кладем в корень, то что вернет функция вставки элемента
    // Начинаем с корня.
    this.mainRoot = insertNode(this.mainRoot, data);

    function insertNode(node, value) {
      // Если узла нет (узел - null) - добавляем новый узел
      if (!node) return new Node(value);
      // Если значения узла = новому элементу (не добавляем повторный)
      if (node.data === value) return node;
      // Сравниваем значение узла и новый элемент
      if (value < node.data) {
        // Идем в левое поддерево
        node.left = insertNode(node.left, value);
      } else {
        // Идем в правое поддерево
        node.right = insertNode(node.right, value);
      }

      return node;
    }
  }

  remove(data) {
    this.mainRoot = removeNode(this.mainRoot, data);

    function removeNode(node, value) {
      // Точка остановки рекурсии - null
      if (!node) return null;

      if (value < node.data) {
        // Удаляем значение из левого поддерева, а новое дереро
        // положить в левое поддерево
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        // Удаляем значение из правого поддерева, а новое дереро
        // положить в правно поддерево
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // Значение РАВНО!
        // Лист без потомков - удаляем нафиг, как будто ничего и не было
        if (!node.left && !node.right) return null;
        // Лист без левого  потомка - замещаем нод правым потомком
        if (!node.left) {
          node = node.right;
          return node;
        }
        // Лист без правого  потомка - замещаем нод левым потомком
        if (!node.right) {
          node = node.left;
          return node;
        }
        // Есть оба потомка,находим максимального потомка
        // среди левого поддерева (есть два варианта для бинарного дерева)
        let maxFromLeft = node.left;
        // Правее элементы всегда больше
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        // Записываем значение удаляемого узла
        node.data = maxFromLeft.data;
        // Обновляем значение левого поддерева
        node.left = removeNode(node.left, maxFromLeft.data);

        return node;
      }
    }
  }

  has(data) {
    // Начинаем поиск с главного дерева
    return includeNode(this.mainRoot, data);

    function includeNode(node, value) {
      // Если узла нет - возвращаем false
      if (!node) {
        return false;
      }

      // Если нашли значение узла равное искомому
      if (node.data === value) {
        return true;
      }

      // Ищем в какое поддерево пойти искать
      return node.data > value
        ? includeNode(node.left, value)
        : includeNode(node.right, value);
    }
  }

  find(data) {
    // Начинаем поиск с главного дерева
    return search(this.mainRoot, data);

    function search(node, data) {
      // если узла нет - вернуть null
      if (node === null) {
        return null;
        // если искомый меньше значения узла - идем влево
      } else if (data < node.data) {
        return search(node.left, data);
        // если искомый больше значения узла - идем вправо
      } else if (data > node.data) {
        return search(node.right, data);
        // возвращаем узел
      } else {
        return node;
      }
    }
  }
}

module.exports = {
  BinarySearchTree,
};
