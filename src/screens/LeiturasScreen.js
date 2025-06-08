import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLeituras, createLeitura, updateLeitura, deleteLeitura } from '../services/leituraService';
import LeituraForm from '../components/LeituraForm';
import Card from '../components/Card';
import { colors } from '../constants/colors';

export default function LeiturasScreen() {
  const [leituras, setLeituras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarLeituras();
  }, []);

  const carregarLeituras = async () => {
    setLoading(true);
    try {
      const response = await getLeituras();
      const processedLeituras = response.data.$values || response.data;
      setLeituras(processedLeituras);
    } catch (error) {
      console.error('Erro ao carregar leituras:', error);
      alert('Erro ao carregar leituras');
    }
    setLoading(false);
  };

  const handleSalvar = async (data) => {
    setSaving(true);
    try {
      if (editData) {
        await updateLeitura(editData.idLeitura, { ...editData, ...data });
        alert('Leitura atualizada com sucesso!');
      } else {
        await createLeitura(data);
        alert('Leitura criada com sucesso!');
      }
      setShowForm(false);
      setEditData(null);
      carregarLeituras();
    } catch (error) {
      console.error('Erro ao salvar leitura:', error);
      alert('Erro ao salvar leitura');
    }
    setSaving(false);
  };

  const handleEditar = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  const handleExcluir = (id) => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir esta leitura?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        try {
          await deleteLeitura(id);
          alert('Leitura excluída!');
          carregarLeituras();
        } catch {
          alert('Erro ao excluir leitura');
        }
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Leituras</Text>
      {showForm ? (
        <LeituraForm
          onSubmit={handleSalvar}
          initialData={editData}
          loading={saving}
          onCancel={() => { setShowForm(false); setEditData(null); }}
        />
      ) : (
        <>
          <TouchableOpacity 
            style={styles.novaLeituraButton}
            onPress={() => setShowForm(true)}
          >
            <Ionicons name="add-circle" size={24} color={colors.primary} />
            <Text style={styles.novaLeituraButtonText}>Nova Leitura</Text>
          </TouchableOpacity>

          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : (
            <FlatList
              data={leituras}
              keyExtractor={item => item.idLeitura?.toString()}
              renderItem={({ item }) => (
                <Card style={styles.itemCard}>
                  <Text style={styles.itemTitle}>Valor: {item.valorMedicao}</Text>
                  <Text style={styles.itemText}>Data/Hora: {new Date(item.timestampLeitura).toLocaleString()}</Text>
                  {item.sensor && (
                    <Text style={styles.itemText}>
                      Sensor: {item.sensor.tipoSensor} ({item.sensor.unidadeMedida})
                    </Text>
                  )}
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => handleEditar(item)} style={[styles.actionButton, styles.editButton]}>
                      <Ionicons name="create-outline" size={20} color={colors.onPrimaryContainer} />
                      <Text style={styles.actionButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleExcluir(item.idLeitura)} style={[styles.actionButton, styles.deleteButton]}>
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
            onPress={carregarLeituras}
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
  novaLeituraButton: {
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
  novaLeituraButtonText: {
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