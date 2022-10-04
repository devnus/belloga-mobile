/**
 *
 * @param xArray x좌표, number array
 * @param yArray y좌표, number array
 * @param width img width, number
 * @param height img height, number
 * @returns [top, btm, left, right] 순서로 position array return
 */

export function CalcBoundingBoxOnImage(
  xArray = Array<number>(2),
  yArray = Array<number>(2),
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

  // get the top left position of the image
  //boundingBboxId, 왼쪽 위, 윈쪽아래, 오른쪽위, 오른쪽아래
  topPosition =
    (200 - resizedHeight) / 2 + (yArray[0] / imageHeight) * resizedHeight;
  bottomPosition =
    (200 - resizedHeight) / 2 + (1 - yArray[2] / imageHeight) * resizedHeight;
  leftPosition = (xArray[0] / imageWidth) * 200;
  rightPosition = (1 - xArray[2] / imageWidth) * 200;

  return [topPosition, bottomPosition, leftPosition, rightPosition];
}
