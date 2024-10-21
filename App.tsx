import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import AddTask from "@/pages/AddTask";

const Stack = createNativeStackNavigator();

export default function App() {
  return (        
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Minhas Tarefas" component={Home}/>
        {/* <Stack.Screen name="Configurações" component={Settings}/>         */}
        <Stack.Screen name="Adicionar Tarefa" component={AddTask}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
