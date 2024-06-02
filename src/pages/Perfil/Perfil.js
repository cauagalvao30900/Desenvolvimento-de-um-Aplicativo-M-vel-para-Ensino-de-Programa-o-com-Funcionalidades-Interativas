import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
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
            Alert.alert('Erro', 'Email ou senha incorretos. Por favor, tente novamente.');
          }
        } else {
          Alert.alert('Erro', 'Nenhum usuário registrado encontrado com este email. Por favor, crie uma conta primeiro.');
        }
      } catch (error) {
        console.error('Erro ao ler os dados do usuário:', error);
        Alert.alert('Erro', 'Ocorreu um erro. Por favor, tente novamente.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Singup');
  };

  const togglePasswordVisibility = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Entre com sua conta</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="Tech@example.com"
              placeholderTextColor="#9ca3af"
              style={styles.inputControl}
              value={form.email}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                autoCorrect={false}
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#9ca3af"
                style={[styles.inputControl, { flex: 1 }]}
                secureTextEntry={!form.showPassword}
                value={form.password}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <FontAwesomeIcon icon={form.showPassword ? faEye : faEyeSlash} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin} style={styles.btn}>
              <Text style={styles.btnText}>Entrar</Text>
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
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginVertical: 36,
    alignItems: 'center',
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
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: -30,
  },
  btn: {
    width: '100%',
    borderRadius: 25,
    paddingVertical: 12,
    backgroundColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007aff',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});
