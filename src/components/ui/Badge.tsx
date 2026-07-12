import React from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'olive'
  | 'beige'
  | 'olive-muted'
  | 'beige-amber'
  | 'olive-brown'
  | 'outline-olive'
  | 'outline-beige';

interface BadgeProps {
  children: React.ReactNode;
  variant: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant }) => {
  return <span className={`badge badge-${variant}`}>{children}</span>;
};
