import { renderTriangle, rotateTriangle } from "./triangleRenderer.js";

const container = document.querySelector('.container');
const rotateBtn = document.querySelector('.rotate-btn');
const inputNumber = document.getElementById('inputNumber');

let triangleElement, rotatedTriangleElement;

inputNumber.onkeydown = (event) => {
  if (event.key === 'Enter') {
    if (triangleElement) {
      // Remove triangle and it's rotated copy if they are exist before rendering
      triangleElement.remove();
      // Check if rotated triangle exist remove it
      rotatedTriangleElement && rotatedTriangleElement.remove();
    }
    
    // Triangle length should be minimum 2
    if (event.target.value < 2) {
      alert('Enter the valid length.');
      event.target.value = "";
      return;
    }

    // Render triangle with given lingth
    triangleElement = renderTriangle(event.target.value);

    // Insert it to container
    container.insertAdjacentElement('beforeend', triangleElement);
    
    // Clear input field
    event.target.value = "";

    // Unset the focus on the input element
    event.target.blur();
  }
};

rotateBtn.addEventListener('click', () => {
  // Check if trangle doesn't exist then return
  if (!triangleElement) return;

  // Check if rotated triangle exist then remove it from DOM
  if (rotatedTriangleElement) rotatedTriangleElement.remove();

  // Create rotated clone of triangleElement
  rotatedTriangleElement = rotateTriangle(triangleElement);

  // Append it to container
  container.append(rotatedTriangleElement);
});
