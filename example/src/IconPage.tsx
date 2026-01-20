import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppLogo,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bus,
  Calendar,
  Chart,
  Chat,
  Checkmark,
  CheckmarkCircleFill,
  CheckmarkCircleLine,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Close,
  ColoredCheckmarkCircle,
  ColoredClock,
  ColoredExclamationmarkCircle,
  ColoredXmarkCircle,
  Crown,
  DoorOpen,
  ExclamationmarkCircle,
  Eye,
  EyeSlash,
  File,
  Gear,
  Home,
  Link,
  Magnifyingglass,
  Megaphone,
  Menu,
  MoonPlus,
  Note,
  Pen,
  People,
  Person,
  Photo,
  Plus,
  Trash,
  XmarkCircle,
  ColorIcon,
} from '@dds-app/icons';
import { useTheme } from 'styled-components/native';

interface IconPageProps {
  onBack: () => void;
}

const icons = [
  { name: 'ArrowDown', component: ArrowDown },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'ArrowUp', component: ArrowUp },
  { name: 'Bell', component: Bell },
  { name: 'Bus', component: Bus },
  { name: 'Calendar', component: Calendar },
  { name: 'Chart', component: Chart },
  { name: 'Chat', component: Chat },
  { name: 'Checkmark', component: Checkmark },
  { name: 'CheckmarkCircleFill', component: CheckmarkCircleFill },
  { name: 'CheckmarkCircleLine', component: CheckmarkCircleLine },
  { name: 'ChevronDown', component: ChevronDown },
  { name: 'ChevronLeft', component: ChevronLeft },
  { name: 'ChevronRight', component: ChevronRight },
  { name: 'ChevronUp', component: ChevronUp },
  { name: 'Clock', component: Clock },
  { name: 'Close', component: Close },
  { name: 'ColoredCheckmarkCircle', component: ColoredCheckmarkCircle, colored: true },
  { name: 'ColoredClock', component: ColoredClock, colored: true },
  { name: 'ColoredExclamationmarkCircle', component: ColoredExclamationmarkCircle, colored: true },
  { name: 'ColoredXmarkCircle', component: ColoredXmarkCircle, colored: true },
  { name: 'Crown', component: Crown },
  { name: 'DoorOpen', component: DoorOpen },
  { name: 'ExclamationmarkCircle', component: ExclamationmarkCircle },
  { name: 'Eye', component: Eye },
  { name: 'EyeSlash', component: EyeSlash },
  { name: 'File', component: File },
  { name: 'Gear', component: Gear },
  { name: 'Home', component: Home },
  { name: 'Link', component: Link },
  { name: 'Magnifyingglass', component: Magnifyingglass },
  { name: 'Megaphone', component: Megaphone },
  { name: 'Menu', component: Menu },
  { name: 'MoonPlus', component: MoonPlus },
  { name: 'Note', component: Note },
  { name: 'Pen', component: Pen },
  { name: 'People', component: People },
  { name: 'Person', component: Person },
  { name: 'Photo', component: Photo },
  { name: 'Plus', component: Plus },
  { name: 'Trash', component: Trash },
  { name: 'XmarkCircle', component: XmarkCircle },
];

const colorIcons = [
  { name: 'BarChart', component: ColorIcon.BarChart },
  { name: 'Bullseye', component: ColorIcon.Bullseye },
  { name: 'ConvenienceStore', component: ColorIcon.ConvenienceStore },
  { name: 'CookedRice', component: ColorIcon.CookedRice },
  { name: 'CreditCard', component: ColorIcon.CreditCard },
  { name: 'Dgit', component: ColorIcon.Dgit },
  { name: 'FullMoonFace', component: ColorIcon.FullMoonFace },
  { name: 'Handshake', component: ColorIcon.Handshake },
  { name: 'LoudSpeaker', component: ColorIcon.LoudSpeaker },
  { name: 'MusicalNote', component: ColorIcon.MusicalNote },
  { name: 'SchoolBus', component: ColorIcon.SchoolBus },
  { name: 'SmilingFace', component: ColorIcon.SmilingFace },
  { name: 'Tent', component: ColorIcon.Tent },
  { name: 'Trophy', component: ColorIcon.Trophy },
];

export const IconPage = ({ onBack }: IconPageProps) => {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <BackButton onPress={onBack}>
          <ChevronLeft size={24} color={theme.color.text.primary} />
        </BackButton>
        <HeaderTitle>Icons</HeaderTitle>
        <Placeholder />
      </Header>
      <ScrollContainer contentContainerStyle={{ padding: 16 }}>
        <SectionTitle>App Logo</SectionTitle>
        <LogoBox>
          <AppLogo width={88} height={22} />
        </LogoBox>

        <SectionTitle>Basic Icons</SectionTitle>
        <IconGrid>
          {icons.map(({ name, component: IconComponent, colored }) => (
            <IconItem key={name}>
              <IconBox>
                {colored ? (
                  <IconComponent size={28} />
                ) : (
                  <IconComponent size={28} color={theme.color.text.primary} />
                )}
              </IconBox>
              <IconName numberOfLines={1}>{name}</IconName>
            </IconItem>
          ))}
        </IconGrid>

        <SectionTitle>Color Icons</SectionTitle>
        <IconGrid>
          {colorIcons.map(({ name, component: IconComponent }) => (
            <IconItem key={name}>
              <IconBox>
                <IconComponent size={28} />
              </IconBox>
              <IconName numberOfLines={1}>{name}</IconName>
            </IconItem>
          ))}
        </IconGrid>
      </ScrollContainer>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.color.background.surface};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.color.border.normal};
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.primary};
`;

const Placeholder = styled.View`
  width: 40px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 12px;
  margin-top: 16px;
`;

const LogoBox = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.color.fill.primary};
  border-radius: 12px;
  align-items: center;
  margin-bottom: 16px;
`;

const IconGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const IconItem = styled.View`
  width: 80px;
  align-items: center;
`;

const IconBox = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.fill.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`;

const IconName = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.color.text.tertiary};
  text-align: center;
`;
