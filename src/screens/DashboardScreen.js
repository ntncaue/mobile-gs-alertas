import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import { colors } from '../constants/colors';
import { getAlertas } from '../services/alertaService';
import { getSensores } from '../services/sensorService';
import { getAreas } from '../services/areaService';
import { getEquipes } from '../services/equipeService';
import { getLeituras } from '../services/leituraService';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const [summary, setSummary] = useState({
    alertas: 0,
    sensores: 0,
    areas: 0,
    equipes: 0,
    leituras: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchSummaryData = useCallback(async () => {
    setLoading(true);
    try {
      const [alertasRes, sensoresRes, areasRes, equipesRes, leiturasRes] = await Promise.all([
        getAlertas(),
        getSensores(),
        getAreas(),
        getEquipes(),
        getLeituras(),
      ]);

      const processedSensores = sensoresRes.data.$values || sensoresRes.data; // Handle potential $values
      const processedAreas = areasRes.data.$values || areasRes.data; // Handle potential $values
      const processedAlertas = alertasRes.data.$values || alertasRes.data; // Handle potential $values
      const processedEquipes = equipesRes.data.$values || equipesRes.data; // Handle potential $values
      const processedLeituras = leiturasRes.data.$values || leiturasRes.data; // Handle potential $values

      setSummary({
        alertas: processedAlertas.length,
        sensores: processedSensores.length,
        areas: processedAreas.length,
        equipes: processedEquipes.length,
        leituras: processedLeituras.length,
      });
    } catch (error) {
      alert('Erro ao carregar dados do dashboard');
      console.error("Erro ao carregar dados do dashboard:", error);
    }
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSummaryData();
    }, [fetchSummaryData])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Visão Geral do Sistema</Text>

      {loading ? (
        <Text style={styles.loadingText}>Carregando resumo...</Text>
      ) : (
        <View style={styles.summaryGrid}>
          <TouchableOpacity onPress={() => navigation.navigate('Alertas')} activeOpacity={0.7} style={styles.topCardContainer}>
            <Card style={styles.summaryCard}>
              <Ionicons name="alert-circle-outline" size={32} color={colors.error} />
              <Text style={styles.cardTitle}>Alertas de Incêndio</Text>
              <Text style={styles.cardValue}>{summary.alertas}</Text>
            </Card>
          </TouchableOpacity>

          <View style={styles.bottomGrid}>
            <TouchableOpacity onPress={() => navigation.navigate('Sensores')} activeOpacity={0.7} style={styles.dashboardCardContainer}>
              <Card style={styles.summaryCard}>
                <Ionicons name="hardware-chip-outline" size={32} color={colors.primary} />
                <Text style={styles.cardTitle}>Sensores Registrados</Text>
                <Text style={styles.cardValue}>{summary.sensores}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Áreas')} activeOpacity={0.7} style={styles.dashboardCardContainer}>
              <Card style={styles.summaryCard}>
                <Ionicons name="map-outline" size={32} color={colors.secondary} />
                <Text style={styles.cardTitle}>Áreas Monitoradas</Text>
                <Text style={styles.cardValue}>{summary.areas}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Equipes')} activeOpacity={0.7} style={styles.dashboardCardContainer}>
              <Card style={styles.summaryCard}>
                <Ionicons name="people-outline" size={32} color={colors.tertiary} />
                <Text style={styles.cardTitle}>Equipes de Resposta</Text>
                <Text style={styles.cardValue}>{summary.equipes}</Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Leituras')} activeOpacity={0.7} style={styles.dashboardCardContainer}>
              <Card style={styles.summaryCard}>
                <Ionicons name="analytics-outline" size={32} color={colors.onPrimaryContainer} />
                <Text style={styles.cardTitle}>Leituras de Sensores</Text>
                <Text style={styles.cardValue}>{summary.leituras}</Text>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: colors.onBackground,
  },
  summaryGrid: {
    // Removendo flexbox daqui, agora é apenas um container para o card superior e a grade inferior
  },
  topCardContainer: {
    width: '100%',
    marginBottom: 16,
  },
  bottomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardCardContainer: {
    flexBasis: '48%',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.onSurfaceVariant,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 4,
  },
}); 