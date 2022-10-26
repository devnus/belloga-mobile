export function calcMyGiftInfo(appliedInfo: any) {
  const appliedInfoIdArray = appliedInfo.map(info => info.giftId);

  const giftAppliedInfo = appliedInfoIdArray.reduce(
    (ac, v) => ({...ac, [v]: (ac[v] || 0) + 1}),
    {},
  );

  return {
    applyCount: appliedInfoIdArray.length,
    myGiftAppliedInfo: giftAppliedInfo,
  };
}
