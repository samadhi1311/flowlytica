import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from './assets/flowlytica-mono.svg';
import './App.css';
import axios from 'axios';

function App() {
	const error = 'Provide a valid URL';

	// Form data object with fallback values
	// https://www.pinterest.com/sithruby/handicraft/
	const [formData, setFormData] = useState({
		url: '',
		count: 0,
		text: false,
		images: false,
	});

	const handleSubmit = (event) => {
		console.log(formData);

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
		// let resultsSection = document.getElementById('results');
		// resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	};

	return (
		<main>
			<div className='gradient'></div>

			<section className='heading'>
				<img src={logo} className='logo' />
				<h1>_flowlytica</h1>
			</section>

			<section className='input-section'>
				<Formik
					initialValues={formData}
					onSubmit={(values) => {
						console.log(values);

						// Make post request to backend
						axios
							.post('http://localhost:812/analyze', {
								url: values.url,
								count: values.count,
								text: values.text ? true : false,
								images: values.images ? true : false,
							})
							.then((response) => {
								console.log(response.data);
							})
							.catch((error) => {
								console.error(error);
							});

						// Scroll to results
						// let resultsSection = document.getElementById('results');
						// resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
					}}>
					<Form className='form-container' autoComplete='off'>
						<div className='form'>
							<div className='platform-options'>
								<fieldset>
									<legend style={{ padding: '0 0.5rem' }}>Platform:</legend>

									<span className='form-field'>
										<Field type='url' name='url' id='url' placeholder='URL' />
										<ErrorMessage name='url' component='div' className='error' />
									</span>
									<p className='hint'>Enter an applicable URL. (eg: https://www.pinterest.com/sithruby/handicraft/)</p>
								</fieldset>
							</div>

							<div className='additional-options'>
								<fieldset>
									<legend style={{ padding: '0 0.5rem' }}>range:</legend>
									<span className='form-field'>
										<Field type='number' name='count' id='count' min={1} placeholder='Max count' />
									</span>
									<p className='hint'>Selecting a higher count will increase the duration taken to process.</p>
								</fieldset>

								<fieldset>
									<legend style={{ padding: '0 0.5rem' }}>media type:</legend>
									<span className='form-field'>
										<span>
											<Field type='checkbox' name='text' id='text' />
											<label htmlFor='text'>Text</label>
										</span>
										<span>
											<Field type='checkbox' name='images' id='images' style={{ marginLeft: '1.5rem' }} />
											<label htmlFor='images'>Images</label>
										</span>
									</span>
									<p className='hint'>Select the media types you want to analyze.</p>
								</fieldset>
							</div>
							<span style={{ marginTop: '1rem' }}>
								<button type='submit' className='button'>
									<span className='button-content'>
										<span className='material-symbols-outlined'>search_insights</span>
										Analyze
									</span>
								</button>
							</span>
						</div>
					</Form>
				</Formik>
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
