import { useEffect, useState } from 'react';
import logo from './assets/flowlytica-mono.svg';
import './App.css';

function App() {
	const [platform, setPlatform] = useState('pinterest');
	const [entities, setEntities] = useState([]);

	useEffect(() => {
		fetchEntities();
	}, [platform]);

	function fetchEntities() {
		if (platform === 'pinterest') {
			setEntities(['User', 'Board']);
		} else if (platform === 'instagram') {
			setEntities(['Profile']);
		} else if (platform === 'facebook') {
			setEntities(['Profile', 'Page']);
		}
	}

	return (
		<main>
			<div class='gradient'></div>
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
									<label htmlFor='url'>URL:</label>
									<input type='text' name='url' id='url' />
								</span>
							</fieldset>
						</div>

						<div className='additional-options'>
							<fieldset>
								<legend style={{ padding: '0 0.5rem' }}>time frame:</legend>
								<span className='form-field'>
									<input type='date' name='time-range-start' id='time-range-start' />
									<label>to: </label>
									<input type='date' name='time-range-end' id='time-range-end' defaultValue={new Date().toISOString().split('T')[0]} />
								</span>
							</fieldset>
							<fieldset>
								<legend style={{ padding: '0 0.5rem' }}>media type:</legend>
								<span className='form-field'>
									<span>
										<input type='checkbox' name='text' id='text' />
										<label htmlFor='text'>Text</label>
									</span>
									<span>
										<input type='checkbox' name='photos' id='photos' style={{ marginLeft: '1.5rem' }} />
										<label htmlFor='photos'>Photos</label>
									</span>
								</span>
							</fieldset>
						</div>
						<span style={{ marginTop: '1rem' }}>
							<button type='submit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
								<span class='material-symbols-outlined'>search_insights</span>
								Analyze
							</button>
						</span>
					</div>
				</form>
			</section>

			<section className='results'></section>
		</main>
	);
}

export default App;
