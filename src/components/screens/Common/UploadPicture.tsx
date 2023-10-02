import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import CustomText from "../../common/CustomText";
import { useDispatch } from "react-redux";
import { uploadProfilePicture } from "../../../redux/actions/cleanerActions";
import globalStyles from "../../common/globalStyles";

type ProfilePictureProps = {
  navigation: any; // You can also use the specific type from @react-navigation/native if you've set up navigation
};
const UploadPicture: React.FC<ProfilePictureProps> = ({ navigation }) => {
  const [image, setImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [imageURI, setImageURI] = useState<string>("");

  const dispatch = useDispatch();

  const askForLibraryPermissionsAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    return status;
  };
  
  const askForCameraPermissionsAsync = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    return status;
  };

  const pickImageFromLibrary = async () => {
    const permissionStatus = await askForLibraryPermissionsAsync();

    if (permissionStatus !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0]);
        setImageURI(result.assets[0].uri);
      } else {
        console.log("Image picking was cancelled.");
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  
  const takeNewPhoto = async () => {
    const permissionStatus = await askForCameraPermissionsAsync();

    if (permissionStatus !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImageURI(result.assets[0].uri);
        setImage(result.assets[0])
      } else {
        console.log("Photo capturing was cancelled.");
      }
    } catch (error) {
      console.error("Error capturing photo: ", error);
    }
  };


  const submitPhoto = () => {
    if (!imageURI) {
      alert("Please select an image before submitting.");
      return;
    }
    dispatch(uploadProfilePicture(image));
    navigation.navigate("LoginCapture");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.header}>Upload Profile Image</CustomText>
        <CustomText style={styles.subHeader}>
        As a cleaner, your profile picture leaves a lasting first impression. Please upload a clear and professional photo to enhance your profile and instill confidence in clients.

        </CustomText>
      </View>

      <View style={styles.documentContainer}>
        {image && (
          <>
          
          <CustomText style={styles.text}>Selected: {image?.fileName}</CustomText>
          
          <Image source={{ uri: image?.uri }} style={styles.imagePreview} />

          </>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[globalStyles.secondaryButton, styles.spacing]}
          onPress={pickImageFromLibrary}
        >
          <CustomText style={styles.buttonText}>Choose from Library</CustomText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[globalStyles.secondaryButton, styles.spacing]}
          onPress={takeNewPhoto}
        >
          <CustomText style={styles.buttonText}>Take a New Photo</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={submitPhoto}
        >
          <CustomText style={styles.buttonText}>Upload Image</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadPicture;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 30,
    backgroundColor: "#fff",
  },
  imagePreview: {
    width: 300,  // you can adjust as per your needs
    height: 300, // adjust as per your needs
    borderRadius: 10,  // optional, to have rounded edges
    marginBottom: 20,  // some spacing after the image
  },
  headerContainer: {
    padding: 15,
    borderRadius: 10, // Optionally added for a rounded corner box
    marginBottom: 20, // Added margin to space it out from the next elements
    marginTop: 20,
  },
  documentContainer: {
    flex: 1,
    marginBottom: 10,
  },
  buttonsContainer: {
    paddingBottom: 30, // padding at the bottom for aesthetics
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 25,
    lineHeight: 25,
    textAlign: "center",
  },
  spacing: {
    marginBottom: 15,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
  },
});
