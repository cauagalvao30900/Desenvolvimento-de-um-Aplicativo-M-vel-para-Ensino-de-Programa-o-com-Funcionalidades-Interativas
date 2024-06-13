import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, Text, Switch, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { auth, storage } from '../../../services/firebaseConfig'; // Verifique o caminho correto para o firebaseConfig
import { onAuthStateChanged } from 'firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const tabs = [

];

export default function Example() {
  const [value, setValue] = useState(0);
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [nome, setNome] = useState('Seu Nome');
  const [biografia, setBiografia] = useState('Sua biografia...');
  const [profileImage, setProfileImage] = useState('https://static.vecteezy.com/ti/vetor-gratis/p3/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setNome(user.email); // Definir o email do usuário como nome
        // Você também pode buscar a URL da foto de perfil do usuário aqui, se estiver armazenada no banco de dados
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        console.log('Image source: ', source);

        // Faça o upload da imagem para o Firebase Storage
        const uploadUri = response.assets[0].uri;
        const user = auth.currentUser;
        const storageRef = ref(storage, `profile_images/${user.uid}`);

        try {
          const responseFetch = await fetch(uploadUri);
          const blob = await responseFetch.blob();

          const snapshot = await uploadBytes(storageRef, blob);
          console.log('Uploaded a blob or file!', snapshot);

          const downloadURL = await getDownloadURL(snapshot.ref);
          setProfileImage(downloadURL);
          // Aqui, você pode atualizar o perfil do usuário no banco de dados com a nova URL da imagem
        } catch (error) {
          console.error('Upload failed', error);
          Alert.alert('Erro', 'Falha ao enviar a imagem. Tente novamente mais tarde.');
        }
      }
    });
  };

  const saveUpdates = () => {
    // Aqui você implementará a lógica para salvar as atualizações no email cadastrado
  };

  const salvarAlteracoes = () => {
    console.log('Novo nome:', nome);
    console.log('Nova biografia:', biografia);

    // Aqui você enviaria os novos dados para o backend e atualizaria o perfil no banco de dados

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleImagePicker}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileAvatar}
              />
            </TouchableOpacity>
            <View>
              <TextInput
                style={styles.profileName}
                value={nome}
                onChangeText={setNome}
                placeholder="Seu Nome"
                placeholderTextColor="#a9a9a9"
              />
              <TextInput
                style={styles.profileHandle}
                value={biografia}
                onChangeText={setBiografia}
                placeholder="Sua biografia..."
                placeholderTextColor="#a9a9a9"
              />
            </View>
          </View>

        </View>

        <View style={styles.tabs}>
          {tabs.map(({ name, icon }, index) => {
            const isActive = index === value;

            return (
              <View
                key={name}
                style={[
                  styles.tabWrapper,
                  isActive && { borderBottomColor: '#6366f1' },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                  }}>
                  <View style={styles.tab}>
                    <FeatherIcon
                      color={isActive ? '#6366f1' : '#6b7280'}
                      name={icon}
                      size={16}
                    />
                    <Text
                      style={[
                        styles.tabText,
                        isActive && { color: '#6366f1' },
                      ]}>
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {value === 0 && (
          <ScrollView>
            <View style={styles.section}>
              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Atualizações por Gmail</Text>
                    <View style={styles.rowSpacer} />
                    <Switch
                      onValueChange={emailNotifications =>
                        setForm({ ...form, emailNotifications })
                      }
                      style={{
                        transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                      }}
                      value={form.emailNotifications}
                    />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Ativar Notificação</Text>
                    <View style={styles.rowSpacer} />
                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({ ...form, pushNotifications })
                      }
                      style={{
                        transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                      }}
                      value={form.pushNotifications}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contatos</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Contatar');
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Contatar-nos</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#000000"
                      name="mail"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('relatarerro');
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Reportar erro</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#FF0000"
                      name="alert-triangle"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Equipe');
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Sobre nós</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#FFD700"
                      name="info"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

               
                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('privacidade');
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Termos de privacidade</Text>
                    <View style={styles.rowSpacer} />
                    <FeatherIcon
                      color="#0000FF"
                      name="shield"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 14,
    color: '#666',
  },
  profileAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  profileActionText: {
    color: '#3182CE',
    marginRight: 8,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    marginBottom: 16,
  },
  tabWrapper: {
    paddingBottom: 12,
    marginRight: 24,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionBody: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rowFirst: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
  },
  rowSpacer: {
    width: 8,
  },
});

