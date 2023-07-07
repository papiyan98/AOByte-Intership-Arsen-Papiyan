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

class DivElement extends DomElement {}

class SpanElement extends DomElement {}

class UlElement extends DomElement {}

class LiElement extends DomElement {}

class FormElement extends DomElement {}

class InputElement extends DomElement {}

class LabelElement extends DomElement {}

class BrElement extends DomElement {}

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
