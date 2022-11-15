import colors from '@/assets/constants/colors';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type settingNavigatorProps = {
  text: string;
  onPress: () => void;
};
function SettingNavigator({text, onPress}: settingNavigatorProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.categoriesWrapper}>
        <View style={styles.userInfoRoundWrapper}>
          <View style={styles.userInfoRow}>
            <Image
              source={require('@/assets/images/label.png')}
              style={styles.userInfoIcon}
            />
            <Text style={styles.titlesSubtitle}>{text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  userInfoIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  titlesSubtitle: {
    fontSize: 16,
    color: colors.black,
  },
  categoriesWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  userInfoRoundWrapper: {
    backgroundColor: '#f2f6f7',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
export default SettingNavigator;
