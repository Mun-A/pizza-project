import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

import "./scss/app.scss";
import { PizzaLoader } from './components';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */"./pages/Cart"));
const PizzaDetail = lazy(() => import(/* webpackChunkName: "PizzaDetail" */"./pages/PizzaDetail"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */"./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<PizzaLoader/>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<PizzaLoader/>}>
              <PizzaDetail />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PizzaLoader/>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
