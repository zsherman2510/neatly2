// HomeScreen.tsx

import React from 'react';
import { 
  SafeAreaView, 
  View,
  StyleSheet, 
  Image, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import CustomText from '../common/CustomText';
import globalStyles from '../common/globalStyles';

// Define the props type
type HomeScreenProps = {
  navigation: any; // You can also use the specific type from @react-navigation/native if you've set up navigation
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground style={styles.backgroundImage} source={require('../../../assets/home-photo-7.jpeg')}>
     {/* Overlay */}
     <View style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'  // This is a semi-transparent black overlay
      }}/>
      
        <View style={styles.container}>
          <View style={styles.containerTwo}>
            <Image style={styles.logo} source={require('../../../assets/neatly-logo.png')} />
          </View>
          <View style={styles.headingBox}>
            <CustomText style={styles.header}>Spotless Homes, Effortless Process.</CustomText>
            <CustomText style={styles.subHeader}>A hassle-free journey to a sparkling home.</CustomText>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={globalStyles.primaryButton} onPress={() => {navigation.navigate('CleanerGetStarted')}}>
              <CustomText style={styles.buttonText}>Get Started</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.secondaryButton} onPress={() => {/* Handle Log In action */}}>
              <CustomText style={styles.buttonText}>Log In</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('CleanerGetStarted')}}>
              <CustomText style={globalStyles.hyperlink}>I'm a Cleaner</CustomText>
            </TouchableOpacity>
          </View>
        </View>
          
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  container: {
    flex: 1,
  },
  containerTwo: {
    alignItems: 'center',
    marginTop: 50
  },
  logo: {
    width: 150,
    height: 40,
  },
  headingBox: {
    flex: 1,
    marginTop: 375,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#eee',
    marginBottom: 30
  },
  subHeader: {
    fontSize: 24,
    color: '#eee'
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1, // Add a border at the top of the footer if you like
    borderTopColor: '#e5e5e5',
    paddingVertical: 10, 
    paddingHorizontal: 20,
    height: 200,
    borderRadius: 16,
    width: 423
  },
  buttonText: {
    color: 'black',
    fontSize: 22
  },
  cta: {
    backgroundColor: '#333',
  }, 
});

export default HomeScreen;
