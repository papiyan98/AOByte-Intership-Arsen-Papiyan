export const renderTriangle = function(length) {
  const triangle = document.createElement('div');
  triangle.classList.add('triangle');
  
  for (let row = 1; row <= length; row++) {
    const rowElement = document.createElement('pre');

    // Add spaces before the asterisks
    const spaces = '  '.repeat(length - row);
    rowElement.appendChild(document.createTextNode(spaces));

    // Add asterisks
    const asterisks = '*   '.repeat(row);
    rowElement.appendChild(document.createTextNode(asterisks));

    triangle.appendChild(rowElement);
  }

  return triangle;
}

export const rotateTriangle = (triangle) => {
  const rotated = document.createElement('div');

  // Deep clone of rendered triangle
  const clone = triangle.cloneNode(true);

  rotated.classList.add('rotated');

  for (let row = clone.children.length - 1; row >= 0; row--) {
    // Append each row of triangle in reverse order
    rotated.append(clone.children[row]);
  }

  return rotated;
}