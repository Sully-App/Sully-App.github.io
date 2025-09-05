import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../../store/AppStateContext';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('General Service');
  const { loginOrCreateAccount } = useAppState();
  const router = useRouter();

  const handleLogin = async () => {
    const success = await loginOrCreateAccount({ role, name, password });
    if (success) router.push('/(app)');
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Text>Role:</Text>
      <Button title="General Service" onPress={() => setRole('General Service')} />
      <Button title="Mechanic" onPress={() => setRole('Mechanic')} />
      <Button title="Management" onPress={() => setRole('Management')} />
      <Button title="Safety Personal" onPress={() => setRole('Safety Personal')} />
      <Button title="Alignment Tech" onPress={() => setRole('Alignment Tech')} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
