import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; // Importando o ícone de seta

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignUp = async () => {
    // Verifica se os campos de e-mail e senha estão preenchidos
    if (form.email && form.password) {
      try {
        // Verifica se já existe um usuário cadastrado com o mesmo e-mail
        const existingUser = await AsyncStorage.getItem(form.email);
  
        // Se já existir um usuário com o mesmo e-mail, exibe uma mensagem de erro
        if (existingUser) {
          alert('Este e-mail já está sendo usado por outro usuário. Por favor, escolha outro e-mail.');
          return;
        }
  
        // Cria um novo objeto de usuário com os dados fornecidos
        const newUser = {
          email: form.email,
          password: form.password,
        };
  
        // Armazena as informações do novo usuário no AsyncStorage
        await AsyncStorage.setItem(form.email, JSON.stringify(newUser));
  
        // Mostra um alerta informando que o cadastro foi realizado com sucesso
        Alert.alert('Cadastro realizado', 'Sua conta foi criada com sucesso!');
  
        // Redireciona para a tela de login após o cadastro bem-sucedido
        navigation.navigate('Perfil');
      } catch (error) {
        // Se ocorrer um erro durante o processo de cadastro, exibe uma mensagem de erro
        console.error('Erro ao criar a conta:', error);
        alert('Ocorreu um erro ao criar a conta. Por favor, tente novamente.');
      }
    } else {
      // Se algum dos campos estiver vazio, exibe um alerta solicitando que o usuário preencha todos os campos.
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>
        {/* Botão para voltar à página anterior */}
        <View style={styles.goBackContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#075eec" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{
              uri: 'https://cdn.discordapp.com/attachments/1134949806679281714/1222732496794554519/L.png?ex=66174960&is=6604d460&hm=6ec5ce8d2403b5c4fdd5f80b19484c396768778231aa2a7d1fb7f0244d240bbd&',
            }} />

          <Text style={styles.title}>
          Tela <Text style={{ color: '#53ecec' }}> de cadastro</Text>
          </Text>

          <Text style={styles.subtitle}>
            Crie sua conta 
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Adicionar Seu Email</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="Tech@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email} />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Senha</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password} />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignUp}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Criar conta!</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  goBackContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  /** Input */
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
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
