<template>
	<span>
		{{ trans.get('auth::events.user_destroyed') }}: <span class="has-color-danger">{{ activity.properties.name }}</span>
	</span>
</template>

<script>
export default {props: ['activity']}
</script>