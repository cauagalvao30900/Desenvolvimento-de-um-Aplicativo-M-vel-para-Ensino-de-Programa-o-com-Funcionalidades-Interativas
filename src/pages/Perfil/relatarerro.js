import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase/app';
import { firestore } from '../../../services/firebaseConfig'; // Ajuste o caminho conforme necessário

const ReportError = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (description.trim() === '') {
      setErrorMessage('Por favor, insira a descrição do erro.');
      return;
    }

    try {
      await firestore.collection('errorReports').add({
        description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setDescription('');
      setErrorMessage('');
      Alert.alert('Sucesso', 'Relatório enviado com sucesso!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      setErrorMessage('Erro ao enviar o relatório. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descreva o erro:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descreva o problema aqui..."
        multiline
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ReportError;
