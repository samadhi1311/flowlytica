import './Loader.css';

function Loader() {
	return (
		<div className='loader-container'>
			<div className='spinner'>
				<div className='spinner-inner'></div>
			</div>
			<p>Analyzing...</p>
		</div>
	);
}

export default Loader;
