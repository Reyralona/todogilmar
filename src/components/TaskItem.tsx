import { completeTask, deleteTask } from "@/utils/task.utils";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TaskItem(props: {
    task: {
        id: number,
        title: string,
        done: boolean
    }
}) {

    const [completeModalVisible, setCompleteModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleCompleteTask = async () => {
        await completeTask(props.task.id)
    }

    const handleDeleteTask = async () => {
        await deleteTask(props.task.id)
    }

    return (
        
        <View
            className={props.task.done
                ? 'w-full border-[0.5px] border-neutral-500 rounded p-3 flex flex-row justify-between items-center bg-blue-500'
                : 'w-full border-[0.5px] border-neutral-500 rounded p-3 flex flex-row justify-between items-center'
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
                    <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-5 bg-white border-[0.5px] rounded border-black">
                        <View className=" flex gap-5">
                            <TouchableOpacity className="items-end w-full" onPress={() => { setCompleteModalVisible(!completeModalVisible) }}>
                                <Icon name="close" size={20}></Icon>
                            </TouchableOpacity>
                            <Text className="text-2xl">Marcar tarefa como concluída?</Text>
                            <Button title="Confirmar" onPress={() => {
                                handleCompleteTask()
                                setCompleteModalVisible(!completeModalVisible)
                            }}></Button>
                        </View>
                    </View>
                </Modal>

                <Text className={`${props.task.done ? 'line-through text-white' : ''} text-2xl`}>{props.task.title}</Text>

            </TouchableOpacity>


            
            <TouchableOpacity className='flex-row gap-2 p-5' onPress={() => {
                if (props.task.done) {
                    setDeleteModalVisible(true)
                }
            }}>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={deleteModalVisible}
                    onRequestClose={() => { setDeleteModalVisible(!deleteModalVisible) }}
                >
                    <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-5 bg-white border-[0.5px] rounded border-black">
                        <View className=" flex gap-5">
                            <TouchableOpacity className="items-end w-full" onPress={() => { setDeleteModalVisible(!deleteModalVisible) }}>
                                <Icon name="close" size={20}></Icon>
                            </TouchableOpacity>
                            <Text className="text-2xl">Deseja excluir esta tarefa?</Text>
                            <Button title="Confirmar" onPress={() => {
                                handleDeleteTask()
                                setDeleteModalVisible(!deleteModalVisible)
                            }}></Button>
                        </View>
                    </View>
                </Modal>

                <Icon name="trash" color="red" size={20}></Icon>

            </TouchableOpacity>

            </View>
        


        // </Pressable>
    )
}