import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TasksProvider from './contexts/TasksContext';
import CountdownProvider from './contexts/countdownContext';
import MainPage from './pages/MainPage';

function App() {
  return (
    <CountdownProvider>
      <TasksProvider>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={MainPage} />
            </Switch>
          </Router>
        </div>
      </TasksProvider>
    </CountdownProvider>
  );
}

export default App;
