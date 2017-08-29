import React, { Component } from 'react';
import classnames from 'classnames/bind';
import logo from './logo_appnexus.svg';
import sourcemaps from './preferences.gif';
import styles from './App.css';
import inspect from './inspect.png';
import pseudoStyles from './pseudoStyles.css';
const cx = classnames.bind(styles);

const myCode = `
module.exports = {
	devtool: 'source-map',
	.
	.
	.
	{
		test: /\.css$/,
		use: [
			require.resolve('style-loader'),
			{
				loader: require.resolve('css-loader'),
				options: {
					importLoaders: 1,
					modules: true,
					sourceMap: true,
					localIdentName: '[path][name]__[local]--[hash:base64:5]'
				},
			},
		],
	},
`;

class App extends Component {
	constructor(props) {
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.state = {
			currentSlide: 0,
			sections: document.getElementsByTagName('section'),
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}


	handleKeyPress(e){
		if (e.keyCode == 39 /*right arrow*/) {
			e.preventDefault();

			return this.setState((prevState, props) => {
				if(prevState.currentSlide === prevState.sections.length) {
					return {currentSlide: 1};
				} else {
					return {currentSlide: prevState.currentSlide + 1};
				}
			});
		}
		if (e.keyCode == 37 /*left arrow*/) {
			e.preventDefault();

			return this.setState((prevState, props) => {
				console.log(prevState.currentSlide);

				if(prevState.currentSlide === 1) {
					return {currentSlide: prevState.sections.length};
				} else {
					return {currentSlide: prevState.currentSlide - 1};
				}
			});
		}
	}

	render() {

		return (
			<div className={styles.App}>
				<header className={styles.AppHeader}>
					<img src={logo} className={styles.AppLogo} alt='logo' />
					<h1>Debugging CSS Modules</h1>
				</header>
				<main className={styles.Main}>
					<section className={cx(styles.section, {
						[styles.closed]: this.state.currentSlide != 1,
					})}>
						<header className={styles.Header}><h2>Set up source maps</h2></header>

						<article>
							<header><h3>Setting Up Dev Tools</h3></header>
							<img className={styles.demoImage} src={sourcemaps} alt='choose settings, then sources, then select the checkbox "enable CSS Source maps"' />
						</article>
						<article>
							<header><h3>Set source maps in Webpack</h3></header>
							<pre className={styles.code}>
								<code>
									{myCode}
								</code>
							</pre>
						</article>
					</section>
					<section className={cx(styles.section, styles.Grid, {
							[styles.closed]: this.state.currentSlide != 2,
						})} >
						<header className={styles.Header}><h2>Using the styles/rules tab</h2></header>
						<img className={styles.demoImage} src={inspect} alt='the right click menu with "inspect" selected'/>
						<ul>
							<li>Built styles from top to bottom.</li>
							<li>First style is the most recent/ruling style</li>
							<li>Overwritten styles are crossed out</li>
							<li>Reference style file in top right corner</li>
						</ul>
						<article>
							<header><h3>Playing with Pseudo Classes</h3></header>
							<p>Force an elements state to check the styles</p>
							<p>Options are</p>
							<ul className={pseudoStyles.hoverBox}>
								<li className={pseudoStyles.active}>:active</li>
								<li className={pseudoStyles.focus}>:focus</li>
								<li className={pseudoStyles.hover}>:hover</li>
								<li className={pseudoStyles.visited}>:visited</li>
							</ul>
						</article>
						<article>
							<header><h3>Classes</h3></header>
							<ul>
								<li>Select/Unselect aliplied classes on component</li>
								<li>Add new classes to component</li>
							</ul>
						</article>
						<article>
							<header><h3>New Style Rule</h3></header>
							<p>Great for finding the Specificity Context</p>
							<p>Clicking on the '+' symbol will show you the minimum required entity and classnames required to override existing styles.</p>
						</article>
					</section>
					<section className={cx(styles.section, {
						[styles.closed]: this.state.currentSlide != 3,
					})}>
						<header className={styles.Header}><h2>Inspecting the Box Model</h2></header>
						<p>All elements on a website are laid out based on a box model. Each box contains the content, surrounded by padding, borders, and margins.</p>
						<article className={styles.Grid2}>
							<p><code>box-sizing: content-box</code> (The width and height properties (and min/max properties) includes only the content. Border, padding, or margin are not included</p>
							<p><code>box-sizing: border-box</code> The width and height properties (and min/max properties) includes content, padding and border, but not the margin</p>
						</article>
					</section>
					<section className={cx(styles.section, {
						[styles.closed]: this.state.currentSlide != 4,
					})}>
						<header className={styles.Header}><h2>Understanding Computed Styles</h2></header>
						<ul>
							<li>List of all style properties</li>
							<li>Highlighted properties are the ones being applied </li>
							<li>Click on a property to see which module the style is coming from.</li>
						</ul>
					</section>
				</main>
			</div>
		);
	}
}

export default App;
