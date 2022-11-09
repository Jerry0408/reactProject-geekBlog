import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import AuthRoute from './components/AuthComponent'
// import Layout from './pages/Layout'
// import Login from './pages/Login'
import './App.css'
// import Publish from './pages/Publish'
// import Article from './pages/Article'
// import Home from './pages/Home'
import { history } from './utils'
import { lazy, Suspense } from 'react'

const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

export default function App () {
  return (
    <HistoryRouter history={history}>
      <div className='App'>
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            <Route path='/' element={<Navigate to="/layout" />}></Route>
            <Route path='/layout' element={
              <AuthRoute>
                <Layout />
              </AuthRoute>
            }>
              <Route path='' element={<Navigate to="article" />}></Route>
              <Route path='home' element={<Home />}></Route>
              <Route path='article' element={<Article />}></Route>
              <Route path='publish' element={<Publish />}></Route>
            </Route>
            <Route path='/login' element={<Login></Login>}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}
