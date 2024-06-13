import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig'; // Verifique o caminho correto para o firebaseConfig

export default function Example({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('routes'); // Navegar para 'routes' se o usuário estiver logado
      }
      setLoading(false); // Defina loading como falso depois de verificar o estado de autenticação
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (form.email && form.password) {
      try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        navigation.navigate('routes'); // Navegar para 'routes' após o login bem-sucedido
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        Alert.alert('Erro', error.message);
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Singup'); // Verifique o nome correto da rota para a tela de cadastro
  };

  const togglePasswordVisibility = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo!</Text>
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
