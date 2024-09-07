import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig'; 

export default function Esqueceu({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert('Sucesso', 'E-mail de redefinição de senha enviado!');
        navigation.navigate('Entrar');
      } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição de senha:', error);
        Alert.alert('Erro', error.message);
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Redefinir Senha</Text>
          <Text style={styles.subtitle}>Digite seu e-mail para receber um link de redefinição de senha</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              placeholder="Tech@example.com"
              placeholderTextColor="#9ca3af"
              style={styles.inputControl}
              value={email}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handlePasswordReset} style={styles.btn}>
              <Text style={styles.btnText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Entrar')}>
              <Text style={styles.linkText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#363636',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#363636',
  },
  goBackContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1, 
  },
  header: {
    marginBottom: 36,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#2a2a2a', 
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#00ffff', 
  },
  btn: {
    width: '100%',
    borderRadius: 25,
    paddingVertical: 12,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#363636',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#00ffff',
    textDecorationLine: 'underline',
  },
});
