'use client'

import React from 'react';

interface Dimensions {
  width: number;
  height: number;
}

interface SizeMeProps extends React.ComponentPropsWithoutRef<"div"> {
  children: (dimensions: Dimensions) => React.ReactNode;
}

const SizeMe = React.forwardRef<HTMLDivElement, SizeMeProps>(
  ({ children, ...props }, forwardedRef) => {
    const [dimensions, setDimensions] = React.useState<Dimensions>({ width: 0, height: 0 });
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const updateDimensions = () => {
        const { width, height } = element.getBoundingClientRect();

        console.log('width', width);
        setDimensions({ width, height });
      };

      // Observador de redimensionamento
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(element);

      // Medição inicial
      updateDimensions();

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Mescla as refs
    const mergedRef = (node: HTMLDivElement) => {
      elementRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <div ref={mergedRef} {...props}>
        {children(dimensions)}
      </div>
    );
  }
);

SizeMe.displayName = "SizeMe";

export { SizeMe };