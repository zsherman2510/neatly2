import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, Text} from 'react-native';
import CustomText from '../common/CustomText';
import globalStyles from '../common/globalStyles';
import BackButton from '../common/BackButton';
import { registerUser } from '../../api/user';
import { registerRequest, registerFailure, registerSuccess } from '../../redux/actions/userActions';

type UserIdAndPasswordProps = {
  navigation: any;
};

const UserIdAndPassword: React.FC<UserIdAndPasswordProps> = ({navigation}) => {
  const [user, setUser] = useState({
    userName: '',
    password: '',
    confirm: ''
  })

  const [errors, setErrors] = useState({
    userNameError: '',
    passwordError: '',
    confirmError: ''
  })

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let isValid = true;

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!user.userName.match(emailPattern)) {
      isValid = false;
      setErrors(errors => ({...errors, userNameError: 'Invalid email format'}));
    } else {
      setErrors(errors => ({...errors, userNameError: ''}));
    }

    if (user.password === '') {
      isValid = false;
      setErrors(errors => ({...errors, passwordError: 'Password cannot be empty'}));
    } else if (user.password.length < 6) {
      isValid = false;
      setErrors(errors => ({...errors, passwordError: 'Password should be at least 6 characters long'}));
    } else {
      setErrors(errors => ({...errors, passwordError: ''}));
    }

    if (user.confirm !== user.password) {
      isValid = false;
      setErrors(errors => ({...errors, confirmError: 'Passwords do not match'}));
    } else {
      setErrors(errors => ({...errors, confirmError: ''}));
    }

    if (isValid) {
      try {
        // Here, make sure you're passing the `user` data to `registerUser`.
        dispatch(registerRequest())
        const registerResponse = await registerUser({
          username: user.userName,
          password: user.password,
        });

        dispatch(registerSuccess(user))
        return registerResponse
      } catch (e: any) {
        dispatch(registerFailure(e.message));
        return e
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
        <BackButton />          
          <CustomText style={styles.header}>Create your login</CustomText>
        </View>
        <View>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter Email"
            value={user.userName}
            onChangeText={text => setUser(prevState => ({...prevState, userName: text}))}
          />
          {errors.userNameError ? <Text style={styles.errorText}>{errors.userNameError}</Text> : null}
  
          <TextInput
            style={globalStyles.input}
            placeholder="Create Password"
            value={user.password}
            onChangeText={text => setUser(prevState => ({...prevState, password: text}))}
          />
          {errors.passwordError ? <Text style={styles.errorText}>{errors.passwordError}</Text> : null}
  
          <TextInput
            style={globalStyles.input}
            placeholder="Confirm Password"
            value={user.confirm}
            onChangeText={text => setUser(prevState => ({...prevState, confirm: text}))}
          />
          {errors.confirmError ? <Text style={styles.errorText}>{errors.confirmError}</Text> : null}
  
          <TouchableOpacity
            style={globalStyles.primaryButton}
            onPress={handleSubmit}>
            <CustomText style={globalStyles.buttonText}>Submit</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  
};

export default UserIdAndPassword;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
