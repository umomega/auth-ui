<template>
	<div :class="isLoaded ? 'paper reveal is-loaded' : 'paper reveal'">
		<form method="POST" action="/api/users" @submit.prevent="requestStore('users', 'users.edit')" autocomplete="off">
			
			<div class="paper__body paper__body--noside">
				<div class="paper__main">
					<FormBody :schema="schema" v-model="form" :readonly="false"/>
				</div>
			</div>

			<SubmitFooter :config="{icon: 'user-plus'}" v-model="form"></SubmitFooter>

		</form>
	</div>
</template>

<script>
import {View, Storer, FormBody, Form, SubmitFooter, RequiresPermissions} from 'umomega-foundation'

export default {
	mixins: [ View, RequiresPermissions, Storer ],
	components: { FormBody, SubmitFooter },
	data() { return {
		titleLabel: 'auth::users.create',
		breadcrumbs: [
			{to: { name: 'users.index'}, text: this.$root.trans.get('auth::users.multiple')}
		],
		guardedBy: 'write_users',
		form: new Form({first_name: '', last_name: '', email: '', password: '', roles_list: [], permissions_list: [], locale: this.$root.appLocale}),
		schema: [
			{
				type: 'EmailField',
				name: 'email',
				label: this.$root.trans.get('validation.attributes.email'),
				options: {required: true},
				hint: this.$root.trans.get('auth::auth.hint_email')
			},
			{
				type: 'TextField',
				name: 'first_name',
				label: this.$root.trans.get('validation.attributes.first_name'),
				options: {required: true}
			},
			{
				type: 'TextField',
				name: 'last_name',
				label: this.$root.trans.get('validation.attributes.last_name'),
				options: {required: true}
			},
			{
				type: 'PasswordField',
				name: 'password',
				label: this.$root.trans.get('validation.attributes.password'),
				options: {meter: true, required: true},
				hint: this.$root.trans.get('auth::auth.hint_password')
			},
			{
				type: 'RelationField',
				name: 'roles_list',
				label: this.$root.trans.get('auth::roles.multiple'),
				placeholder: this.$root.trans.get('auth::roles.search'),
				options: {multiple: true, searchroute: 'roles/search'}
			},
			{
				type: 'RelationField',
				name: 'permissions_list',
				label: this.$root.trans.get('auth::permissions.multiple'),
				placeholder: this.$root.trans.get('auth::permissions.search'),
				options: {multiple: true, searchroute: 'permissions/search'}
			},
			{
				type: 'SelectField',
				name: 'locale',
				label: this.$root.trans.get('validation.attributes.locale'),
				options: {
					required: true,
					choices: [
						{ value: 'en', label: 'English'},
						{ value: 'tr', label: 'Türkçe'},
					]
				}
			}
		]
	}}
};
</script>