import * as React from 'react';

interface ImageProps {
  src: string | { src: string };
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

function Image({
  src,
  alt,
  width,
  height,
  fill,
  className,
  style,
  onLoad,
  onError,
}: ImageProps) {
  const imgSrc = typeof src === 'object' ? src.src : src;

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={{
        ...style,
        ...(fill
          ? {
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }
          : {}),
      }}
      onLoad={onLoad}
      onError={onError}
    />
  );
}

export default Image;
