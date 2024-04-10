import { useEffect, useState } from 'react';
import logo from './assets/flowlytica-mono.svg';
import './App.css';
import axios from 'axios';

function App() {
	const [array, setArray] = useState([]);

	// Form data object with fallback values
	const [formData, setFormData] = useState({
		url: 'https://www.pinterest.com/sithruby/handicraft/',
		count: 10,
		content_text: false,
		content_images: true,
	});

	const handleSubmit = (event) => {
		console.log('handleSubmit executed.');

		// Prevent the default form submission
		event.preventDefault();

		// Make post request to backend
		axios
			.post('http://localhost:812/analyze', formData)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});

		// Scroll to results
		let resultsSection = document.getElementById('results');
		resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	};

	/*
	const fetchAPI = async () => {
		const response = await axios.get('http://localhost:812/api/sithu');
		setArray(response.data.sithu);
	};

	useEffect(() => {
		fetchAPI();
	}, []);
*/
	return (
		<main>
			<div className='gradient'></div>
			<section className='heading'>
				<img src={logo} className='logo' />
				<h1>_flowlytica</h1>
			</section>
			<section className='input-section'>
				<form action='' className='form-container'>
					<div className='form'>
						<div className='platform-options'>
							<fieldset>
								<legend style={{ padding: '0 0.5rem' }}>Platform:</legend>

								<span className='form-field'>
									<input type='url' name='url' id='url' placeholder='URL' onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
								</span>
								<p className='hint'>Enter an applicable URL. (eg: https://www.pinterest.com/sithruby/handicraft/)</p>
							</fieldset>
						</div>

						<div className='additional-options'>
							<fieldset>
								<legend style={{ padding: '0 0.5rem' }}>range:</legend>
								<span className='form-field'>
									<input type='number' name='max-count' id='max-count' min={0} placeholder='Max count' onChange={(e) => setFormData({ ...formData, count: e.target.value })} />
								</span>
								<p className='hint'>Selecting a higher count will increase the duration taken to process.</p>
							</fieldset>
							<fieldset>
								<legend style={{ padding: '0 0.5rem' }}>media type:</legend>
								<span className='form-field'>
									<span>
										<input type='checkbox' name='text' id='text' onChange={(e) => setFormData({ ...formData, content_text: e.target.checked })} />
										<label htmlFor='text'>Text</label>
									</span>
									<span>
										<input
											type='checkbox'
											name='images'
											id='images'
											style={{ marginLeft: '1.5rem' }}
											onChange={(e) => setFormData({ ...formData, content_images: e.target.checked })}
										/>
										<label htmlFor='images'>Images</label>
									</span>
								</span>
								<p className='hint'>Select the media types you want to analyze.</p>
							</fieldset>
						</div>
						<span style={{ marginTop: '1rem' }}>
							<button type='submit' className='button' onClick={handleSubmit}>
								<span className='button-content'>
									<span className='material-symbols-outlined'>search_insights</span>
									Analyze
								</span>
							</button>
						</span>
					</div>
				</form>
			</section>

			<section className='results' id='results'>
				<div>
					{/*array.map((item, index) => (
						<p key={index}>{item}</p>
					))
					*/}
				</div>
			</section>
		</main>
	);
}

export default App;
