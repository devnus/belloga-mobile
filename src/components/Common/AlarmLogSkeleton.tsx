import React from 'react';
import {Image, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LabelingLogInfo from '../LabelingLogInfo';

export default function AlarmLogSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <LabelingLogInfo date={''} isProcessed={false} labeledLog={[]} />
    </SkeletonPlaceholder>
  );
}
