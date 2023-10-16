import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TasksProvider from './contexts/TasksContext';
import CountdownProvider from './contexts/countdownContext';
import MainPage from './pages/MainPage';
import Header from './components/Header';

function App() {
  return (
    <CountdownProvider>
      <TasksProvider>
        <div>
          <Router>
            <Header />
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
