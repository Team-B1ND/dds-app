import { Modal } from 'react-native';
import type { DropdownProps } from '../types';
import * as S from './style';
import { useDropdown } from '../hooks/useDropdown';
import { ChevronDown } from '@dds-app/icons';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components/native';

export const Dropdown = ({
  onSelect,
  options,
  selectedOption,
  width,
}: DropdownProps) => {
  const {
    wrapperRef,
    isOpen,
    setIsOpen,
    handleToggle,
    shouldRender,
    layout,
    dropdownTop,
    animatedValue,
    dropUp,
    MAX_HEIGHT,
  } = useDropdown(options);

  const theme = useTheme();

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <S.Wrapper ref={wrapperRef} collapsable={false} $isOpen={isOpen}>
      <S.Container $width={width} onPress={handleToggle} activeOpacity={0.8}>
        <S.SelectedText>{selectedOption.label}</S.SelectedText>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ChevronDown size={16} color={theme.color.text.primary} />
        </Animated.View>
      </S.Container>

      {shouldRender && (
        <Modal
          transparent
          visible
          animationType="none"
          onRequestClose={() => setIsOpen(false)}
        >
          <S.ModalRoot>
            <S.Overlay onPress={() => setIsOpen(false)} />

            <S.AnimatedDropdown
              $left={layout.x}
              $top={dropdownTop}
              $width={width ?? layout.width}
              $maxHeight={MAX_HEIGHT}
              style={{
                opacity: animatedValue,
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [dropUp ? 8 : -8, 0],
                    }),
                  },
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.96, 1],
                    }),
                  },
                ],
              }}
            >
              <S.OptionsContainer>
                {options.map((option) => (
                  <S.Option
                    key={option.value}
                    $selected={option.value === selectedOption.value}
                    onPress={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                  >
                    <S.OptionText>{option.label}</S.OptionText>
                  </S.Option>
                ))}
              </S.OptionsContainer>
            </S.AnimatedDropdown>
          </S.ModalRoot>
        </Modal>
      )}
    </S.Wrapper>
  );
};
