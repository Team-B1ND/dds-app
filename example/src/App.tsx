import { Text, View, StyleSheet } from 'react-native';
import { useColors } from '@dds-app/core';

export default function App() {
  const colors = useColors();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Text style={{ color: colors.text.primary }}>Hello DDS!</Text>
      <Text style={{ color: colors.brand.primary }}>Primary Color</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
