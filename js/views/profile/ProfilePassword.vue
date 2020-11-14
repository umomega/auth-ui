<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">
		<div class="has-text-centered mb-lg">
			<p class="is-size-4">{{ store.user.full_name }}</p>
		</div>

		<tabs class="is-marginless" :tabs="[
			{route: 'profile.edit', label: 'auth::users.profile', active: false},
			{route: 'profile.password', label: 'validation.attributes.password', active: true},
			{route: 'profile.chronicle', label: 'auth::users.activity', active: false, show: 'read_chronicle'}
		]"></tabs>

		<div class="paper is-padded">
			<form method="POST" action="/api/profile/password" @submit.prevent="onSubmit" autocomplete="off">
				<div class="paper__body paper__body--noside">
					<div class="paper__main">
						<FormBody :schema="schema" v-model="form" :readonly="false"/>
					</div>
				</div>

				<SubmitFooter :config="{icon: 'lock'}" v-model="form"></SubmitFooter>
			</form>
		</div>
	</div>
</template>

<script>
import {View, Tabs, FormBody, Form, SubmitFooter, assess_error} from 'umomega-foundation'

export default {
	mixins: [ View ],
	components: { Tabs, FormBody, SubmitFooter },
	data() { return {
		titleLabel: 'auth::users.change_password',
		form: new Form({old_password: '', password: ''}),
		schema: [
			{
				type: 'PasswordField',
				name: 'old_password',
				label: this.$root.trans.get('validation.attributes.old_password'),
				options: {meter: false, required: true}
			},
			{
				type: 'PasswordField',
				name: 'password',
				label: this.$root.trans.get('validation.attributes.new_password'),
				options: {meter: true, required: true},
				hint: this.$root.trans.get('auth::auth.hint_password')
			}
		]
	}},
	methods: {
		onSubmit() {
			var self = this;

			this.form.post(api_url('profile/password'))
				.then(function(data) {
					self.notifier.success(data.message);
					self.form.reset();
				})
				.catch(function(error) {
					self.notifier.danger(self.trans.get('foundation::general.errors_saving'))
					assess_error(error)
				})
		}
	},
	mounted() {
		const self = this

		setTimeout(function() {
			self.isLoaded = true
		})
	}
};
</script>