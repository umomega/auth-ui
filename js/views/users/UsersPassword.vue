<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">
		<div class="has-text-centered mb-lg">
			<p class="is-size-4">{{ resource.full_name }}</p>
		</div>
		
		<tabs class="is-marginless" :tabs="[
			{route: 'users.edit', label: 'auth::users.single', active: false},
			{route: 'users.password', label: 'validation.attributes.password', active: true, show: 'write_users'},
			{route: 'users.chronicle', label: 'auth::users.activity', active: false, show: 'read_chronicle'}
		]"></tabs>

		<div class="paper">
			<form method="POST" action="/api/users/password" @submit.prevent="requestUpdate('users/password')" @keydown="form.errors.clear($event.target.name)" autocomplete="off">
				
				<div class="paper__body">
					<div class="paper__main">
						<FormBody :schema="schema" v-model="form" :readonly="!$can('write_users')"/>
					</div>
				</div>

				<SubmitFooter v-if="$can('write_users')" :config="{icon: 'lock'}" v-model="form"></SubmitFooter>

			</form>
		</div>
	</div>
</template>

<script>
import {View, Updater, Shower, Tabs, FormBody, Form, SubmitFooter, RequiresPermissions} from "umomega-foundation";

export default {
	mixins: [ View, RequiresPermissions, Updater, Shower ],
	components: { FormBody, SubmitFooter, Tabs },
	data() { return {
		titleLabel: 'auth::users.change_password',
		breadcrumbs: [
			{to: { name: 'users.index'}, text: this.$root.trans.get('auth::users.multiple')}
		],
		guardedBy: 'write_users',
		showRoute: 'users',
		form: new Form({password: ''}),
		schema: [
			{
				type: 'PasswordField',
				name: 'password',
				label: this.$root.trans.get('validation.attributes.password'),
				options: {meter: true}
			}
		]
	}}
}
</script>