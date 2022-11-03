import React, {useEffect} from 'react';
import {
  Dimensions,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@/assets/constants/colors';
import {displayStamps} from '@/modules/calcCircularView';
import UserGiftApplyCount from './UserGiftApplyCount';
import {CustomModal} from '@/components/Modals/CustomModal';
import ModalCard from '@/components/Modals/ModalCard';
import {getUserStampInfo, pressStamp} from '@/modules/userPointAPIs';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import {useAppDispatch} from '@/store';
import ampInstance from '@/amplitude';

function Stamp({stampNumbers, setStampNumbers, giftNumbers}: any) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const points = useSelector((state: RootState) => state.user.points);
  const dispatch = useAppDispatch();

  //원형 UI 구현을 위한 스탬프들
  const windowWidth = Dimensions.get('window').width * 0.9;
  const windowHeight = Dimensions.get('window').height * 0.9;
  const imgSize = 60;

  const stampContainerStyle: StyleProp<ImageStyle> = {
    borderRadius: Math.round(windowWidth + windowHeight) / 2,
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
  };

  useEffect(() => {
    console.log('스탬프 개수,', stampNumbers);
    if (accessToken) {
      getUserStampInfo(accessToken, dispatch, setStampNumbers);
    }
  }, [stampNumbers, accessToken, dispatch, setStampNumbers]);

  return (
    <SafeAreaView style={styles.popularWrapper}>
      <View style={styles.pressStampContainer}>
        <View style={stampContainerStyle}>
          {displayStamps(stampNumbers, windowWidth, imgSize)}
          <UserGiftApplyCount
            stampNumbers={stampNumbers}
            giftApplyCount={giftNumbers}
          />
        </View>

        <CustomModal
          activator={({handleOpen}) => (
            <TouchableOpacity
              style={styles.pressStampBtn}
              onPress={() => {
                ampInstance.logEvent('ADD_STAMP_CLICKED');
                stampNumbers < 8 &&
                  pressStamp(
                    accessToken,
                    points,
                    setStampNumbers,
                    handleOpen,
                    dispatch,
                  );
              }}>
              <LinearGradient
                colors={['#b4eee7', '#b4e2ed', '#b4e1ee']}
                style={styles.linearGradient}>
                <Text style={styles.pressBtnInsideText}>
                  {stampNumbers < 8 ? 'STAMP' : '경품 응모하기'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}>
          <ModalCard
            titleText="스탬프판에 도장을 찍었습니다!"
            middleText="이용해 주셔서 감사드립니다"
          />
        </CustomModal>
      </View>
    </SafeAreaView>
  );
}

export default Stamp;

const styles = StyleSheet.create({
  popularWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 20,
    marginVertical: 30,
    paddingLeft: 20,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  titlesBoldTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0f5078',
  },
  stampInsideText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d2e3e1',
  },
  stampImage: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  linearGradient: {
    borderRadius: 5,
  },
  pressStampBtn: {
    marginTop: 20,
    width: 300,
  },
  pressBtnInsideText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressStampContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
