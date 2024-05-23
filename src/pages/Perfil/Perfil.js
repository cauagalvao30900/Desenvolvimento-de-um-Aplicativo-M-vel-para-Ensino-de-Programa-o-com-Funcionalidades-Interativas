import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Example({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      navigation.navigate('Telaperfil');
    }
  };

  const handleLogin = async () => {
    if (form.email && form.password) {
      try {
        const userData = await AsyncStorage.getItem(form.email);
        
        if (userData) {
          const user = JSON.parse(userData);
          
          if (user.password === form.password) {
            navigation.navigate('Telaperfil');
          } else {
            alert('Email ou senha incorretos. Por favor, tente novamente.');
          }
        } else {
          alert('Nenhum usuário registrado encontrado com este email. Por favor, crie uma conta primeiro.');
        }
      } catch (error) {
        console.error('Erro ao ler os dados do usuário:', error);
        alert('Ocorreu um erro. Por favor, tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Singup');
  };

  const togglePasswordVisibility = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Olá!</Text>
          <Text style={styles.subtitle}>Entre ou Cadastre sua Conta</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="Email"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="Tech@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                autoCorrect={false}
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={[styles.inputControl, { flex: 1 }]}
                secureTextEntry={!form.showPassword}
                value={form.password}
              />
             
              <TouchableOpacity 
  onPress={togglePasswordVisibility}
  style={{ marginLeft: -24 }} // Adicionando marginLeft para mover o ícone para a esquerda
>
                <FontAwesomeIcon icon={form.showPassword ? faEye : faEyeSlash} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Entrar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.linkText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007aff',
    textDecorationLine: 'underline',
  },
});
