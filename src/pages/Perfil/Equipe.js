import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

const items = [
  {
    img: 'https://instagram.fsod8-1.fna.fbcdn.net/v/t51.2885-19/377272075_320038380544477_2747124553638511704_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsod8-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=_yuwzELd_r0AX8AjbOW&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAFSrOH0qxzcasj-U-27BwgAXja4UESkfSOR4MRj8GUDA&oe=65FD98AC&_nc_sid=8b3546',
    name: 'Cauã Galvão',
    details: 'Programador Mobile, 17 anos',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/1134949806679281714/1219281717484064869/Imagem_do_WhatsApp_de_2024-03-18_as_10.02.41_82e0e50a.jpg?ex=660abb96&is=65f84696&hm=ddafcad15056b56153e549fc0bd788117fbb7ddf3ad5f6eba428c53aa4a0e296&',
    name: 'Victor Hugo Schmidt Silva',
    details: 'Programador, Comunicador Direto, 18Anos',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/1134949806679281714/1219281747712278528/Imagem_do_WhatsApp_de_2024-03-18_as_10.25.32_879b222a.jpg?ex=660abb9d&is=65f8469d&hm=e0591deac201d35a2fea6736ff44d4acf235fd81589cbb6c4abc194f75995e42&',
    name: 'Tiago Rocha Ribeiro',
    details: 'Programador, Designer, 18Anos',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/1134949806679281714/1219302229161279488/Imagem_do_WhatsApp_de_2024-03-18_as_11.16.55_b479b139.jpg?ex=660aceb0&is=65f859b0&hm=e3a15a2ff2778ebcf38b985a430f6ba336c24086b872a6f974ac359a87d2d565&',
    name: 'Erick Silva',
    details: 'Programador Web, 17Anos',
  },
  {
    img: 'https://cdn.discordapp.com/attachments/1134949806679281714/1219281693555298335/Imagem_do_WhatsApp_de_2024-03-18_as_09.59.47_65a9d3f7.jpg?ex=660abb90&is=65f84690&hm=d265f3548b59f86a78405ebcb73362e2410caaa03c6912de41d1eb2ebf21161b&',
    name: 'Heitor Mota Avilla',
    details: 'Programador, 18Anos',
  },
  {
    img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    name: 'Guilherme Corrêa Narcizo',
    details: 'Programador Web, 18Anos',
  },
];

export default function Example() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (index) => {
    setSelectedMember(index);
  };

  const renderMemberPairs = () => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push(
        <View key={i} style={styles.pairContainer}>
          <TouchableOpacity
            style={styles.memberItem}
            onPress={() => handleMemberClick(i)}>
            <Image source={{ uri: items[i].img }} style={styles.memberItemImage} />
            <Text style={styles.memberItemName}>{items[i].name}</Text>
          </TouchableOpacity>
          {i + 1 < items.length && (
            <TouchableOpacity
              key={i + 1}
              style={styles.memberItem}
              onPress={() => handleMemberClick(i + 1)}>
              <Image source={{ uri: items[i + 1].img }} style={styles.memberItemImage} />
              <Text style={styles.memberItemName}>{items[i + 1].name}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return pairs;
  };

  const renderMemberDetails = () => {
    if (selectedMember !== null) {
      const member = items[selectedMember];
      return (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: member.img }} style={styles.memberImage} />
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberDetails}>{member.details}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedMember(null)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Nossa Equipe</Text>
          {/* Lista de membros da equipe */}
          {renderMemberPairs()}
          {/* Modal para exibir as informações do membro selecionado */}
          <Modal
            visible={selectedMember !== null}
            transparent={true}
            animationType="fade">
            {renderMemberDetails()}
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Cor do texto
    textTransform: 'uppercase', // Transforma o texto em maiúsculas
    letterSpacing: 2, // Espaçamento entre as letras
    fontFamily: 'Arial', // Fonte do texto
  },
  pairContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  memberItem: {
    width: '48%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberItemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  memberItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  memberImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  memberName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberDetails: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
