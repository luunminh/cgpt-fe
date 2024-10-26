import { cn } from '@shared/ui/utils';
import * as React from 'react';

type Props = {
  gap?: number;
  align?: React.CSSProperties['alignItems'];
  sx?: React.HTMLAttributes<HTMLDivElement>;
  justify?: React.CSSProperties['justifyContent'];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
} & React.PropsWithChildren;

const Stack = React.forwardRef<HTMLDivElement, Props>(
  ({ gap = 1, className, align = '', justify = 'flex-start', sx, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('container flex flex-col', className, {
          [`gap-${gap}`]: !!gap,
        })}
        {...sx}
        style={{
          ...sx?.style,
          alignItems: align,
          justifyContent: justify,
        }}
      >
        {children}
      </div>
    );
  },
);
Stack.displayName = 'Stack';

export { Stack };
