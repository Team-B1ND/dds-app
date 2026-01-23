export type BadgeType = 'dot' | 'number';
export type BadgeColor = 'red' | string;

export interface BadgeProps {
	type?: BadgeType;
	color?: BadgeColor;
	count?: number;
}
