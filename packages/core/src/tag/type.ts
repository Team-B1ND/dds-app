export type TagType = 'primary' | 'secondary' | 'danger';

export interface TagProps {
  title: string;
  type?: TagType;
}