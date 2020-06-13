<template>
	<span>
		{{ trans.get('auth::events.permission_revoked') }}<span v-if="activity.subject">: {{ activity.properties.user }} (<router-link :to="{ name: 'permissions.edit', params: {id: activity.subject_id} }" v-text="activity.subject.name"></router-link>)</span>
	</span>
</template>

<script>
export default {props: ['activity']}
</script>