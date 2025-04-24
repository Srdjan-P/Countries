import React from "react";
import { PacmanLoader } from "react-spinners"

export default class Loader extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <PacmanLoader color="#efe120" size={100} />
            </div>
        )
    }
}