import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  muted?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-14 h-14',
};

const fontMap = {
  sm: 'font-label-sm',
  md: 'font-label-lg',
  lg: 'font-label-lg',
  xl: 'font-heading-sm',
};

function deriveInitials(alt: string): string {
  return alt
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = 'md',
  muted,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const displayInitials = initials || (alt ? deriveInitials(alt) : '');

  const sizeClass = sizeMap[size];
  const fontClass = fontMap[size];
  const stateClass = muted
    ? 'bg-neutral text-on-surface-muted'
    : 'bg-secondary text-on-secondary';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full ${sizeClass} ${fontClass} ${stateClass} ${className}`}
      aria-label={showImage ? alt : displayInitials}
      role="img"
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-full rounded-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{displayInitials}</span>
      )}
    </div>
  );
};

export interface AvatarGroupProps {
  avatars: Pick<AvatarProps, 'src' | 'alt' | 'initials'>[];
  max?: number;
  size?: AvatarProps['size'];
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 3,
  size = 'md',
}) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className="flex items-center">
      {visible.map((avatar, i) => (
        <div key={i} className={`${i > 0 ? '-ml-2' : ''}`} style={{ zIndex: visible.length - i }}>
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div className="-ml-2">
          <Avatar initials={`+${overflow}`} size={size} muted />
        </div>
      )}
    </div>
  );
};
