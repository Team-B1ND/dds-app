import type { Colors } from "@dds-app/foundation/colors";

export type TagType = 'primary' | 'secondary' | 'negative';

export interface TagProps {
  title: string;
  type?: TagType;
}

export const getTagBackground = (color: Colors, type: TagType): string => {
  switch (type) {
    case 'primary':
      return color.main.primary;
    case 'secondary':
      return color.text.placeholder;
    case 'negative':
      return color.status.error;
  }
};