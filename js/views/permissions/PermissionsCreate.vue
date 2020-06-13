<template>
	<div :class="isLoaded ? 'paper reveal is-loaded' : 'paper reveal'">
		<form method="POST" action="/api/permissions" @submit.prevent="requestStore('permissions', 'permissions.edit')" @keydown="form.errors.clear($event.target.name)" autocomplete="off">
			
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
import {View, Storer, FormBody, Form, SubmitFooter, RequiresPermissions} from 'umomega-foundation'

export default {
	mixins: [ View, Storer, RequiresPermissions ],
	components: { FormBody, SubmitFooter },
	data() { return {
		titleLabel: 'auth::permissions.create',
		breadcrumbs: [
			{to: { name: 'permissions.index'}, text: this.$root.trans.get('auth::permissions.multiple')}
		],
		guardedBy: 'rw_permissions',
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
};
</script>