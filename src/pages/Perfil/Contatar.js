import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactUsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    // Lógica para enviar a mensagem para o backend
    console.log('Nome:', name);
    console.log('E-mail:', email);
    console.log('Mensagem:', message);
    
    // Simula o envio bem-sucedido
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessible={true}
        accessibilityLabel="Voltar"
        accessibilityHint="Volta para a tela anterior"
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <Text style={styles.title}>Contate-nos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#ffffff"
        value={name}
        onChangeText={setName}
        accessible={true}
        accessibilityLabel="Nome"
        accessibilityHint="Digite seu nome completo"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#ffffff"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        accessible={true}
        accessibilityLabel="E-mail"
        accessibilityHint="Digite seu endereço de e-mail"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Mensagem"
        placeholderTextColor="#ffffff"
        multiline
        value={message}
        onChangeText={setMessage}
        accessible={true}
        accessibilityLabel="Mensagem"
        accessibilityHint="Digite sua mensagem"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        accessible={true}
        accessibilityLabel="Enviar Mensagem"
        accessibilityHint="Enviar sua mensagem para o suporte"
      >
        <Text style={styles.buttonText}>Enviar Mensagem</Text>
      </TouchableOpacity>

      {/* Modal de sucesso */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Mensagem enviada com sucesso!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#00ffff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#363636',
    color: '#ffffff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0fffff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#363636',
    fontSize: 18,
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
