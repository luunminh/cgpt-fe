import { cn } from '@shared/ui/utils';
import * as React from 'react';

type Props = {
  gap?: number;
  sx?: React.HTMLAttributes<HTMLDivElement>;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
} & React.PropsWithChildren;

const TAILWIND_SIZE = 4;

const Flex = React.forwardRef<HTMLDivElement, Props>(
  ({ gap = 1, className, align = '', justify = 'flex-start', sx, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-row', className, {
          [`gap-${gap * TAILWIND_SIZE}`]: !!gap,
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
Flex.displayName = 'Flex';

export { Flex };
