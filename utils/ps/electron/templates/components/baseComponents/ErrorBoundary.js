import React from "react";
import ErrorMessage from "./errorMessage/ErrorMessage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = {hasError: false};
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    // return { hasError: `[ERROR] ${error.meesage}\n${error.stack}`};
    return {hasError: true, message: error.message, stack: error.stack};
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    this.props.onError?.(error, errorInfo);
    const message = [
      `**${error.message}**`,
      `\nerror.stack:`,
      `${error.stack}`,
      `\nerrorInfo.componentStack:`,
      `${errorInfo.componentStack.trim()}`,
    ].join("\n");
    global.ipcRenderer?.notify?.(message);
    console.log(message);
    // this.setState({hasError: {error, errorInfo}});
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return <ErrorMessage />;
  }
}

export default ErrorBoundary;
