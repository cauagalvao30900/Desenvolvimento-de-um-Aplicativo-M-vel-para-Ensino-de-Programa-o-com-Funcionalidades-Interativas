import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../../services/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    showPassword: false,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleSignUp = async () => {
    const { email, password, username } = form;

    if (!email || !password || !username) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'O e-mail fornecido é inválido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        email: email,
        username: username,
        createdAt: new Date(),
      });

      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Entrar');
      }, 2000);
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/weak-password':
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
        break;
      case 'auth/email-already-in-use':
        Alert.alert('Erro', 'Este e-mail já está em uso.');
        break;
      case 'auth/invalid-email':
        Alert.alert('Erro', 'O e-mail fornecido é inválido.');
        break;
      default:
        Alert.alert('Erro', 'Ocorreu um erro ao criar a conta. Por favor, tente novamente.');
    }
  };

  const togglePasswordVisibility = () => {
    setForm(prevForm => ({ ...prevForm, showPassword: !prevForm.showPassword }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{ uri: 'https://cdn.discordapp.com/attachments/1134949806679281714/1222732496794554519/L.png?ex=66174960&is=6604d460&hm=6ec5ce8d2403b5c4fdd5f80b19484c396768778231aa2a7d1fb7f0244d240bbd&' }}
          />

          <Text style={styles.title}>
            Tela <Text style={styles.highlight}>de cadastro</Text>
          </Text>

          <Text style={styles.subtitle}>Crie sua conta</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Nome de Usuário</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(username) => setForm(prevForm => ({ ...prevForm, username }))}
              placeholder="Seu nome de usuário"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.username}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Adicionar Seu Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setForm(prevForm => ({ ...prevForm, email }))}
              placeholder="Tech@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                autoCorrect={false}
                onChangeText={(password) => setForm(prevForm => ({ ...prevForm, password }))}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.passwordInput}
                secureTextEntry={!form.showPassword}
                value={form.password}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <FontAwesomeIcon icon={form.showPassword ? faEye : faEyeSlash} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignUp} style={styles.btn}>
              <Text style={styles.btnText}>Criar conta!</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Sua conta foi criada com sucesso!</Text>
            </View>
          </View>
        </Modal>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 0, // Remover qualquer padding no topo
  },
  goBackContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerImg: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
  },
  highlight: {
    color: '#53ecec',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  formAction: {
    marginTop: 16,
  },
  input: {
    width: '100%',
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
    backgroundColor: '#343434',
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
    width: '100%',
  },
  passwordInput: {
    height: 50,
    backgroundColor: '#343434',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#00ffff',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});
