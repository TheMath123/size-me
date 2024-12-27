import React, { useRef, useState, useEffect } from 'react';

/**
 * Represents the dimensions of an element
 */
interface Dimensions {
  width: number;
  height: number;
}

// Omit children from div props since we'll define our own children type
type DivProps = Omit<React.ComponentPropsWithoutRef<"div">, "children">;

/**
 * Props for the SizeMe component
 * Extends div props but with a custom children render prop
 */
interface SizeMeProps extends DivProps {
  children: (dimensions: Dimensions) => React.ReactNode;
}

/**
 * A component that measures its own dimensions and provides them to its children
 * through a render prop pattern.
 * 
 * **Note:** SizeMe will not collect the size of the component if it has a minimum or maximum value explicitly set.
 * 
 * @example
 * ```tsx
 * <SizeMe>
 *   {({ width, height }) => (
 *     <div>
 *       Width: {width}px, Height: {height}px
 *     </div>
 *   )}
 * </SizeMe>
 * ```
 */
const SizeMe = React.forwardRef<HTMLDivElement, SizeMeProps>(
  ({ children, style, ...props }, forwardedRef) => {
    const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Function to update dimensions using getBoundingClientRect
      const updateDimensions = () => {
        const { width, height } = element.getBoundingClientRect();
        setDimensions({ width, height });
      };

      // Create a ResizeObserver to watch for size changes
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(element);

      // Medição inicial
      updateDimensions();

      // Cleanup: disconnect the observer when component unmounts
      return () => {
        resizeObserver.disconnect();
      };
    }, []);


    // Merge the forwarded ref with our internal ref
    const mergedRef = (node: HTMLDivElement) => {
      elementRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <div
        ref={mergedRef}
        style={{
          display: 'inline-block', // Ensure the div wraps its content
          ...style
        }}
        {...props}
      >
        {children(dimensions)}
      </div>
    );
  }
);

SizeMe.displayName = "SizeMe";

export { SizeMe };