import React from 'react';
import { View, StyleSheet } from 'react-native';
import CreateTask from '../CreateTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native'; 

const CreateTaskScreen = () => {
  const navigation = useNavigation();
  const handleCreate = async (newTask) => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      let tasks = [];

      if (existingTasks) {
        tasks = JSON.parse(existingTasks);
      }
      tasks.push(newTask);

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar la tarea en AsyncStorage:', error);
    }

    navigation.navigate('Home', { newTask });
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
