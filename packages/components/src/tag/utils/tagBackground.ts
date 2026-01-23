import type { Colors } from '@dds-app/foundation/colors';
import type { TagType } from '../type';

export const getTagBackground = (color: Colors, type: TagType): string => {
  switch (type) {
    case 'primary':
      return color.main.primary;
    case 'secondary':
      return color.text.placeholder;
    case 'danger':
      return color.status.error;
  }
};
