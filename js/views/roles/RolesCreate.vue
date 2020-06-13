<template>
	<div :class="isLoaded ? 'paper reveal is-loaded' : 'paper reveal'">
		<form method="POST" action="/api/roles" @submit.prevent="requestStore('roles', 'roles.edit')" @keydown="form.errors.clear($event.target.name)" autocomplete="off">
			
			<div class="paper__body">
				<div class="paper__main">
					<FormBody :schema="schema" v-model="form" :readonly="false"/>
				</div>
			</div>

			<SubmitFooter :config="{icon: 'plus'}" v-model="form"></SubmitFooter>

		</form>
	</div>
</template>

<script>
import {View, Storer, FormBody, Form, SubmitFooter, RequiresPermissions } from "umomega-foundation";

export default {
	mixins: [ View, Storer, RequiresPermissions ],
	components: { FormBody, SubmitFooter },
	data() { return {
		titleLabel: 'auth::roles.create',
		breadcrumbs: [
			{to: { name: 'roles.index'}, text: this.$root.trans.get('auth::roles.multiple')}
		],
		guardedBy: 'rw_permissions',
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
};
</script>