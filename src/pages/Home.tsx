import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import TaskItem from '@/components/TaskItem';
import { clearAsyncStorage, getTasks } from '@/utils/task.utils';
import { useFocusEffect } from '@react-navigation/native';


export default function Home({ navigation }) {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks().then((tasks) => {
            setTasks(tasks)
        })
    }, [])

    return (
        <View className={`flex-1 items-center`}>
            <View className='w-full mt-5 mb-5 px-5'>
                <View className='w-full'>
                    <TouchableOpacity className={`bg-blue-500 p-3 rounded-xl shadow-lg`} onPress={() => navigation.navigate('Adicionar Tarefa', { tasks, setTasks })}>
                        <Text className='text-center text-xl text-white'>Adicionar Tarefa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <View className='flex flex-col gap-3 mb-16 overflow-auto px-5'>
                    {tasks && tasks.map((task) => {
                        return <TaskItem key={`task-${task["id"]}`} task={task} params={{ tasks, setTasks }}></TaskItem>
                    })}
                    {tasks.length === 0 && <Text className='text-center text-xl text'>Nenhuma tarefa</Text>}
                </View>
            </ScrollView>
        </View>
    )
}