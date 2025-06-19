import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DefaultWebviewScreen from './screens/DefaultWebviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Webview" component={DefaultWebviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}