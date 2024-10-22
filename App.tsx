import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/pages/Home";
import AddTask from "@/pages/AddTask";
import { Button } from "react-native";


const Stack = createNativeStackNavigator();

export default function App() {
  return (        
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        navigationBarColor: '#fff',
      }} initialRouteName="Index">
        <Stack.Screen name="Minhas Tarefas" component={Home}/>
        <Stack.Screen name="Adicionar Tarefa" component={AddTask}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
