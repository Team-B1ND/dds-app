import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { TopNavBar } from './TopNavBar';
import { TopNavBarContext } from './context';

const renderHeaderOption = (
  option: unknown,
  props: { canGoBack: boolean } | { children: string }
) => (typeof option === 'function' ? option(props) : null);

const TopNavBarHeader = ({ navigation, options }: NativeStackHeaderProps) => {
  const canGoBack = navigation.canGoBack();

  return (
    <TopNavBarContext.Provider value={{ goBack: navigation.goBack }}>
      <SafeAreaContainer edges={['top']}>
        <TopNavBar
          left={renderHeaderOption(options.headerLeft, { canGoBack })}
          right={renderHeaderOption(options.headerRight, { canGoBack })}
        >
          {renderHeaderOption(options.headerTitle, { children: '' })}
        </TopNavBar>
      </SafeAreaContainer>
    </TopNavBarContext.Provider>
  );
};

export const createTopNavBarOptions = () => ({
  header: TopNavBarHeader,
  headerShown: true as const,
});

const SafeAreaContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.color.background.surface};
`;
