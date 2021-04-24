import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Link, RouteProps, Redirect } from '../lib'
import './main.css'

function App() {
  return (
    <>
      <Route path="/.+">
        <Link to="/" className="back">
          /
        </Link>
      </Route>
      <Switch>
        <Route path="/">{Home}</Route>
        <Route path="/[a-d]">{Alpha}</Route>
        <Route path="/foo">
          <Foo>bar</Foo>
        </Route>
        <Route path="/rgb[/(](?<r>\d+)[/,](?<g>\d+)[/,](?<b>\d+)\)?">
          {Color}
        </Route>
        <Route path="/sub/:page?">{Nested}</Route>
        <Route path=".*">404</Route>
      </Switch>
    </>
  )
}

function Home() {
  return (
    <div className="home screen">
      {['a', 'b', 'c', 'd'].map(v => (
        <Link key={v} to={v} className={`card cl-${v}`}>
          {v}
        </Link>
      ))}
      <Link className="bar" to="sub">
        nested
      </Link>
    </div>
  )
}

const Alpha: React.FC<RouteProps> = ({ location }) => {
  const char = location.path.slice(1).toLowerCase()
  return <div className={`screen cl-${char}`}>{char}</div>
}

const Color: React.FC<RouteProps> = ({ match: { r, g, b } }) => {
  const backgroundColor = `rgb(${r},${g},${b})`
  return (
    <div className="screen" style={{ backgroundColor }}>
      <h1>{backgroundColor}</h1>
    </div>
  )
}

function Foo({ children }: { children?: string }) {
  return <div>foo {children}</div>
}

const Nested: React.FC<RouteProps> = ({ match }) => {
  return (
    <div className="screen">
      &gt;sub/{match.page}
      <Switch>
        <Route path="/sub">{NestedMain}</Route>
        <Route path="/sub/a">
          <div className="card">1️⃣</div>
        </Route>
        <Route path="/sub/b">
          <div className="card">2️⃣</div>
        </Route>
        <Route path="/sub/c">
          <div className="card">3️⃣</div>
        </Route>
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

const NestedMain = () => (
  <ul>
    <li>
      <Link to="/sub/a">/sub/a</Link>
    </li>
    <li>
      <Link to="/sub/b">/sub/b</Link>
    </li>
    <li>
      <Link to="/sub/c">/sub/c</Link>
    </li>
  </ul>
)

ReactDOM.render(<App />, document.getElementById('root'))
