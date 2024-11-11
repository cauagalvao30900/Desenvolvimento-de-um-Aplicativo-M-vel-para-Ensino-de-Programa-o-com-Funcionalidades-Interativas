import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const items = [
  {
    icon: 'code',
    color: '#538bec',
    label: 'React JS',
    subtitle: 'Aprenda a construir App com projetos EXPO',
    screen: 'Rct'
  },
  {
    icon: 'code',
    color: '#6959CD',
    label: 'PHP',
    subtitle: 'Desenvolva aplicações web dinâmicas',
    screen: 'phpbasic'
  },
  {
    icon: 'database',
    color: '#c8c85a',
    label: 'SQL',
    subtitle: 'Dominando o uso de bancos de dados',
    screen: 'bancobasico'
  },
  {
    icon: 'codepen',
    color: '#E34F26',
    label: 'HTML',
    subtitle: 'Fundamentos do desenvolvimento web',
    screen: 'basico5'
  },
];

export default function Example() {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Material Didático</Text>

        {items.map(({ icon, color, label, subtitle, screen }, index) => (
          <View key={index} style={styles.itemWrapper}>
            <TouchableOpacity onPress={() => handleNavigate(screen)}>
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
});
