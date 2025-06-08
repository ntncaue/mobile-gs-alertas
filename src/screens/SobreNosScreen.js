import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function SobreNosScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Sobre Nós</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
        <Text style={styles.paragraph}>
          O aplicativo GS Alertas de Incêndio é uma ferramenta desenvolvida para auxiliar no monitoramento e gestão de áreas de risco, especialmente florestas e regiões suscetíveis a incêndios. Ele permite o registro de sensores, áreas monitoradas, equipes de resposta e alertas de incêndio, proporcionando uma visão geral rápida e eficiente da situação.
        </Text>
        <Text style={styles.paragraph}>
          Com funcionalidades de cadastro, edição e exclusão de dados, além de um dashboard intuitivo, o objetivo é otimizar a resposta a emergências e prevenir desastres ambientais, garantindo a segurança e a proteção do meio ambiente.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desenvolvedores</Text>

        <View style={styles.developerCard}>
          <Ionicons name="logo-github" size={28} color={colors.primary} />
          <View style={styles.developerInfo}>
            <Text style={styles.developerName}>Antonio C.</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/ntncaue')}>
              <Text style={styles.githubLink}>github.com/ntncaue</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.developerCard}>
          <Ionicons name="logo-github" size={28} color={colors.primary} />
          <View style={styles.developerInfo}>
            <Text style={styles.developerName}>Marcelo Siqueira</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/marcelooou')}>
              <Text style={styles.githubLink}>github.com/marcelooou</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.developerCard}>
          <Ionicons name="logo-github" size={28} color={colors.primary} />
          <View style={styles.developerInfo}>
            <Text style={styles.developerName}>Felipe Orikasa</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://github.com/felipeorikasa')}>
              <Text style={styles.githubLink}>github.com/felipeorikasa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: colors.primary,
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.onSurface,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurfaceVariant,
    marginBottom: 12,
  },
  developerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  developerInfo: {
    marginLeft: 12,
  },
  developerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  githubLink: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
}); 