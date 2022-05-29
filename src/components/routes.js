import React from "react";
import { Routes as Rroutes, Route, Navigate } from "react-router-dom";
import Results from "./results";
import Search from "./search";
const Routes = () => {
  return (
    <div className="p-4">
      <Rroutes>
        <Route exact path="/" element={<Navigate replace to="/search" />} />
        <Route exact path="/search" element={<Results />} />
        <Route exact path="/videos" element={<Results />} />
        <Route exact path="/news" element={<Results />} />
        <Route exact path="/images" element={<Results />} />
      </Rroutes>
    </div>
  );
};

export default Routes;
