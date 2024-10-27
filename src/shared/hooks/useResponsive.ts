import useMediaQuery from './useMediaQuery';

export const breakpoints = {
  MOBILE: '(max-width:600px)',
  TABLET: '(max-width:960px)',
  LARGE_SCREEN: '(max-width:1200px)',
  EXTRA_LARGE_SCREEN: '(max-width:1440px)',
};

export enum ScreenSize {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
  EXTRA_LARGE_SCREEN = 'extra_large_screen',
}

/**
 * @example
 * import {useResponsive, ScreenSize} from 'hooks/useResponsive';
 *
 * const isMatch = useResponsive(ScreenSize.MOBILE);
 *
 * return(
 *  <h1>Mobile: {isMatch}</h1>
 * )
 */
const useResponsive = (size: ScreenSize): boolean => {
  const getBreakpoint = (_size: ScreenSize) => {
    switch (size) {
      case ScreenSize.MOBILE:
        return breakpoints.MOBILE;
      case ScreenSize.TABLET:
        return breakpoints.TABLET;
      case ScreenSize.DESKTOP:
        return breakpoints.LARGE_SCREEN;
      case ScreenSize.EXTRA_LARGE_SCREEN:
        return breakpoints.EXTRA_LARGE_SCREEN;

      default:
        return breakpoints.LARGE_SCREEN;
    }
  };
  const isMatch = useMediaQuery(getBreakpoint(size));
  return isMatch;
};

export default useResponsive;
