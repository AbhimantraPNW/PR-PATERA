import * as NProgress from 'nprogress';
import { Next13ProgressBar as ProgressBar, useRouter } from './AppProgressBar';
import withSuspense from './WithSuspense';

export interface Next13ProgressProps {
  /**
   * The color of the bar.
   * @default "#fb923c"
   */
  color?: string;
  /**
   * The start position of the bar.
   * @default 0.3
   */
  startPosition?: number;
  /**
   * The delay in milliseconds.
   * @default 0
   */
  delay?: number;
  /**
   * The stop delay in milliseconds.
   * @default 200
   */
  stopDelayMs?: number;
  /**
   * The height of the bar.
   * @default 3
   */
  height?: number | string;
  /**
   * Whether to show the bar on shallow routes.
   * @default true
   */
  showOnShallow?: boolean;
  /**
   * The other NProgress configuration options to pass to NProgress.
   * @default null
   */
  options?: Partial<NProgress.NProgressOptions>;
  /**
   * The nonce attribute to use for the `style` tag.
   * @default undefined
   */
  nonce?: string;

  /**
   * Use your custom CSS tag instead of the default one.
   * This is useful if you want to use a different style or minify the CSS.
   * @default (css) => <style nonce={nonce}>{css}</style>
   */
  transformCSS?: (css: string) => JSX.Element;
  style?: string;
}

const Next13ProgressBar = withSuspense(ProgressBar);
export { Next13ProgressBar, useRouter };

export default Next13ProgressBar;