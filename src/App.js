import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="movie/:id" element={<div>movie</div>} />
          </Route>
          <Route path="/tv" element={<Tv />}>
            <Route path=":id" element={<div>tv</div>} />
          </Route>
          <Route path="/search/:title" element={<Search />}>
            <Route path=":id" element={<div>searchMovie</div>} />
          </Route>
          <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
