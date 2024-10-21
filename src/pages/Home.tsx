import { View, Text, Button, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import TaskItem from '@/components/TaskItem';
import { clearAsyncStorage, getTasks } from '@/utils/task.utils';
import { useFocusEffect } from '@react-navigation/native';


export default function Home({ navigation }) {

    const [tasks, setTasks] = useState([])

    useFocusEffect(
        useCallback(() => {
            getTasks().then((tasks) => {
                setTasks(tasks)                                
            })
        }, [])
    )
    

    return (
        <View className='flex-1 items-center gap-4'>
            <View className='w-full p-10'>
                <View className='w-full'>
                    <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('Adicionar Tarefa')}></Button>
                </View>
            </View>

            <ScrollView>
                <View className='flex flex-col gap-2 overflow-auto px-4'>
                    {/* <TaskItem task={{id: 1, name: "Tarefa 1", done: false}}></TaskItem>                     */}
                    {tasks && tasks.map((task) => {                        
                        return <TaskItem key={`task-${task["id"]}`} task={task}></TaskItem>
                    })}
                    {!tasks && <Text>Nenhuma tarefa</Text>}
                </View>
            </ScrollView>




        </View>
    )
}