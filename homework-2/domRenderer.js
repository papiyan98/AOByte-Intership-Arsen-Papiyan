'use strict';

class DomElement {
  constructor(nodeType, attrs, children) {
    this.nodeType = nodeType;
    this.attrs = attrs;
    this.children = Array.isArray(children) ? children : [children];
  }

  draw() {
    // create node element with expected nodeType
    const elem = document.createElement(this.nodeType);

    // set attributes for elem
    for (let [name, value] of Object.entries(this.attrs)) {
      elem.setAttribute(name, value);
    }

    // append childs if exists
    this.children.forEach(child => {
      if (child instanceof DomElement) {
        // if this.children instance of DomElement draw child then append it
        elem.append(child.draw());
      } else {
        // if this.children is a 'string' create and append textNode
        const textNode = document.createTextNode(child);
        elem.append(textNode);
      }
    });

    return elem;
  }
}

class DivElement extends DomElement {
  constructor(attrs, children) {
    super('div', attrs, children);
  }
}

class SpanElement extends DomElement {
  constructor(attrs, children) {
    super('span', attrs, children);
  }
}

class UlElement extends DomElement {
  constructor(attrs, children) {
    super('ul', attrs, children);
  }
}

class LiElement extends DomElement {
  constructor(attrs, children) {
    super('li', attrs, children);
  }
}

class FormElement extends DomElement {
  constructor(attrs, children) {
    super('form', attrs, children);
  }
}

class InputElement extends DomElement {
  constructor(attrs, children) {
    super('input', attrs, children);
  }
}

class LabelElement extends DomElement {
  constructor(attrs, children) {
    super('label', attrs, children);
  }
}

class BrElement extends DomElement {
  constructor(attrs, children) {
    super('br', attrs, children);
  }
}

function el(nodeType, attrs, children) {
  switch (nodeType) {
    case 'div':
      return new DivElement(attrs, children);
    case 'span':
      return new SpanElement(attrs, children);
    case 'li':
      return new LiElement(attrs, children);
    case 'ul':
      return new UlElement(attrs, children);
    case 'form':
      return new FormElement(attrs, children);
    case 'input':
      return new InputElement(attrs, children);
    case 'label':
      return new LabelElement(attrs, children);
    case 'br':
      return new BrElement(attrs, children);
    default:
      return new DomElement(nodeType, attrs, children);
  }
}

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
