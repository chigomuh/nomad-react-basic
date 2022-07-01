import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="movie/:id" element={<div>movie</div>} />
          </Route>
          <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
