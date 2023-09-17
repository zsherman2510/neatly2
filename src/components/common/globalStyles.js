import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  primaryButton: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#5CE1E6',
    alignItems: 'center', // Adjust this if you need another color for the button
  },
  secondaryButton: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center', 
    borderColor: '#5CE1E6',
    borderWidth: 2
  },
  hyperlink: {
    textDecorationLine: 'underline',
    color: 'blue',
    textAlign: 'center'
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
});

export default globalStyles;