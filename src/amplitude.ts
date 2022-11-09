import {Amplitude} from '@amplitude/react-native';
import Config from 'react-native-config';

const ampInstance = Amplitude.getInstance();
ampInstance.init(`${Config.AMPLITUDE_KEY}`);

export default ampInstance;
