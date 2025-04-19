import './main.css';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { GlobalStyle, theme } from './config/styled/styled.ts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './config/redux/store.ts';
import { toastArgs } from './config/toast/toast.tsx';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/query/query.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster {...toastArgs} />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>,
);
