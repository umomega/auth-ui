<template>
	<span>
		{{ trans.get('auth::events.role_updated') }}<span v-if="activity.subject">: <router-link :to="{ name: 'roles.edit', params: {id: activity.subject_id} }" v-text="activity.subject.name"></router-link></span>
	</span>
</template>

<script>
export default {props: ['activity']}
</script>