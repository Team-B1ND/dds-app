import { Text, View } from 'react-native';
import { DodamThemeProvider } from '@dds-app/foundation';
import styled from 'styled-components/native';

export default function App() {
  return (
    <DodamThemeProvider>
      <StyledView>
        <Text>asd</Text>
      </StyledView>
    </DodamThemeProvider>
  );
}

const StyledView = styled(View)`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.color.brand.primary};
`;
