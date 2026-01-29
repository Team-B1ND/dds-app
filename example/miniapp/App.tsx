import { useState, useEffect } from 'react';
import { ScrollView, View, Platform } from 'react-native';
import { DodamThemeProvider } from '@dds-app/foundation';

const useWebStyles = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      html, body {
        touch-action: pan-x pan-y;
        -ms-touch-action: pan-x pan-y;
        overscroll-behavior: none;
      }
    `;
    document.head.appendChild(style);

    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no'
      );
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);
};
import {
  FormButton,
  TextButton,
  Switch,
  AlertDialog,
  ConfirmDialog,
  OverlayProvider,
  useOverlay,
  Tag,
  Badge,
  ToastContainer,
  toast,
} from '@dds-app/core';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.normal};
`;

const Section = styled.View`
  padding: 16px;
  gap: 12px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.text.normal};
  margin-bottom: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

function DialogDemo() {
  const overlay = useOverlay();

  const openAlert = () => {
    overlay.open(({ isOpen, close }) => (
      <AlertDialog
        open={isOpen}
        onClose={close}
        title="Alert"
        description="This is an alert dialog."
      />
    ));
  };

  const openConfirm = () => {
    overlay.open(({ isOpen, close }) => (
      <ConfirmDialog
        open={isOpen}
        onClose={close}
        title="Confirm"
        description="Do you want to proceed?"
      >
        <ConfirmDialog.Button display="full">Cancel</ConfirmDialog.Button>
        <ConfirmDialog.Button display="full">OK</ConfirmDialog.Button>
      </ConfirmDialog>
    ));
  };

  return (
    <Row>
      <FormButton size="small" onPress={openAlert}>
        Alert Dialog
      </FormButton>
      <FormButton size="small" onPress={openConfirm}>
        Confirm Dialog
      </FormButton>
    </Row>
  );
}

function MainContent() {
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <ScrollView>
      <Section>
        <SectionTitle>Buttons</SectionTitle>
        <Row>
          <FormButton size="small">Form Button</FormButton>
          <FormButton size="medium">Form Button</FormButton>
          <FormButton size="large">Form Button</FormButton>
          <TextButton>Text Button</TextButton>
        </Row>
      </Section>

      <Section>
        <SectionTitle>Switch</SectionTitle>
        <Row>
          <Switch checked={switchOn} onChange={() => setSwitchOn(!switchOn)} />
        </Row>
      </Section>

      <Section>
        <SectionTitle>Dialogs</SectionTitle>
        <DialogDemo />
      </Section>

      <Section>
        <SectionTitle>Tags & Badges</SectionTitle>
        <Row>
          <Tag title="asd" />
          <Badge type="number" />
        </Row>
      </Section>

      <Section>
        <SectionTitle>Toast</SectionTitle>
        <Row>
          <FormButton
            size="small"
            onPress={() => toast.success('에러', { position: 'bottom' })}
          >
            Show Toast
          </FormButton>
        </Row>
      </Section>
    </ScrollView>
  );
}

export default function App() {
  useWebStyles();

  return (
    <DodamThemeProvider>
      <OverlayProvider>
        <Container>
          <View />
          <MainContent />
          <ToastContainer />
        </Container>
      </OverlayProvider>
    </DodamThemeProvider>
  );
}
