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
								<legend style={{ marginLeft: '0.5rem', padding: '0 0.25rem' }}>Platform options</legend>
								<div className='form-field'>
									<label htmlFor='platform'>Platform: </label>
									<select name='platform' id='platform' onChange={(e) => setPlatform(e.target.value)}>
										<option value='pinterest'>Pinterest</option>
										<option value='instagram'>Instagram</option>
										<option value='facebook'>Facebook</option>
									</select>
								</div>

								<div className='form-field'>
									<label htmlFor='entity'>Entity:</label> {/* Corrected htmlFor value */}
									<select name='entity' id='entity'>
										{entities.map((entity) => (
											<option key={entity} value={entity}>
												{entity}
											</option>
										))}
									</select>
								</div>

								<div className='form-field'>
									<label htmlFor='url'>Username/URL:</label>
									<input type='text' name='url' id='url' />
								</div>
							</fieldset>
						</div>

						<div className='additional-options'>
							<fieldset>
								<legend style={{ marginLeft: '0.5rem', padding: '0 0.25rem' }}>Select time frame:</legend>
								<div className='form-field'>
									<input type='date' name='time-range-start' id='time-range-start' />
									<label>to: </label>
									<input type='date' name='time-range-end' id='time-range-end' />
								</div>
							</fieldset>
							<fieldset>
								<legend style={{ marginLeft: '0.5rem', padding: '0 0.25rem' }}>Choose media type:</legend>
								<div className='form-field'>
									<input type='checkbox' name='photos' id='photos' />
									<label htmlFor='photos'>Photos</label>
									<input type='checkbox' name='videos' id='videos' style={{ marginLeft: '1.5rem' }} />
									<label htmlFor='videos'>Videos</label>
								</div>
							</fieldset>
						</div>
						<div className='form-field' style={{ marginTop: '1rem' }}>
							<button type='submit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
								<span class='material-symbols-outlined'>search_insights</span>
								Submit
							</button>
						</div>
					</div>
				</form>
				<div className='about-container'></div>
			</section>

			<section className='results'></section>
		</main>
	);
}

export default App;
