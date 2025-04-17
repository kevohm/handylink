import { AppProps } from 'next/app';
import { StepperProvider } from '@/contexts/SignUpData';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StepperProvider>
      <Component {...pageProps} />
    </StepperProvider>
  );
}

export default MyApp;
