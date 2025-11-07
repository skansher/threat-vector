import React, { useState } from "react";
import "../CSS/form.css";
import Header from "./Header.jsx";

const CreateProfile = () =>{
    return(
        <div>
        <Header />
        <div className="page-container">
            <h1 style={{ marginBottom: '0'}}>Can't find an APT or IT Infiltrator?</h1>
            <h3>Follow the form directions below and to add your APT or Infiltrator to your dasbhoard.</h3>
            <div class="row">
                <div class="card">
                    <div class="card-header">
                        <h5>Threat Profile Form</h5>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h5>Infiltrator Form</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CreateProfile;