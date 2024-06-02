import './Loader.css';

function Loader() {
	return (
		<div className='loader-container'>
			<div class='spinner'>
				<div class='spinner-inner'></div>
			</div>
			<p>Analyzing...</p>
		</div>
	);
}

export default Loader;
