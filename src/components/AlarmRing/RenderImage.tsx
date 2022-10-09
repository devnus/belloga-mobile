import {CalcBoundingBoxOnImage} from '@/modules/calcBoundingBox';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type renderImagePropsType = {
  boundingBoxInfo: [];
  imageUrl: string;
};

function RenderImage({boundingBoxInfo, imageUrl}: renderImagePropsType) {
  const [topPosition, setTopPosition] = useState(0);
  const [bottomPosition, setBottomPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);

  useEffect(() => {
    const xArray = boundingBoxInfo.x;
    const yArray = boundingBoxInfo.y;
    Image.getSize(imageUrl, (width: number, height: number) => {
      const positionResultArray = CalcBoundingBoxOnImage(
        xArray,
        yArray,
        width,
        height,
      );
      //boundingBboxId, 왼쪽 위, 윈쪽아래, 오른쪽위, 오른쪽아래
      setTopPosition(positionResultArray[0]);
      setBottomPosition(positionResultArray[1]);
      setLeftPosition(positionResultArray[2]);
      setRightPosition(positionResultArray[3]);
    });
  }, []);

  return (
    <View
      style={[
        styles.rectangle,
        {
          top: topPosition,
          bottom: bottomPosition,
          left: leftPosition,
          right: rightPosition,
        },
      ]}
    />
  );
}

export const showBoundingBox = (boundingBoxInfo: [], imageUrl: string) => {
  console.log('showBoundingBox called');

  if (boundingBoxInfo && imageUrl) {
    return (
      <>
        <View style={{height: 200, width: 200}}>
          {imageUrl && boundingBoxInfo ? (
            <>
              <Image
                source={{
                  uri: `${imageUrl}`,
                }}
                style={{height: 200, width: 200, resizeMode: 'contain'}}
              />
              <RenderImage
                boundingBoxInfo={boundingBoxInfo}
                imageUrl={imageUrl}
              />
            </>
          ) : (
            <Text>로딩중</Text>
          )}
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  rectangle: {
    borderWidth: 3,
    borderColor: 'red',
    position: 'absolute',
  },
});
