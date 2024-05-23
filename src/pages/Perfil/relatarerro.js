import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function ReportErrorScreen({ navigation }) {
  const [errorDescription, setErrorDescription] = useState('');
  const [email, setEmail] = useState('');
  const [reported, setReported] = useState(false);

  const handleSubmit = () => {
    console.log('Erro relatado:', errorDescription);
    console.log('E-mail do usuário:', email);
    setReported(true);
    // Redirecionar de volta para a tela do perfil após relatar o erro
    navigation.navigate('Perfil');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatar Erro</Text>
      </View>
      {!reported ? (
        <View style={styles.form}>
          <Text style={styles.label}>Descreva o erro:</Text>
          <TextInput
            style={styles.input}
            multiline
            value={errorDescription}
            onChangeText={setErrorDescription}
          />
          <Text style={styles.label}>Seu e-mail (opcional):</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.reportedMessage}>
          <Text style={styles.reportedText}>O erro foi relatado com sucesso! Agradecemos pelo feedback.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:'30', 
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportedMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  reportedText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
