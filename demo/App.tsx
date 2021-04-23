import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Link, RouteProps } from '../lib'
import './main.css'

function App() {
  return (
    <>
      <Route path={/^\/(?!$)/}>
        <Link to="/" className="back">
          /
        </Link>
      </Route>
      <Switch>
        <Route path={/^\/$/}>{Home}</Route>
        <Route path={/^\/[a-d]$/}>{Alpha}</Route>
        <Route path={/foo/}>
          <Foo>bar</Foo>
        </Route>
      </Switch>
    </>
  )
}

function Home() {
  console.log('home')
  return (
    <div className="home screen">
      {['a', 'b', 'c', 'd'].map(v => (
        <Link key={v} to={v} className={`card cl-${v}`}>
          {v}
        </Link>
      ))}
    </div>
  )
}

const Alpha: React.FC<RouteProps> = ({ location }) => {
  const char = location.path.slice(1)
  console.log('alpha', char)
  return <div className={`screen cl-${char}`}>{char}</div>
}

function Foo({ children }: { children?: string }) {
  console.log('render foo')
  return <div>foo {children}</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
