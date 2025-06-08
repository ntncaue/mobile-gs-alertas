import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getEquipes, createEquipe, updateEquipe, deleteEquipe } from '../services/equipeService';
import EquipeForm from '../components/EquipeForm';
import Card from '../components/Card';
import { colors } from '../constants/colors';

export default function EquipesScreen() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarEquipes();
  }, []);

  const carregarEquipes = async () => {
    setLoading(true);
    try {
      const response = await getEquipes();
      const processedEquipes = response.data.$values || response.data;
      setEquipes(processedEquipes);
    } catch (error) {
      console.error('Erro ao carregar equipes:', error);
      alert('Erro ao carregar equipes');
    }
    setLoading(false);
  };

  const handleSalvar = async (data) => {
    setSaving(true);
    try {
      if (editData) {
        await updateEquipe(editData.idEquipe, { ...editData, ...data });
        alert('Equipe atualizada com sucesso!');
      } else {
        await createEquipe(data);
        alert('Equipe criada com sucesso!');
      }
      setShowForm(false);
      setEditData(null);
      carregarEquipes();
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      alert('Erro ao salvar equipe');
    }
    setSaving(false);
  };

  const handleEditar = (item) => {
    setEditData(item);
    setShowForm(true);
  };

  const handleExcluir = (id) => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir esta equipe?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        try {
          await deleteEquipe(id);
          alert('Equipe excluída!');
          carregarEquipes();
        } catch {
          alert('Erro ao excluir equipe');
        }
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento de Equipes</Text>
      {showForm ? (
        <EquipeForm
          onSubmit={handleSalvar}
          initialData={editData}
          loading={saving}
          onCancel={() => { setShowForm(false); setEditData(null); }}
        />
      ) : (
        <>
          <TouchableOpacity 
            style={styles.novaEquipeButton}
            onPress={() => setShowForm(true)}
          >
            <Ionicons name="add-circle" size={24} color={colors.primary} />
            <Text style={styles.novaEquipeButtonText}>Nova Equipe</Text>
          </TouchableOpacity>

          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : (
            <FlatList
              data={equipes}
              keyExtractor={item => item.idEquipe?.toString()}
              renderItem={({ item }) => (
                <Card style={styles.itemCard}>
                  <Text style={styles.itemTitle}>Nome: {item.nomeEquipe}</Text>
                  <Text style={styles.itemText}>Responsável: {item.responsavel}</Text>
                  <Text style={styles.itemText}>Contato: {item.contato}</Text>
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => handleEditar(item)} style={[styles.actionButton, styles.editButton]}>
                      <Ionicons name="create-outline" size={20} color={colors.onPrimaryContainer} />
                      <Text style={styles.actionButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleExcluir(item.idEquipe)} style={[styles.actionButton, styles.deleteButton]}>
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
            onPress={carregarEquipes}
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
  novaEquipeButton: {
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
  novaEquipeButtonText: {
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