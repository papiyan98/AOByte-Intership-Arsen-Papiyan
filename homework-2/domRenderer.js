'use strict';

class DomElement {
  constructor(nodeType, attrs, children) {
    this.nodeType = nodeType;
    this.attrs = attrs;
    this.children = children;
  }

  draw() {
    // create node element with expected nodeType
    const elem = document.createElement(this.nodeType);

    // set attributes for elem
    for (let [name, value] of Object.entries(this.attrs)) {
      elem.setAttribute(name, value);
    }

    // append childs if exists
    if (typeof this.children === 'string') {
      // if this.children is a 'string' create and append textNode
      const textNode = document.createTextNode(this.children);
      elem.append(textNode);
    } else if (Array.isArray(this.children)) {
      // if this.children is an array, iterate over it, draw each child then append
      this.children.forEach(child => {
        elem.append(child.draw());
      });
    } else if (this.children instanceof DomElement) {
      // if this.children instance of DomElement draw child then append
      elem.append(this.children.draw());
    }

    return elem;
  }
}

class DivElement extends DomElement {
  draw() {
    return super.draw();
  }
}

class SpanElement extends DomElement {
  draw() {
    return super.draw();
  }
}

class UlElement extends DomElement {
  draw() {
    return super.draw();
  }
}

class LiElement extends DomElement {
  draw() {
    return super.draw();
  }
}

class FormElement extends DomElement {
  draw() {
    return super.draw();
  }
}

class InputElement extends DomElement {
  draw() {
    return super.draw();
  }
}

class LabelElement extends DomElement {
  draw() {
    return super.draw();
  }
}

class BrElement extends DomElement {
  draw() {
    return super.draw();
  }
}

function el(nodeType, attrs, children) {
  switch (nodeType) {
    case 'div':
      return new DivElement(nodeType, attrs, children);
    case 'span':
      return new SpanElement(nodeType, attrs, children);
    case 'li':
      return new LiElement(nodeType, attrs, children);
    case 'ul':
      return new UlElement(nodeType, attrs, children);
    case 'form':
      return new FormElement(nodeType, attrs, children);
    case 'input':
      return new InputElement(nodeType, attrs, children);
    case 'label':
      return new LabelElement(nodeType, attrs, children);
    case 'br':
      return new BrElement(nodeType, attrs, children);
  }
}

// function el(nodeType, attrs, children) {
//   return new DomElement(nodeType, attrs, children);
// }

const root = document.getElementById("root");

// Test Case: 1
const tree1 = el("div", {"class": "some_classname", "id": "some_id"}, el("span", {}, 'hello'));

root.append(tree1.draw());


// Test Case: 2
const tree2 = el("div", {}, el("ul", {}, [
  el("li", {}, "Item 1"),
  el("li", {}, "Item 2"),
  el("li", {}, "Item 3")
]));

root.append(tree2.draw());

// Test Case: 3

const tree3 = el("form", {action: '/some_action'}, [
  el("label", {for: 'name'}, "First name:"),
  el("br", {}, null),
  el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
  el("br", {}, null),
  el("label", {for: 'last_name'}, "Last name:"),
  el("br", {}, null),
  el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
  el("br", {}, null),
  el("input", {type: 'submit', value: 'Submit'}, null),
]);

root.append(tree3.draw());