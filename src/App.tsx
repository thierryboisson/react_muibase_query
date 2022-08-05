import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Content from './components/main/Content';

const client = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider
        client={client}
      >
        <Content/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
