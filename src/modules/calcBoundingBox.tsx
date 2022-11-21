const CORRECTION_VALUE = 4;
//보정치를 선언해서 좀 더 바운딩박스를 잘보이게 개선

/**
 *
 * @param xArray x좌표, number array
 * @param yArray y좌표, number array
 * @param width img width, number
 * @param height img height, number
 * @returns [top, btm, left, right] 순서로 position array return
 */

export function CalcBoundingBoxOnImage(
  xArray = Array<number>(4),
  yArray = Array<number>(4),
  width: number,
  height: number,
) {
  let topPosition: number;
  let bottomPosition: number;
  let leftPosition: number;
  let rightPosition: number;

  const imageWidth = width;
  const imageHeight = height;

  const resizedHeight = (200 * imageHeight) / imageWidth;

  const leftPosX = compareBigger(xArray[0], xArray[3]);
  const rightPosX = compareSmaller(xArray[1], xArray[2]);

  const topPosY = compareBigger(yArray[0], yArray[1]);
  const bottomPosY = compareSmaller(yArray[2], yArray[3]);

  // get the top left position of the image
  //boundingBboxId, 왼쪽 위, 윈쪽아래, 오른쪽위, 오른쪽아래
  topPosition =
    (200 - resizedHeight) / 2 +
    (topPosY / imageHeight) * resizedHeight -
    CORRECTION_VALUE;
  bottomPosition =
    (200 - resizedHeight) / 2 +
    (1 - bottomPosY / imageHeight) * resizedHeight -
    CORRECTION_VALUE;
  leftPosition = (leftPosX / imageWidth) * 200 - CORRECTION_VALUE;
  rightPosition = (1 - rightPosX / imageWidth) * 200 - CORRECTION_VALUE;

  return [topPosition, bottomPosition, leftPosition, rightPosition];
}

const compareBigger = (a: number, b: number) => {
  if (a < b) {
    return a;
  } else {
    return b;
  }
};

const compareSmaller = (a: number, b: number) => {
  if (a > b) {
    return a;
  } else {
    return b;
  }
};
