<script context="module" lang="ts">

</script>

<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Help Train & Test the Mental Health Bot</h1>
	<a href="/try" class="button7" style="background-color:#a24dcc">
		<span
			style="font-size:3em; border-right:1px solid rgba(255,255,255,0.5); padding-right:0.3em; margin-right:0.3em; vertical-align:middle"
			>Try</span
		>
		 Ask the bot a question
	</a>
	<br /><br />
	<a href="/train" class="button7" style="background-color:#a24dcc">
		<span
			style="font-size:3em; border-right:1px solid rgba(255,255,255,0.5); padding-right:0.3em; margin-right:0.1em; vertical-align:middle"
			>Train</span
		>
		Train the bot to reply
	</a>
</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	a.button7 {
	display: inline-block;
	padding:0.8em 1em;
	margin:0 0.3em 0.3em 0;
	border-radius:0.2em;
	box-sizing: border-box;
	text-decoration:none;
	font-family:'Roboto',sans-serif;
	color:#FFFFFF;
	background-color:#3369ff;
	box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
	text-align:center;
	position:relative;
}
a.button7:active{	
	box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
}
</style>
