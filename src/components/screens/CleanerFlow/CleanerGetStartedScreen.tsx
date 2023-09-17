import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import CustomText from '../../common/CustomText';
import globalStyles from '../../common/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {updateCleanerDetails} from '../../../redux/actions/cleanerActions';

type GetStartedScreenProps = {
  navigation: any;
};

type Gender = 'male' | 'female';

const CleanerGetStartedScreen: React.FC<GetStartedScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender>('female');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
  });

  const selectGender = (gender: Gender) => {
    setSelectedGender(gender);
  };


  const handleSubmit = () => {
    console.log('hello')
    // Handle form submission here
    const personalDetails = {
      firstname: firstName,
      lastname: lastName,
      phoneNumber,
      email,
      dateOfBirth,
      gender: selectedGender,
    };
    dispatch(updateCleanerDetails(personalDetails));
  };
  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <CustomText style={styles.header}>Let's get started</CustomText>
          <CustomText style={styles.subHeader}>
            We collect this information to keep our community safe. Families
            will only see your first name and last initial.
          </CustomText>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#000"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#000"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#000"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (MM/DD/YYYY)"
            placeholderTextColor="#000"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />

      
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedGender === 'male' && styles.selected,
              ]}
              onPress={() => selectGender('male')}>
              <CustomText style={styles.buttonText}>Male</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedGender === 'female' && styles.selected,
              ]}
              onPress={() => selectGender('female')}>
              <CustomText style={styles.buttonText}>Female</CustomText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={globalStyles.primaryButton}
            onPress={handleSubmit}>
            <CustomText style={styles.buttonText}>Join now</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CleanerGetStartedScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 25,
  },
  form: {
    backgroundColor: '#ddd',
    padding: 30,
    height: 800,
  },
  input: {
    height: 60,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 14,
    fontSize: 18,
  },
  genderContainer: {
    flexDirection: 'row', // This makes its children line up horizontally.
    justifyContent: 'center', // This will give space between the two buttons.
    marginBottom: 20, // Space after the gender buttons, adjust as needed.
  },
  buttonText: {
    fontSize: 18,
  },
  button: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#eee',
    width: 150,
  },
  selected: {
    backgroundColor: '#5CE1E6',
  },
  text: {
    fontSize: 16,
  },
});
