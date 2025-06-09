import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSensores, createSensor, updateSensor, deleteSensor } from '../services/sensorService';
import SensorForm from '../components/SensorForm';
import Card from '../components/Card';
import { colors } from '../constants/colors';

export default function SensoresScreen() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarSensores();
  }, []);

  const carregarSensores = async () => {
    setLoading(true);
    try {
      console.log('SensoresScreen - Iniciando carregamento dos sensores');
      const response = await getSensores();
      console.log('SensoresScreen - Resposta bruta:', response);
      
      const sensoresSimplificados = response.data.$values || response.data;
      
      console.log('SensoresScreen - Sensores processados:', sensoresSimplificados);
      setSensores(sensoresSimplificados);
    } catch (error) {
      console.error('SensoresScreen - Erro ao carregar sensores:', error);
      alert('Erro ao carregar sensores');
    }
    setLoading(false);
  };

  const handleSalvar = async (data) => {
    setSaving(true);
    try {
      console.log('SensoresScreen - Iniciando salvamento do sensor');
      if (editData) {
        console.log('SensoresScreen - Atualizando sensor existente:', editData.idSensor);
        await updateSensor(editData.idSensor, { ...editData, ...data });
        alert('Sensor atualizado com sucesso!');
      } else {
        console.log('SensoresScreen - Criando novo sensor');
        const response = await createSensor(data);
        console.log('SensoresScreen - Resposta da API:', response);
        alert('Sensor criado com sucesso!');
      }
      setShowForm(false);
      setEditData(null);
      carregarSensores();
    } catch (error) {
      console.error('SensoresScreen - Erro ao salvar sensor:', error);
      console.error('SensoresScreen - Detalhes do erro:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert('Erro ao salvar sensor');
    }
    setSaving(false);
  };

  const handleEditar = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  const handleExcluir = (id) => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir este sensor?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        try {
          await deleteSensor(id);
          alert('Sensor excluído!');
          carregarSensores();
        } catch {
          alert('Erro ao excluir sensor');
        }
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Sensores</Text>
      {showForm ? (
        <SensorForm
          onSubmit={handleSalvar}
          initialData={editData}
          loading={saving}
          onCancel={() => { setShowForm(false); setEditData(null); }}
        />
      ) : (
        <>
          <TouchableOpacity 
            style={styles.novoSensorButton}
            onPress={() => setShowForm(true)}
          >
            <Ionicons name="add-circle" size={24} color={colors.primary} />
            <Text style={styles.novoSensorButtonText}>Novo Sensor</Text>
          </TouchableOpacity>

          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : (
            <FlatList
              data={sensores}
              keyExtractor={item => item.idSensor?.toString()}
              renderItem={({ item }) => (
                <Card style={styles.itemCard}>
                  <Text style={styles.itemTitle}>Tipo: {item.tipoSensor}</Text>
                  <Text style={styles.itemText}>Unidade: {item.unidadeMedida}</Text>
                  <Text style={styles.itemText}>Latitude: {item.latitude}</Text>
                  <Text style={styles.itemText}>Longitude: {item.longitude}</Text>
                  {item.areaMonitorada && (
                    <Text style={styles.itemText}>Área: {item.areaMonitorada.nomeArea}</Text>
                  )}
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => handleEditar(item)} style={[styles.actionButton, styles.editButton]}>
                      <Ionicons name="create-outline" size={20} color={colors.onPrimaryContainer} />
                      <Text style={styles.actionButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleExcluir(item.idSensor)} style={[styles.actionButton, styles.deleteButton]}>
                      <Ionicons name="trash-outline" size={20} color={colors.onErrorContainer} />
                      <Text style={styles.actionButtonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              )}
            />
          )}
          <TouchableOpacity 
            style={styles.recarregarButton}
            onPress={carregarSensores}
          >
            <Ionicons name="reload-circle-outline" size={24} color={colors.secondary} />
            <Text style={styles.recarregarButtonText}>Recarregar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: colors.primary, textAlign: 'center' },
  novoSensorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryContainer,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8, 
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  novoSensorButtonText: {
    marginLeft: 8,
    color: colors.onPrimaryContainer,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colors.onBackground,
  },
  itemCard: { marginBottom: 12, padding: 20 }, 
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: colors.onSurface, marginBottom: 4 },
  itemText: { fontSize: 14, color: colors.onSurfaceVariant, marginBottom: 2 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  actionButtonText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: colors.primaryContainer,
  },
  deleteButton: {
    backgroundColor: colors.errorContainer,
  },
  recarregarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryContainer, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recarregarButtonText: {
    marginLeft: 8,
    color: colors.onSecondaryContainer,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 