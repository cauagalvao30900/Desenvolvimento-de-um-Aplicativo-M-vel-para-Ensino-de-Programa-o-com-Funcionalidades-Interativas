import React, { useState } from 'react';
import { View, TextInput, Alert, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, Modal } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from '../../../services/firebaseConfig'; // Adjust the path as necessary
import { Ionicons } from '@expo/vector-icons';

const ReportError = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    if (description.trim() === '') {
      setErrorMessage('Please enter a description of the error.');
      return;
    }

    try {
      await firestore.collection('errorReports').add({
        description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setDescription('');
      setErrorMessage('');
      setModalVisible(true);
    } catch (error) {
      setErrorMessage('Error sending the report. Please try again.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessible={true}
        accessibilityLabel="Back"
        accessibilityHint="Go back to the previous screen"
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <Text style={styles.title}>Reportar Erro</Text>
      <Text style={styles.label}>Descreva o erro:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the problem here..."
        multiline
        numberOfLines={6}
        accessible={true}
        accessibilityLabel="Error description"
        accessibilityHint="Enter a detailed description of the problem"
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        accessible={true}
        accessibilityLabel="Submit Report"
        accessibilityHint="Submit your error report"
      >
        <Text style={styles.buttonText}>Reportar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        accessible={true}
        accessibilityLabel="Cancel"
        accessibilityHint="Cancel the report submission and go back"
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Reportado erro com sucesso!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#363636',
  },
  backButton: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00ffff',
    padding: 15,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#363636',
    marginBottom: 20,
    textAlignVertical: 'top',
    color: '#ffffff',
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ffff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#363636',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  cancelButtonText: {
    color: '#00ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#00ffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportError;
