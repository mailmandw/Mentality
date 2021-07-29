<script lang="ts">
	import uuid from 'uuid-v4';
	import { dev } from '$app/env';
	import { toast } from '@zerodevx/svelte-toast';

	let question: string = '';
	let answer: string = '';
	let sessionKey = '';
	let reply = '';
	let ref = null;

	sessionKey = uuid();

	async function train() {
		if (!question || !answer) {
			toast.push('You must add a question and answer');
			return;
		}
		reply = 'thinking...';
		const id = uuid();
		// ask the api for a response
		const res = await fetch(
			dev
				? 'http://localhost:3000/api/intents/save'
				: 'https://mentality-pi.vercel.app/api/intents/save',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					intent_name: id,
					id: id,
					user_says: [question],
					bot_says: [answer],
					parent: ''
				})
			}
		);
		const response = await res.json();

		if (res.status === 200) {
			if (response) {
				reply = 'Success! I am now trained to reply to this question';
			}
			// reset the question text, ready for a new one
			question = '';
			answer = '';
		} else{
			reply = `Oh no! I could not save that. Here is my error: ${res.statusText}`;
			toast.push(`Error: ${res.statusText}`);
		}
		ref.focus();
	}
</script>

<svelte:head>
	<title>Try</title>
</svelte:head>

<div class="content">
	<h1>Train the bot to answer mental health related questions</h1>

	<label for="question">Add the question</label>
	<textarea
		bind:value={question}
		bind:this={ref}
		rows="2"
		name="question"
		aria-label="Type A Question"
		placeholder="Type a question"
	/>
	<label for="answer">How should the bot respond?</label>
	<textarea
		bind:value={answer}
		on:keyup|preventDefault={(e) => e.key === 'Enter' && train()}
		rows="2"
		name="answer"
		aria-label="Type a response"
		placeholder="Type a response"
	/>
	<button class="askbutton" on:click={train}> Train </button>

	<div class="botreply">{reply}</div>
</div>

<style>
	textarea {
		font-size: 20px;
		width: 100%;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
	}

	textarea:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}

	.askbutton {
		width: 100%;
		display: inline-block;
		padding: 10px;
		margin-top: 10px;
		border-radius: 8px;
		color: #ffffff;
		background-color: #3369ff;
		text-align: center;
	}
	.botreply {
		font-size: xx-large;
		font-weight: bolder;
		margin-top: 10%;
		text-align: center;
	}
</style>
