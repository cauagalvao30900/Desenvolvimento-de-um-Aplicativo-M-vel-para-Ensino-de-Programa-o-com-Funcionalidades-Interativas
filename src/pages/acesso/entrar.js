import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Routes');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    if (form.email && form.password) {
      setError(null); // Limpar erro antes de tentar login
      setLoading(true); // Mostrar carregamento durante a autenticação

      try {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        const userDoc = doc(firestore, 'users', user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          console.log('Dados do documento:', docSnapshot.data());
          navigation.navigate('Routes');
        } else {
          console.log('Nenhum documento encontrado para o UID:', user.uid);
          setError('Dados do usuário não encontrados.');
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        setError('Erro ao fazer login. Verifique suas credenciais.');
      } finally {
        setLoading(false); // Parar carregamento após a tentativa de login
      }
    } else {
      setError('Por favor, preencha todos os campos.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    navigation.navigate('Esqueceu');
  };

  const togglePasswordVisibility = () => {
    setForm((prevForm) => ({ ...prevForm, showPassword: !prevForm.showPassword }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Image source={require('../../../assets/loading.gif')} style={styles.loadingGif} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../../assets/tech.png')} style={styles.image} />
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Entre com sua conta</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setForm((prevForm) => ({ ...prevForm, email }))}
              placeholder="Tech@example.com"
              placeholderTextColor="#9ca3af"
              style={styles.inputControl}
              value={form.email}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                autoCorrect={false}
                onChangeText={(password) => setForm((prevForm) => ({ ...prevForm, password }))}
                placeholder="********"
                placeholderTextColor="#9ca3af"
                style={[styles.inputControl, styles.passwordInput]}
                secureTextEntry={!form.showPassword}
                value={form.password}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <FontAwesomeIcon icon={form.showPassword ? faEye : faEyeSlash} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
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
    flex: 1,
    backgroundColor: '#363636',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
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
    paddingHorizontal: 24,
  },
  inputGroup: {
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
    backgroundColor: '#363636',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  button: {
    width: '100%',
    borderRadius: 25,
    paddingVertical: 12,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#363636',
  },
  actions: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#00ffff',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#00ffff',
    textDecorationLine: 'underline',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingGif: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
