import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const items = [
  {
    icon: 'code',
    color: '#538bec',
    label: 'React',
    subtitle: 'Biblioteca JavaScript',
    options: [
      { label: 'Básico', screen: 'Rct' },
      { label: 'Intermediário', screen: 'Rstinter' },
      { label: 'Avançado', screen: 'Rstavanced' }
    ]
  },
  {
    icon: 'code',
    color: '#6959CD',
    label: 'PHP',
    subtitle: 'Linguagem de Programação',
    options: [
      { label: 'Básico', screen: 'phpbasic' },
      { label: 'Intermediário', screen: 'PHPOption2' },
      { label: 'Avançado', screen: 'PHPOption3' }
    ]
  },
  {
    icon: 'database',
    color: '#c8c85a',
    label: 'BANCO DE DADOS: SQL',
    subtitle: 'Linguagem de Consulta Estruturada',
    options: [
      { label: 'Básico', screen: 'bancobasico' },
      { label: 'Intermediário', screen: 'SQLOption2' },
      { label: 'Avançado', screen: 'SQLOption3' }
    ]
  },
  {
    icon: 'codepen',
    color: '#E34F26',
    label: 'HTML',
    subtitle: 'Linguagem de Marcação',
    options: [      
      { label: 'Básico', screen: 'basico5' },
      { label: 'Intermediário', screen: 'HTMLOption2' },
      { label: 'Avançado', screen: 'HTMLOption3' }
    ]
  },
  {
    icon: 'cpu',
    color: '#000',
    label: 'Hardware',
    subtitle: 'Componentes de Computador',
    options: [
      { label: 'Melhores Combinações', screen: 'HardwareOption1' },
      { label: 'Shop', screen: 'Shop' },
      { label: 'Gargalo', screen: 'PC bottleneck' }
    ]
  }
];

export default function Example() {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hideLabels, setHideLabels] = useState(items.map(() => false));

  const handlePressIcon = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    setHideLabels((prevState) =>
      prevState.map((val, idx) => (idx === index ? !val : false))
    );
  };

  const handlePressOption = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Documentações</Text>

        {items.map(({ icon, color, label, subtitle, options }, index) => (
          <View key={index} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handlePressIcon(index)}>
              <View style={[styles.iconContainer, { backgroundColor: color, borderWidth: 2, borderColor: '#000' }]}>
                <FeatherIcon color="#fff" name={icon} size={24} />
              </View>
            </TouchableOpacity>
            <View style={styles.itemLabelContainer}>
              {!hideLabels[index] && (
                <>
                  <Text style={styles.itemLabel}>{label}</Text>
                  <Text style={styles.subtitle}>{subtitle}</Text>
                </>
              )}
            </View>
            {expandedIndex === index && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
                {options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[styles.option, { backgroundColor: color }]}
                    onPress={() => handlePressOption(option.screen)}>
                    <Text style={styles.optionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 32,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemLabelContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#272727',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
