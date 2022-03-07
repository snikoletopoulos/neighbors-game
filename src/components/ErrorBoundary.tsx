import { Component } from "react";

import Modal from "components/UI/Modal";

class ErrorBoundary extends Component {
	state = {
		hasError: false,
	};

	static getDerivedStateFromError(error: Error) {
		return { error: error };
	}

	render() {
		if (this.state.error) {
			return (
				<Modal
					teleport
					header="An error occured"
					body={this.state.error.message}
				/>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
