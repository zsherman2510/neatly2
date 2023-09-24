import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import CustomText from "../../common/CustomText";
import { useDispatch } from "react-redux";
import { updateCleanerDocuments } from "../../../redux/actions/cleanerActions";
import globalStyles from "../../common/globalStyles";

type DocumentProps = {
  navigation: any; // You can also use the specific type from @react-navigation/native if you've set up navigation
};
const DocumentUploader: React.FC<DocumentProps> = ({ navigation }) => {
  const [document, setDocument] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [documentURI, setDocumentURI] = useState<string>("");

  const dispatch = useDispatch();
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled) {
        setDocument(result.assets[0]);
        setDocumentURI(result.assets[0].uri);
      } else {
        console.log("Document picking was cancelled.");
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  const submitDocuments = () => {
    dispatch(updateCleanerDocuments(documentURI));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.header}>Upload Documents</CustomText>
        <CustomText style={styles.subHeader}>
          As a cleaner, it's important to showcase your qualifications. Please
          upload any valuable cleaning-related documents, such as training,
          certificates, etc., to enhance your profile.
        </CustomText>
      </View>

      <View style={styles.documentContainer}>
        {document && (
          <CustomText style={styles.text}>Selected: {document.name}</CustomText>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[globalStyles.secondaryButton, styles.spacing]}
          onPress={pickDocument}
        >
          <CustomText style={styles.buttonText}>Pick Document</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={submitDocuments}
        >
          <CustomText style={styles.buttonText}>Submit Documents</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CleanerGetStarted");
          }}
        >
          <CustomText style={[globalStyles.hyperlink, styles.spacing]}>Skip Document Selection</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentUploader;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 30,
    backgroundColor: "#fff",
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
