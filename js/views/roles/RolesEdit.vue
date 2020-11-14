<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">
		<div class="has-text-centered mb-lg">
			<p class="is-size-4">{{ resource.name }}</p>
		</div>

		<tabs class="is-marginless" :tabs="[
			{route: 'roles.edit', label: 'auth::roles.single', active: true},
			{route: 'roles.users', label: 'auth::users.multiple', active: false, show: 'read_users'}
		]"></tabs>

		<div class="paper">
			<form method="POST" action="/api/roles" @submit.prevent="requestUpdate('roles')" autocomplete="off">
				
				<div class="paper__body paper__body--noside">
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
		titleLabel: 'auth::roles.edit',
		breadcrumbs: [
			{to: { name: 'roles.index'}, text: this.$root.trans.get('auth::roles.multiple')}
		],
		guardedBy: 'rw_permissions',
		showRoute: 'roles',
		form: new Form({name: '', permissions_list: []}),
		schema: [
			{
				type: 'TextField',
				name: 'name',
				label: this.$root.trans.get('validation.attributes.name'),
				options: {required: true}
			},
			{
				type: 'RelationField',
				name: 'permissions_list',
				label: this.$root.trans.get('auth::permissions.multiple'),
				placeholder: this.$root.trans.get('auth::permissions.search'),
				options: {multiple: true, searchroute: 'permissions/search'}
			}
		]
	}}
}
</script>