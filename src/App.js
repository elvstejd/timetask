import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TasksProvider from './contexts/TasksContext';
import MainPage from './pages/MainPage';

function App() {
  return (
    <TasksProvider>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
          </Switch>
        </Router>
      </div>
    </TasksProvider>
  );
}

export default App;
