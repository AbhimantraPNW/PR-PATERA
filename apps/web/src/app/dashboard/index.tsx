import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import { Windmill } from '@roketid/windmill-react-ui';
import type { AppProps } from 'next/app';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <Windmill usePreferences={true}>
      <Component {...pageProps} />
    </Windmill>
  );
}
export default MyApp;
