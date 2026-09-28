import { useState } from 'react';

export default function FadeImage({ src, alt, className = "", loading, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      className={`transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'} ${className}`}
      {...props}
    />
  );
}
