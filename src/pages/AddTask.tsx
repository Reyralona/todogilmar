import { addTask } from '@/utils/task.utils'
import { useState } from 'react'
import { Text, TextInput, View, Button, Alert, TouchableOpacity } from 'react-native'

export default function AddTask({ route, navigation }) {

    const [text, setText] = useState("")
    const { tasks, setTasks } = route.params

    const handleSubmit = async (title: string) => {
        await addTask(title).then((tasks) => setTasks(tasks))
    }

    return (
        <View className='flex-1 justify-center items-center gap-10'>

            <View className='w-96 p-5 flex gap-6'>
                <View className='flex gap-3'>
                    <Text className="text-xl font-bold text-black">Insira o nome da tarefa</Text>
                    <TextInput className="text-xl p-5 border rounded-xl border-neutral-500" placeholder="Tarefa" onChangeText={setText} />
                </View>
                <TouchableOpacity className={`bg-blue-500 p-3 rounded-xl shadow-lg`} onPress={() => {
                    if (text === "") {
                        Alert.alert("Atenção", "Insira um título para a tarefa")
                    } else {
                        handleSubmit(text)
                        navigation.navigate("Minhas Tarefas")
                    }
                }}>
                    <Text className='text-center text-xl text-white'>Adicionar Tarefa</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )
}
