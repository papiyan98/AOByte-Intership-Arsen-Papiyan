# Homework 2
* Rename repo name to aobyte-intership-name-surname
* For each homework create a new folder (homework-N )
* For each homework create a new branch homework-N and create a  PR (pull request)
* Fix promise all issue https://github.com/Aghasy8888/AOByte-internship
* Implement DOM renderer:
    1. You must create el function, which has the following signature
    function el(type: string, attrs: object, children: DomElement | DomElement[])
    So basically it accepts the following:
      a. The type of the dom element to be created ('div', 'span', etc)
      b. An object with tag attributes (class, id, etc)
      c. Child elements. This one can be either DomElement (SpanElement for instance) or an array of DomElement. In case of an array, all elements in the array are siblings under same parent
      d. The el function should return a DomElement instance
    2. Create DomElement class, which must be a base class for all Elements
    3. Each class extending DomElement should implement draw method
    4. Each HTML tag must have a corresponding class extending DomElement. For instance a "div" tag should have
    ```
        DivElement class:
    class DivElement extends DomElement {
      draw(children) {
        // 1. Create div with
        // const div = document.createElement("DIV");
        // 2. Append children to div
        // 3. Return div
      }
    }
    Following test cases should pass:
    Test case 1.
    const tree =
      el("div", {"class": "some_classname", "id": "some_id"},
        el("span", {}, 'hello')
      );
    document.getElementById("root").appendChild(tree.draw());
    Renders:
    <div id='root'>
      <div class="some_classname" id="some_id">
        <span>hello</span>
      </div>
    </div>
    Test case 2.
    const tree =
      el("div", {},
        el("ul", {}, [
          el("li", {}, "Item 1"),
          el("li", {}, "Item 2"),
          el("li", {}, "Item 3")
        ])
      );
    document.getElementById("root").appendChild(tree.draw());
    Renders:
    <div id='root'>
      <div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
    Test case 3.
    const tree =
      el("form", {action: '/some_action'}, [
        el("label", {for: 'name'}, "First name:"),
        el("br", {}, null),
        el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
        el("br", {}, null),
        el("label", {for: 'last_name'}, "Last name:"),
        el("br", {}, null),
        el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
        el("br", {}, null),
        el("input", {type: 'submit', value: Submit}, null),
      ]);
    document.getElementById("root").appendChild(tree.draw());
    Renders:
    <div id='root'>
      <form action='/some_action'>
        <label for='name'>First name:</label><br>
        <input type="text" id="name" name="name" value="My name"><br>
        <label for='name'>Last name:</label><br>
        <input type="last_name" id="last_name" name="last_name" value="My second name"><br>
        <input type="submit" value="Submit">
      </div>
    </div>
    ```
