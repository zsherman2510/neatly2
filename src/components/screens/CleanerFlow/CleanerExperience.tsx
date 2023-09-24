import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native';
import CustomText from '../../common/CustomText';
import globalStyles from '../../common/globalStyles';
import {useDispatch} from 'react-redux';
import { updateCleanerSpeciality } from '../../../redux/actions/cleanerActions';

type CleanerExperienceProps = {
    navigation: any;
};

const CleanerExperienceScreen: React.FC<CleanerExperienceProps> = ({ navigation }) => {
    const [cleaningExperience, setCleaningExperience] = useState<string>('');
    const [cleaningSpecialty, setCleaningSpecialty] = useState<string[]>([]);
    const [daysAvailable, setDaysAvailable] = useState<string[]>([]);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [hourlyRate, setHourlyRate] = useState<string>('');

    const specialties = ['Residential', 'Commercial', 'Industrial', 'Outdoor'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const dispatch = useDispatch();
    const toggleSelection = (array: string[], item: string) => {
        if (array.includes(item)) {
            return array.filter(i => i !== item);
        } else {
            return [...array, item];
        }
    }

    const validateExperience = (): boolean => {
      if (isNaN(+cleaningExperience) || +cleaningExperience < 0 || +cleaningExperience > 50) {
          setErrors(prev => ({ ...prev, cleaningExperience: 'Experience must be a number between 0 and 50.' }));
          return false;
      }
      return true;
  };

  const validateSpecialty = (): boolean => {
      if (cleaningSpecialty.length === 0) {
          setErrors(prev => ({ ...prev, cleaningSpecialty: 'Please select at least one specialty.' }));
          return false;
      }
      return true;
  };

  const validateDays = (): boolean => {
      if (daysAvailable.length === 0) {
          setErrors(prev => ({ ...prev, daysAvailable: 'Please select at least one day.' }));
          return false;
      }
      return true;
  };

  const validateHourlyRate = (): boolean => {
    if (isNaN(+hourlyRate) || +hourlyRate <= 0) {
        setErrors(prev => ({ ...prev, hourlyRate: 'Hourly rate must be a positive number.' }));
        return false;
    }
    return true;
};

  const handleSubmit = () => {
      const isExperienceValid = validateExperience();
      const isSpecialtyValid = validateSpecialty();
      const isDaysValid = validateDays();
      const isHourlyRateValid = validateHourlyRate();

      const userData = {
        cleaningExperience,
        cleaningSpecialty,
        daysAvailable,
        hourlyRate,
        // ... any other necessary fields
    };

      if (isExperienceValid && isSpecialtyValid && isDaysValid && isHourlyRateValid) {
          console.log('Submitted Cleaner Experience');
          dispatch(updateCleanerSpeciality(userData));
          navigation.navigate('CreateUser');
      }
  };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <CustomText style={styles.header}>Your Cleaning Experience</CustomText>
                <CustomText style={styles.subHeader}>
                    Provide details about your cleaning background and specialties.
                </CustomText>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Cleaning Experience (Years)"
                    placeholderTextColor="#000"
                    value={cleaningExperience}
                    onChangeText={setCleaningExperience}
                    keyboardType="numeric"
                />
                 {!!errors.cleaningExperience && <Text style={styles.errorText}>{errors.cleaningExperience}</Text>}
                <Text style={styles.label}>Specialities</Text>
                <View style={styles.multiSelectContainer}>
                 
                    {specialties.map(spec => (
                        <TouchableOpacity 
                            key={spec}
                            style={[styles.multiSelectItem, cleaningSpecialty.includes(spec) && styles.selectedItem]}
                            onPress={() => setCleaningSpecialty(prev => toggleSelection(prev, spec))}>
                            <Text>{spec}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {!!errors.cleaningSpecialty && <Text style={styles.errorText}>{errors.cleaningSpecialty}</Text>}


                <Text style={styles.label}>Days Available</Text>
                <View style={styles.multiSelectContainer}>
                 
                    {days.map(day => (
                        <TouchableOpacity 
                            key={day}
                            style={[styles.multiSelectItem, daysAvailable.includes(day) && styles.selectedItem]}
                            onPress={() => setDaysAvailable(prev => toggleSelection(prev, day))}>
                            <Text>{day}</Text>
                        </TouchableOpacity>
                    ))}
                    {!!errors.daysAvailable && <Text style={styles.errorText}>{errors.daysAvailable}</Text>}
                </View>

                <TextInput
                style={styles.input}
                placeholder="Hourly Rate"
                placeholderTextColor="#000"
                value={hourlyRate}
                onChangeText={setHourlyRate}
                keyboardType="numeric"
            />
            {!!errors.hourlyRate && <Text style={styles.errorText}>{errors.hourlyRate}</Text>}

                <TouchableOpacity
                    style={globalStyles.primaryButton}
                    onPress={() => {
                        // Handle form submission or navigation
                        // console.log('Submitted Cleaner Experience');
                        handleSubmit()
                    }}>
                    <CustomText style={styles.buttonText}>Next</CustomText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CleanerExperienceScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 30,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 15
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
    buttonText: {
        fontSize: 18,
    },
    multiSelectContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    multiSelectItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        margin: 5,
        backgroundColor: '#eee',
    },
    selectedItem: {
        backgroundColor: '#5CE1E6',
    },
    errorText: {
      color: 'red',
      marginTop: 5,
      marginLeft: 5,
  }
});
