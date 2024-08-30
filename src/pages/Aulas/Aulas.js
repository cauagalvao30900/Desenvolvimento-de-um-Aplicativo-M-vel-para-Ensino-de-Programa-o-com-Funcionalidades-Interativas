import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const items = [
  {
    icon: 'code',
    color: '#538bec',
    label: 'React JS',
    subtitle: 'Aprenda a construir App com projetos EXPO',
    options: [{ label: 'Básico', screen: 'Rct' }]
  },
  {
    icon: 'code',
    color: '#6959CD',
    label: 'PHP',
    subtitle: 'Desenvolva aplicações web dinâmicas',
    options: [{ label: 'Básico', screen: 'phpbasic' }]
  },
  {
    icon: 'database',
    color: '#c8c85a',
    label: 'SQL',
    subtitle: 'Dominando o uso de bancos de dados',
    options: [{ label: 'Básico', screen: 'bancobasico' }]
  },
  {
    icon: 'codepen',
    color: '#E34F26',
    label: 'HTML',
    subtitle: 'Fundamentos do desenvolvimento web',
    options: [{ label: 'Básico', screen: 'basico5' }]
  },
];

export default function Example() {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handlePressIcon = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePressOption = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        </TouchableOpacity>
        <Text style={styles.title}>Documentações</Text>

        {items.map(({ icon, color, label, subtitle, options }, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => handlePressIcon(index)}>
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
            {expandedIndex === index && (
              <View style={styles.optionsContainer}>
                {options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[styles.option, { borderColor: color }]}
                    onPress={() => handlePressOption(option.screen)}
                  >
                    <Text style={[styles.optionText, { color: color }]}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#363636',
    borderRadius: 8,
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
  optionsContainer: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: -20,
    marginBottom: 20,
    backgroundColor: '#363636',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
