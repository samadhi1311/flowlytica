import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from './assets/flowlytica-mono.svg';
import Loader from './components/Loader/Loader';
import './App.css';
import axios from 'axios';

function App() {
	const error = 'Provide a valid URL';
	const [platform, setPlatform] = useState('');
	const [loading, setLoading] = useState(false);

	// Form data object with fallback values
	// https://www.pinterest.com/sithruby/handicraft/
	const [formData, setFormData] = useState({
		url: '',
		count: 0,
		text: false,
		images: false,
	});

	// Userdata object
	const [pinUserData, setPinUserData] = useState({
		avatar: '',
		username: '',
		board: '',
		pins: '',
		captions: [],
		reactions: [],
		alts: [],
	});

	const [ytUserData, setYtUserData] = useState({
		url: '',
		title: '',
		channel: [],
		views: '',
		publication_date: '',
		description: '',
		likes: '',
	});

	const handleSubmit = (values) => {
		setLoading(true);
		console.log(values);

		// Set platform
		if (values.url.includes('pinterest')) {
			setPlatform('pinterest');

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
					setPinUserData(response.data);
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading(false);
				});
		} else if (values.url.includes('youtube')) {
			setPlatform('youtube');
			// Make post request to backend
			axios
				.post('http://localhost:812/analyze', {
					url: values.url,
				})
				.then((response) => {
					console.log(response.data);
					setYtUserData(response.data);
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading(false);
				});
		} else {
			setPlatform('invalid');
		}

		// Scroll to results
		let resultsSection = document.getElementById('results');
		resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	};

	return (
		<main>
			<div className='gradient'></div>

			<section className='heading'>
				<img src={logo} className='logo' />
				<h1>_flowlytica</h1>
			</section>

			<section className='input-section'>
				<Formik initialValues={formData} onSubmit={handleSubmit}>
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
				{loading ? (
					<Loader />
				) : (
					(platform === 'pinterest' && (
						<div className='pinterest'>
							<div className='pin-header'>
								<img src={pinUserData.avatar} alt='user avatar' className='pin-avatar' />
								<span className='pin-author'>
									<h1 className='pin-heading'>{pinUserData.board}</h1>
									<h3 className='pin-username'>
										by <a href={`https://www.pinterest.com/${pinUserData.username}`}>{pinUserData.username}</a>
									</h3>
									<p className='pin-count'>{pinUserData.pins} Pins</p>
								</span>
							</div>
							<div className='pin-keywords'>
								<h2 className='pin-heading'>Top keywords</h2>
								<div className='pin-content'>
									<ol>{pinUserData.captions && pinUserData.captions.map((item, index) => <li key={index}>{item.caption}</li>)}</ol>
								</div>
							</div>

							<div className='pin-reactions'>
								<h2 className='pin-heading'>Reactions</h2>
								<div className='pin-content'>
									<ol>{pinUserData.reactions && pinUserData.reactions.map((item, index) => <li key={index}>{item.reaction}</li>)}</ol>
								</div>
							</div>

							<div className='pin-alts'>
								<h2 className='pin-heading'>Image alts</h2>
								<div className='pin-content'>
									<ol>{pinUserData.alts && pinUserData.alts.map((item, index) => <li key={index}>{item.alt}</li>)}</ol>
								</div>
							</div>
						</div>
					)) ||
					(platform === 'youtube' && (
						<div className='youtube'>
							<div className='pin-header'>
								<img src={ytUserData.channel.image} alt='user avatar' className='pin-avatar' />
								<span className='pin-author'>
									<h1 className='pin-heading'>{ytUserData.title}</h1>
									<h3 className='pin-username'>
										by <a href={`https://www.youtube.com${ytUserData.channel.url}`}>{ytUserData.channel.name.split('\n')[0].trim()}</a>
									</h3>
									<p className='pin-count'>{ytUserData.views} Views</p>
									<p className='pin-count'>{ytUserData.likes} Likes</p>
								</span>
							</div>
							<div className='pin-keywords'>
								<h2 className='pin-heading'>Description</h2>
								<div className='pin-content'>
									<p>{ytUserData.description}</p>
								</div>
							</div>
							<div className='yt-comments'></div>
						</div>
					)) ||
					(platform === 'invalid' && <div className='invalid'>Invalid URL</div>)
				)}
			</section>
		</main>
	);
}

export default App;
