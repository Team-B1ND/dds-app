import styled from 'styled-components/native';
import { Animated, Pressable } from 'react-native';
import { Modal } from '../../common';
import { useDialogAnimation } from '../hooks/useDialogAnimation';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
import { TextButton } from '../../buttons';
import type { AlertDialogProps } from '../types';

export const AlertDialog = ({
  open,
  title,
  description,
  buttonText = '확인',
  closeOnDimmerClick = false,
  onClose,
  onExited,
}: AlertDialogProps) => {
  const { dimmerStyle, dialogStyle, visible, wiggle } = useDialogAnimation(
    open,
    onExited
  );
  const { triggerHaptic } = useTriggerHaptic();

  const handleDimmerPress = () => {
    if (closeOnDimmerClick) {
      onClose?.();
    } else {
      wiggle();
      triggerHaptic();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={open} animationType="none">
      <AnimatedDimmer style={dimmerStyle}>
        <Pressable style={{ flex: 1 }} onPress={handleDimmerPress}>
          <CenterContainer>
            <Pressable>
              <AnimatedDialogContainer style={dialogStyle} $hasDescription={!!description}>
                <ContentContainer>
                  <Title>{title}</Title>
                  {description && <Description>{description}</Description>}
                </ContentContainer>
                <ButtonContainer>
                  <TextButton onPress={onClose}>{buttonText}</TextButton>
                </ButtonContainer>
              </AnimatedDialogContainer>
            </Pressable>
          </CenterContainer>
        </Pressable>
      </AnimatedDimmer>
    </Modal>
  );
};

const Dimmer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.overlay.dim};
`;

const AnimatedDimmer = Animated.createAnimatedComponent(Dimmer);

const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const DialogContainer = styled.View<{ $hasDescription: boolean }>`
  background-color: ${({ theme }) => theme.color.background.surface};
  border-radius: ${({ theme }) => theme.radius.xxxl};
  width: ${({ theme }) => theme.size.dialog.width};
  ${({ theme, $hasDescription }) =>
    $hasDescription && `min-height: ${theme.size.dialog.minHeight};`}
  justify-content: space-between;
`;

const AnimatedDialogContainer = Animated.createAnimatedComponent(DialogContainer);

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin: 6px;
  margin-bottom: 0;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.heading1.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.heading1.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.heading1.letterSpacing}px;
  color: ${({ theme }) => theme.color.text.primary};
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.typography.body1.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.body1.lineHeight}px;
  letter-spacing: ${({ theme }) => theme.typography.body1.letterSpacing}px;
  color: ${({ theme }) => theme.color.text.tertiary};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
`;
