<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">
		<div class="has-text-centered mb-lg">
			<p class="is-size-4">{{ resource.name }}</p>
		</div>
		
		<tabs class="is-marginless" :tabs="[
			{route: 'permissions.edit', label: 'auth::permissions.single', active: true},
			{route: 'permissions.users', label: 'auth::users.multiple', active: false, show: 'read_users'}
		]"></tabs>

		<div class="paper">
			<form method="POST" action="/api/permissions" @submit.prevent="requestUpdate('permissions')" @keydown="form.errors.clear($event.target.name)" autocomplete="off">
				
				<div class="paper__body">
					<div class="paper__main">
						<FormBody :schema="schema" v-model="form"/>
					</div>
				</div>

				<SubmitFooter :config="{icon: 'save'}" v-model="form"></SubmitFooter>

			</form>
		</div>
	</div>
</template>

<script>
import {View, Updater, Shower, Tabs, FormBody, Form, SubmitFooter, RequiresPermissions} from 'umomega-foundation'

export default {
	mixins: [ View, Updater, Shower, RequiresPermissions ],
	components: { FormBody, SubmitFooter, Tabs },
	data() { return {
		titleLabel: 'auth::permissions.edit',
		breadcrumbs: [
			{to: { name: 'permissions.index'}, text: this.$root.trans.get('auth::permissions.multiple')}
		],
		guardedBy: 'rw_permissions',
		showRoute: 'permissions',
		form: new Form({name: ''}),
		schema: [
			{
				type: 'TextField',
				name: 'name',
				label: this.$root.trans.get('validation.attributes.name'),
				options: {required: true}
			}
		]
	}}
}
</script>