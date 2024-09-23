import React, { useState, useEffect } from 'react';
import {
  StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, Text, Switch, Image, Alert, TextInput, Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { auth, storage, firestore } from '../../../services/firebaseConfig';
import { onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const [nome, setNome] = useState('');
  const [profileImage, setProfileImage] = useState('https://static.vecteezy.com/ti/vetor-gratis/p3/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg');
  const [email, setEmail] = useState('');
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [rewards, setRewards] = useState([
    { id: 1, title: 'Nível 1: Novato', description: 'Usou o app por 30 minutos', time: 30 },
    { id: 2, title: 'Nível 2: Regular', description: 'Usou o app por 45 minutos', time: 45 },
    { id: 3, title: 'Nível 3: Veterano', description: 'Usou o app por 1 hora e 15 minutos', time: 75 },
    { id: 4, title: 'Nível 4: Experiente', description: 'Usou o app por 1 hora e 30 minutos', time: 90 },
    { id: 5, title: 'Nível 5: Mestre', description: 'Usou o app por 24 horas', time: 1440 },
  ]);
  const [userRewards, setUserRewards] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        console.error('Falha ao configurar persistência', error);
      });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        const docRef = doc(firestore, `users/${user.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome || '');
          setProfileImage(data.profileImage || profileImage);
          setProgress(data.progress || 0);
          setUserRewards(data.rewards || []);
        }
      } else {
        navigation.navigate('Entrar');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 60000);
      setProgress(elapsed);
      checkForRewards(elapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const checkForRewards = async (elapsedTime) => {
    const newReward = rewards.find(r => elapsedTime >= r.time && !userRewards.includes(r.title));
    if (newReward) {
      const updatedRewards = [...userRewards, newReward.title];
      setUserRewards(updatedRewards);

      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(firestore, `users/${user.uid}`), { rewards: updatedRewards, progress: elapsedTime }, { merge: true });
      }
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uploadUri = response.assets[0].uri;
        const user = auth.currentUser;
        if (user) {
          const storageRef = ref(storage, `profile_images/${user.uid}/${new Date().toISOString()}.jpg`);
          try {
            const responseFetch = await fetch(uploadUri);
            const blob = await responseFetch.blob();
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setProfileImage(downloadURL);
            await setDoc(doc(firestore, `users/${user.uid}`), { profileImage: downloadURL }, { merge: true });
          } catch (error) {
            console.error('Upload failed', error);
            Alert.alert('Erro', 'Falha ao enviar a imagem. Tente novamente mais tarde.');
          }
        } else {
          Alert.alert('Erro', 'Usuário não autenticado. Faça login e tente novamente.');
        }
      }
    });
  };

  const salvarAlteracoes = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(firestore, `users/${user.uid}`), {
          nome,
          progress,
          rewards: userRewards,
        }, { merge: true });
        Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
      } catch (error) {
        console.error('Falha ao atualizar informações', error);
        Alert.alert('Erro', 'Falha ao atualizar informações. Tente novamente mais tarde.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Entrar' }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Falha ao sair da conta. Tente novamente mais tarde.');
    }
  };

  const handleRewardClick = (reward) => {
    setModalVisible(false);
  };

  const getUserLevel = (progress) => {
    if (progress >= 1440) return 'Mestre';
    if (progress >= 90) return 'Experiente';
    if (progress >= 75) return 'Veterano';
    if (progress >= 45) return 'Regular';
    if (progress >= 30) return 'Novato';
    return 'Iniciante';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image source={{ uri: profileImage }} style={styles.profileAvatar} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.emailText}>{email}</Text>
            <TextInput
              style={styles.profileName}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
              placeholderTextColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Nível Atual: {getUserLevel(progress)}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.medalIcon}>
              <FeatherIcon color="#00ffff" name="award" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View style={styles.rowWrapper}>
              <Text style={styles.rowLabel}>Atualizações por Gmail</Text>
              <Switch
                onValueChange={emailNotifications => setForm({ ...form, emailNotifications })}
                value={form.emailNotifications}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <TouchableOpacity onPress={() => { navigation.navigate('Contatar'); }} style={styles.rowWrapper}>
              <Text style={styles.rowLabel}>Contatar-nos</Text>
              <FeatherIcon color="#ffffff" name="mail" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('relatarerro'); }} style={styles.rowWrapper}>
              <Text style={styles.rowLabel}>Reportar erro</Text>
              <FeatherIcon color="#FF0000" name="alert-triangle" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('privacidade'); }} style={styles.rowWrapper}>
              <Text style={styles.rowLabel}>Política de privacidade</Text>
              <FeatherIcon color="#ffffff" name="lock" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.rowWrapper}>
              <Text style={styles.rowLabel}>Sair</Text>
              <FeatherIcon color="#ffffff" name="log-out" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}></Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Recompensas</Text>
            {rewards.map((reward) => (
              <TouchableOpacity key={reward.id} onPress={() => handleRewardClick(reward)} style={styles.rewardItem}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDescription}>{reward.description}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#565656',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 150, // Adicionado para mover o conteúdo para baixo
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  emailText: {
    fontSize: 16,
    color: '#ffffff',
  },
  profileName: {
    fontSize: 18,
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#00ffff',
    paddingBottom: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionBody: {
    backgroundColor: '#444',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 16,
    color: '#ffffff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    color: '#ffffff',
  },
  medalIcon: {
    padding: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#444',
    padding: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00ffff',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  rewardItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#00ffff',
  },
  rewardTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#ffffff',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
