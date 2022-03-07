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
