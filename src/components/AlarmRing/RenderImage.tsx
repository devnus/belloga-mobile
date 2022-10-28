import {CalcBoundingBoxOnImage} from '@/modules/calcBoundingBox';
import {boundingBoxTypes} from '@/modules/labelingAPIs';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type renderImagePropsType = {
  boundingBoxInfo: any;
  imageUrl: string;
};

function RenderImage({boundingBoxInfo, imageUrl}: renderImagePropsType) {
  const [positionArray, setPositionArray] = useState<number[]>([0, 0, 0, 0]);

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
    setPositionArray(() => positionResultArray);
  });

  useEffect(() => {}, [positionArray]);

  return (
    <View
      style={[
        styles.rectangle,
        {
          top: positionArray[0],
          bottom: positionArray[1],
          left: positionArray[2],
          right: positionArray[3],
        },
      ]}
    />
  );
}

export const showBoundingBox = (
  boundingBoxInfo: boundingBoxTypes | undefined,
  imageUrl: string,
) => {
  console.log('showBoundingBox called', boundingBoxInfo);

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
