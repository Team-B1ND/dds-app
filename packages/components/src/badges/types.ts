export type BadgeType = 'dot' | 'number';
export type BadgeColor = 'red';

export interface BadgeProps {
	type?: BadgeType;
	color?: BadgeColor;
	count?: number;
}
