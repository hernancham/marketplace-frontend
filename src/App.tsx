import { Route } from "wouter";
import { Layout } from "./components/Layout";
import { BasePage } from "./pages/BasePage";

function App() {
  return (
    <>
      <Route path="/">
        <Layout>
          <BasePage />
        </Layout>
      </Route>
    </>
  );
}

export default App;
