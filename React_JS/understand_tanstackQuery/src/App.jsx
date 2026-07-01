
// When to use TanStack Query vs plain useEffect
// Use TanStack Query when:
// ✅ Fetching data from APIs/servers (server state)
// ✅ Need caching across components
// ✅ Need automatic background updates
// ✅ Building real production apps

// Use plain useState/useEffect when:
// ✅ Simple one-off fetches in learning projects
// ✅ Non-server state (form inputs, UI toggles)
// ✅ Very small apps where the overhead isn't worth it

import GitHubSearch from "./components/GitHubSearch";

const App = () => {
  return (
    <div>
      <GitHubSearch username="octocat" />
    </div>
  );
}

export default App;
