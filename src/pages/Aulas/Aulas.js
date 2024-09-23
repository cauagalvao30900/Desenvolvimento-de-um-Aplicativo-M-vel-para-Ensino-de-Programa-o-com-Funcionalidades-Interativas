import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const items = [
  {
    icon: 'code',
    color: '#538bec',
    label: 'React JS',
    subtitle: 'Aprenda a construir App com projetos EXPO',
    options: [{ label: 'Acessar Material', screen: 'Rct' }]
  },
  {
    icon: 'code',
    color: '#6959CD',
    label: 'PHP',
    subtitle: 'Desenvolva aplicações web dinâmicas',
    options: [{ label: 'Acessar Material', screen: 'phpbasic' }]
  },
  {
    icon: 'database',
    color: '#c8c85a',
    label: 'SQL',
    subtitle: 'Dominando o uso de bancos de dados',
    options: [{ label: 'Acessar Material', screen: 'bancobasico' }]
  },
  {
    icon: 'codepen',
    color: '#E34F26',
    label: 'HTML',
    subtitle: 'Fundamentos do desenvolvimento web',
    options: [{ label: 'Acessar Material', screen: 'basico5' }]
  },
];

export default function Example() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handlePressOption = (options) => {
    setSelectedOptions(options);
    setModalVisible(true);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
    toggleModal(); // Fecha o modal após a navegação
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FeatherIcon name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Material Didático</Text>

        {items.map(({ icon, color, label, subtitle, options }, index) => (
          <View key={index} style={styles.itemWrapper}>
            <TouchableOpacity onPress={() => handlePressOption(options)}>
              <View style={[styles.itemContainer, { borderColor: '#00ffff', borderWidth: 2, borderRadius: 10 }]}>
                <View style={[styles.iconContainer, { backgroundColor: color }]}>
                  <FeatherIcon color="#fff" name={icon} size={32} />
                </View>
                <View style={styles.itemLabelContainer}>
                  <Text style={styles.itemLabel}>{label}</Text>
                  <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Escolha uma opção</Text>
          {selectedOptions.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleNavigate(option.screen)} // Atualizado para fechar o modal após a navegação
              style={styles.modalOption}
            >
              <Text style={styles.modalOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545454',
  },
  scrollViewContent: {
    padding: 16,
    paddingTop: 150,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  itemWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#363636',
    borderRadius: 8,
    width: '100%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemLabelContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#565656',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#00ffff',
    borderWidth: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#3c3c3c',
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalOptionText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
