import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
  }

  render() {
    return (
      <>
        {this.state.hasError ? <div>Something went wrong</div> : null}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
