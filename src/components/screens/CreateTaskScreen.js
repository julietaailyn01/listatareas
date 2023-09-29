import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CreateTask from '../CreateTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CreateTaskScreen = () => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const handleCreate = async (newTask) => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      let tasks = [];

      if (existingTasks) {
        tasks = JSON.parse(existingTasks);
      }

      tasks.push(newTask);

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.navigate('Home', { newTask });
    } catch (error) {
      console.error('Error al guardar la tarea en AsyncStorage:', error);
      setError('Hubo un error al guardar la tarea. Por favor, inténtalo de nuevo.');
      // Puedes mostrar una alerta al usuario para informar sobre el error.
      Alert.alert('Error', 'Hubo un error al guardar la tarea. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <CreateTask onCreate={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateTaskScreen;

