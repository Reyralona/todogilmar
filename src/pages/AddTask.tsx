import { addTask } from '@/utils/task.utils'
import { useState } from 'react'
import { Text, TextInput, View, Button } from 'react-native'

export default function AddTask({ navigation }) {

    const [text, setText] = useState("")

    const handleSubmit = async (title: string) => {        
        await addTask(title)
    }

    return (
        <View className='flex-1 justify-center items-center gap-10'>
            <View className='flex gap-5'>
                <View className='border-[0.5px] border-neutral-500 rounded w-96 p-5'>
                    <Text className="text-2xl font-bold">Insira o nome da tarefa</Text>
                    <TextInput className="text-xl p-5" placeholder='Título' onChangeText={setText}/>
                </View>
                <Button title="Adicionar" onPress={() => {
                    handleSubmit(text)
                    navigation.navigate("Minhas Tarefas")
                }}></Button>

            </View>
        </View>
    )
}
