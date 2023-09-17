import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ style, ...props }) => {
  return <Text style={[style]} {...props} />;
};


export default CustomText;
