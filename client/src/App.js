import { Route, useHistory, Switch } from 'react-router-dom'
import Overview from './pages/Overview'
import ProductDetail from './pages/ProductDetail'

import './App.css'

function App() {
  return (
    <div className="App">
      <header>Header</header>
      <main>
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route path="/:product" component={ProductDetail} />
        </Switch>
      </main>
    </div>
  )
}

export default App
