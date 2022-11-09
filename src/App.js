import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import AuthRoute from './components/AuthComponent'
import Layout from './pages/Layout'
import Login from './pages/Login'
import './App.css'
import Publish from './pages/Publish'
import Article from './pages/Article'
import Home from './pages/Home'
import { history } from './utils'


export default function App () {
  return (
    <HistoryRouter history={history}>
      <div className='App'>
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

      </div>
    </HistoryRouter>
  )
}
