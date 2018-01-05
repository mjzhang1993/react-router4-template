import React from 'react'

import '../scss/counter.scss';

class App extends React.Component {
	state = {
		count: 0
	}

	componentDidMount() {
		this.interval = setInterval(() => this.setState(prevState => ({
			count: prevState.count + 1
		})), 200,)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<div className="box">
				<p>{this.state.count}</p>
				this is asdada asfadaf asdadad asdad
			</div>
		);
	}
}

export default App;
