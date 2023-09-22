import React from 'react';
import { View } from 'react-native';
import TaskDetail from '../TaskDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;

  const handleDelete = async () => {
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      let tasks = [];

      if (existingTasks) {
        tasks = JSON.parse(existingTasks);
      }

      const updatedTasks = tasks.filter((t) => t.id !== task.id);

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      if (navigation.isFocused()) {
        navigation.navigate('Home', { deletedTask: task });
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <TaskDetail task={task} onDelete={handleDelete} />
    </View>
  );
};

export default TaskDetailScreen;
