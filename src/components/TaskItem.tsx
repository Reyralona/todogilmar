import { completeTask, deleteTask } from "@/utils/task.utils";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

export default function TaskItem(props: {
    task: {
        id: number,
        title: string,
        done: boolean
    }
    params: {
        tasks: any,
        setTasks: any
    }
}) {



    const [completeModalVisible, setCompleteModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            navigationBarHidden: true
        })
    }, [completeModalVisible, deleteModalVisible])

    const handleCompleteTask = async () => {
        await completeTask(props.task.id).then((tasks) => props.params.setTasks(tasks))
    }

    const handleDeleteTask = async () => {
        await deleteTask(props.task.id).then((tasks) => props.params.setTasks(tasks))
    }

    return (

        <View
            className={props.task.done
                ? 'w-full border border-neutral-500 rounded-xl p-1 flex flex-row justify-between items-center bg-blue-500'
                : 'w-full border border-neutral-500 rounded-xl p-1 flex flex-row justify-between items-center'
            }
        >
            <TouchableOpacity className="flex-1 p-4" onPress={() => {
                if (!props.task.done) {
                    setCompleteModalVisible(true)

                }
            }}>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={completeModalVisible}
                    onRequestClose={() => { setCompleteModalVisible(!completeModalVisible) }}
                >
                    <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-5 border rounded-xl bg-white border-neutral-500">
                        <View className="flex gap-5">
                            <TouchableOpacity className="absolute top-[-20] right-[-20] p-5" onPress={() => { setCompleteModalVisible(!completeModalVisible) }}>
                                <Icon name="close" size={20} color="black"></Icon>
                            </TouchableOpacity>
                            <View className="mt-5 flex gap-5">
                                <Text className="text-xl">Marcar tarefa como concluída?</Text>
                                <TouchableOpacity className={`bg-blue-500 p-3 rounded-xl shadow-lg`} onPress={() => {
                                    handleCompleteTask()
                                    setCompleteModalVisible(!completeModalVisible)
                                }}>
                                    <Text className='text-center text-xl text-white'>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text className={`${props.task.done ? 'line-through text-white' : ''} text-xl`}>{props.task.title}</Text>
            </TouchableOpacity>


            <TouchableOpacity className='flex-row gap-2 p-5' onPress={() => {
                setDeleteModalVisible(true)
            }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={deleteModalVisible}
                    onRequestClose={() => { setDeleteModalVisible(!deleteModalVisible) }}
                >
                    <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-5 bg-white border rounded-xl border-neutral-500">
                        <View className="flex gap-5">
                            <TouchableOpacity className="absolute top-[-20] right-[-20] p-5" onPress={() => {
                                setDeleteModalVisible(!deleteModalVisible)
                            }}>
                                <Icon name="close" size={20} color="black"></Icon>
                            </TouchableOpacity>

                            <View className="mt-5 flex gap-5">
                                <Text className="text-xl text-black">Deseja excluir esta tarefa?</Text>
                                <TouchableOpacity className={`bg-blue-500 p-3 rounded-xl shadow-lg`} onPress={() => {
                                    handleDeleteTask()
                                    setDeleteModalVisible(!deleteModalVisible)
                                }}>
                                    <Text className='text-center text-xl text-white'>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Icon name="trash" color={props.task.done ? "#FFFFFF" : "#000000"} size={20}></Icon>
            </TouchableOpacity>
        </View>
    )
}