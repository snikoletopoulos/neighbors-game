import { Component } from "react";

import Modal from "components/UI/Modal";

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
				{this.state.hasError && (
					<Modal teleport header="An error occured" body="error" />
				)}
				{this.props.children}
			</>
		);
	}
}

export default ErrorBoundary;
