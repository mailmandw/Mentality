<script lang="ts">
	import uuid from 'uuid-v4'
	import { dev } from '$app/env'
	let question: string = ''
	let sessionKey = ''
	let reply = ''
	let ref = null

	sessionKey = uuid()

	async function ask() {
		reply = 'thinking about it...'

		// ask the api for a response
		const res = await fetch(
			dev ? 'http://localhost:3000/api' : 'https://mentality-pi.vercel.app/api',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					session: sessionKey,
					queryInput: {
						text: {
							text: question,
							languageCode: 'en'
						}
					}
				})
			}
		)
		const response = await res.json()
		reply = ''
		// dialogflow can pass back multiple responses, just look for text responses and set the reply property
		for (const component in response.queryResult.fulfillmentMessages) {
			if (response.queryResult.fulfillmentMessages[component].text)
				reply += `${response.queryResult.fulfillmentMessages[component].text.text[0]}. `
		}
		// reset the question text, ready for a new one
		question = ''
		ref.focus()
	}
</script>

<svelte:head>
	<title>Try</title>
</svelte:head>

<div class="content">
	<h1>Ask the bot a mental health related question</h1>

	<textarea
		bind:value={question}
		on:keyup|preventDefault={e=>e.key==='Enter' && ask()}
		bind:this={ref}
		rows="2"
		name="text"
		aria-label="Type A Question"
		placeholder="Type a question"
	/>
	<button class="askbutton" on:click={ask}> Ask </button>

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
	.botreply{
		font-size: xx-large;
		font-weight: bolder;
		margin-top: 10%;
		text-align: center;
	}
</style>
