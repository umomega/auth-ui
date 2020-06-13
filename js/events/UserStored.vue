<template>
	<span>
		{{ trans.get('auth::events.user_stored') }}<span v-if="activity.subject">: <router-link :to="{ name: 'users.edit', params: {id: activity.subject_id} }" v-text="activity.subject.name"></router-link></span>
	</span>
</template>

<script>
export default {props: ['activity']}
</script>