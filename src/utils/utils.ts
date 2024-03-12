type Vector3 = [number, number, number];

export const adjustIslandForScreenSize = () => {
  let screenScale: Vector3 = [1, 1, 1];
  const screenPosition: Vector3 = [0, -6.5, -43.4];
  const rotation: Vector3 = [0.1, 4.7, 0];
  if (window.innerWidth < 768) {
    screenScale = [0.9, 0.9, 0.9];
  }

  return [screenScale, screenPosition, rotation];
};

export const adjustBiplaneForScreenSize = () => {
  let screenScale: Vector3 = [3, 3, 3];
  let screenPosition: Vector3 = [0, -4, -4];

  // If screen width is less than 768px, adjust the scale and position
  if (window.innerWidth < 768) {
    screenScale = [1.5, 1.5, 1.5];
    screenPosition = [0, -1.5, 0];
  }

  return [screenScale, screenPosition];
};
