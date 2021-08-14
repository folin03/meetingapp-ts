import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const DismissKeyboard = ({children}) => {
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>;
};

// export default DismissKeyboard;
