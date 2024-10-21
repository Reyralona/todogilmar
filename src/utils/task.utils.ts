import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
    console.log({ key, value })
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (err) {
        console.error("Error saving data", err)
    }
}

export const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null; // Convert back to original value
    } catch (e) {
        // error reading value
        console.error("Error reading data", e);
    }
};


export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // error removing value
        console.error("Error removing data", e);
    }
};

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Async Storage has been cleared.');
    } catch (error) {
        console.error('Error clearing Async Storage:', error);
    }
};


export const addTask = async (title: string) => {
    const taskObject = await getData('tasks')
    if(taskObject === null) {        
        storeData('tasks', [{ id: 1, title: title, done: false }])
    }
    taskObject.push({ id: taskObject.length + 1, title: title, done: false })
    storeData('tasks', taskObject)
}

export const completeTask = async (id: number) => {
    const taskObject = await getData('tasks')
    taskObject.map((task) => {
        if (task.id === id) {
            task.done = !task.done
        }
    })
    storeData('tasks', taskObject)
}

export const deleteTask = async (id: number) => {
    const taskObject = await getData('tasks')
    taskObject.map((task) => {
        if (task.id === id) {
            taskObject.splice(taskObject.indexOf(task), 1)
        }
    })
    storeData('tasks', taskObject)
}

export const getTasks = async () => {
    const tasks = await getData('tasks')
    console.log(tasks)
    return tasks
}