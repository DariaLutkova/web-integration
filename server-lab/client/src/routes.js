import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {RegisterPage} from './pages/RegisterPage';

export const useRoutes = isAuthed => {
    if (isAuthed) return <Switch>
        <Route path="/links" exact>
            <LinksPage/>
        </Route>
        <Route path="/create" exact>
            <CreatePage/>
        </Route>
        <Route path="/detail/:id">
            <DetailPage/>
        </Route>
        <Redirect to="/create" />
    </Switch>

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};