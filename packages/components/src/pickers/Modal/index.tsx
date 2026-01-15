import { useRef, useEffect } from 'react';
import {
  Modal as RNModal,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Easing,
} from 'react-native';
import styled from 'styled-components/native';
import type { ModalProps } from './type';

export const Modal = ({
  visible,
  onClose,
  children,
  closeOnBackdrop = true,
}: ModalProps) => {
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(0.95)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      backdropOpacity.setValue(0);
      contentScale.setValue(0.95);
      contentOpacity.setValue(0);
      contentTranslateY.setValue(20);

      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(contentScale, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(contentScale, {
          toValue: 0.95,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslateY, {
          toValue: 20,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropOpacity, contentScale, contentOpacity, contentTranslateY]);

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Container>
          <AnimatedBackdrop
            style={{ opacity: backdropOpacity }}
            onPress={handleBackdropPress}
          />
          <AnimatedContent
            style={{
              opacity: contentOpacity,
              transform: [
                { scale: contentScale },
                { translateY: contentTranslateY },
              ],
            }}
          >
            {children}
          </AnimatedContent>
        </Container>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Backdrop = styled(Pressable)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const AnimatedBackdrop = Animated.createAnimatedComponent(Backdrop);

const Content = styled.View`
  z-index: 1;
`;

const AnimatedContent = Animated.createAnimatedComponent(Content);
