import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import TeacherForm from './Pages/TeacherForm'
import TeacherList from './Pages/TeacherList'
import Landing from './Pages/Landing'

function Routes(){
    return(
        <BrowserRouter>
            <Route path='/' component={Landing} exact />
            <Route path='/study' component={TeacherList} exact />
            <Route path='/give-classes' component={TeacherForm} exact />
        </BrowserRouter>
    )
}

export default Routes;