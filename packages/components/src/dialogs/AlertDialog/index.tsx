import styled from 'styled-components/native';
import { Animated, Modal, Pressable } from 'react-native';
import { useDialogAnimation } from '../hooks/useDialogAnimation';
import { useTriggerHaptic } from '../../hooks/useTriggerHaptic';
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
    <Modal transparent visible={open} animationType="none">
      <AnimatedDimmer style={dimmerStyle}>
        <Pressable style={{ flex: 1 }} onPress={handleDimmerPress}>
          <CenterContainer>
            <Pressable>
              <AnimatedDialogContainer style={dialogStyle}>
                <ContentContainer>
                  <Title>{title}</Title>
                  {description && <Description>{description}</Description>}
                </ContentContainer>
                <ButtonContainer>
                  <TextButton onPress={onClose}>
                    <ButtonText>{buttonText}</ButtonText>
                  </TextButton>
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

const DialogContainer = styled.View`
  background-color: ${({ theme }) => theme.color.background.surface};
  border-radius: ${({ theme }) => theme.radius.xl};
  min-width: ${({ theme }) => theme.size.dialog.minWidth};
  max-width: ${({ theme }) => theme.size.dialog.maxWidth};
`;

const AnimatedDialogContainer = Animated.createAnimatedComponent(DialogContainer);

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.title.sm.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.title.sm.lineHeight}px;
  color: ${({ theme }) => theme.color.text.primary};
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.sm.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.body.sm.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.sm.lineHeight}px;
  color: ${({ theme }) => theme.color.text.tertiary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
`;

const TextButton = styled.Pressable`
  padding: ${({ theme }) => theme.spacing.sm};
`;

const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.label.lg.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.label.lg.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.lg.lineHeight}px;
  color: ${({ theme }) => theme.color.text.primary};
`;
