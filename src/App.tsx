import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Content from './components/main/Content';

const client = new QueryClient()

function App() {
  return (
    <div className="app">
      <QueryClientProvider
        client={client}
      >
        <BrowserRouter>
          <Content/>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
