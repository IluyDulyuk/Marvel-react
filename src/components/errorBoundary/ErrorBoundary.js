import { Component } from "react";

import ErrorMassege from "../erorrMassege/ErrorMassege";

class ErrorBoundary extends Component {

    state = {
        error: false
    }

    componentDidCatch(error, info) {
        this.setState({error: true})
    }

    render() {
        
        if(this.state.error) {
            return <ErrorMassege/>
        }

        return this.props.children;

    }

}

export default ErrorBoundary;