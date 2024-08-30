import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessible={true}
          accessibilityLabel="Voltar"
          accessibilityHint="Volta para a tela anterior"
        >
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Política de Privacidade</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Coleta e Uso de Informações Pessoais</Text>
        <Text style={styles.paragraph}>
          Respeitamos a sua privacidade e estamos comprometidos em proteger suas informações pessoais.
          As informações fornecidas por você serão utilizadas para melhorar nossos serviços e personalizar sua experiência.
        </Text>
        <Text style={styles.paragraph}>
          Não compartilhamos suas informações pessoais com terceiros sem o seu consentimento,
          exceto quando necessário para fornecer um serviço solicitado por você.
        </Text>
        <Text style={styles.paragraph}>
          Podemos coletar e utilizar informações pessoais para os seguintes fins:
        </Text>
        <Text style={styles.listItem}>• Fornecer e manter nossos serviços</Text>
        <Text style={styles.listItem}>• Compreender e analisar o uso dos nossos serviços</Text>
        <Text style={styles.listItem}>• Personalizar sua experiência e fornecer conteúdo relevante</Text>
        <Text style={styles.listItem}>• Comunicar-se com você e responder às suas solicitações</Text>
        <Text style={styles.listItem}>• Proteger nossos direitos legais e evitar atividades fraudulentas</Text>

        <Text style={styles.sectionTitle}>Cookies</Text>
        <Text style={styles.paragraph}>
          Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso app e
          coletar informações sobre como você interage com nossos serviços. Você pode controlar o uso
          de cookies nas configurações do seu app.
        </Text>

        <Text style={styles.sectionTitle}>Segurança</Text>
        <Text style={styles.paragraph}>
          Estamos empenhados em proteger suas informações pessoais e adotamos medidas adequadas para
          garantir a segurança dos dados.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#00ffff',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contentContainer: {
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#00ffff',
  },
});
