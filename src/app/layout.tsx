import '../../styles/globals.css';
import PageLoader from '../components/Preloader/PageLoader';
import ToastProvider from '../components/Toast/ToastProvider';

export const metadata = {
  title: 'My Shop - by GulaliG',
  description: 'O‑Complex Test Assignment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head />
      <body suppressHydrationWarning={true}>
        <PageLoader />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
