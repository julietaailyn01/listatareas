import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Importa el conjunto de iconos MaterialIcons

const TaskDetail = ({ task, onDelete }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text>
            <MaterialIcons name="keyboard-arrow-left" size={36} color="white" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="date-range" size={24} color="white" style={styles.icon} />
          <Text style={styles.date}>{task.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="access-time" size={24} color="white" style={styles.icon} />
          <Text style={styles.time}>{task.time || ''}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <MaterialIcons name="description" size={36} color="white" style={styles.icon} />
          <Text style={styles.description}>{task.description}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onDelete(task)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#333',
  },
  backButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  date: {
    fontSize: 18,
    color: 'white',
  },
  time: {
    fontSize: 18,
    color: 'white',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    lineHeight: 26,
    color: 'white',
    flex: 1, // Para que ocupe el espacio restante horizontalmente
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskDetail;
