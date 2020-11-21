<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">
		<div class="has-text-centered mb-lg">
			<p class="is-size-4">{{ store.user.full_name }}</p>
		</div>

		<tabs class="is-marginless" :tabs="[
			{route: 'profile.edit', label: 'auth::users.profile', active: true},
			{route: 'profile.password', label: 'validation.attributes.password', active: false},
			{route: 'profile.chronicle', label: 'auth::users.activity', active: false, show: 'read_chronicle'}
		]"></tabs>

		<div class="paper">
			<form method="POST" action="/api/profile" @submit.prevent="onSubmit" autocomplete="off">
				
				<div class="paper__body paper__body--noside">
					<div class="paper__main">
						<FormBody :schema="schema" v-model="form" :readonly="false"/>
					</div>
				</div>

				<SubmitFooter :config="{icon: 'save'}" v-model="form"></SubmitFooter>

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
		titleLabel: 'auth::users.update_profile',
		form: new Form({first_name: '', last_name: '', email: ''}),
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
			}
			
		]
	}},
	created() {
		var self = this;

		axios.get(api_url_with_token('profile'))
			.then(function(response) {
				self.form.populate(response.data)
				self.isLoaded = true
		})
	},
	methods: {
		onSubmit() {
			var self = this;

			this.form.put(api_url('profile'))
				.then(function(data) { 
					Fetcher.fetchUser()
					self.notifier.success(data.message)
				})
				.catch(function(error) {
					self.notifier.danger(self.trans.get('foundation::general.errors_saving'))
					assess_error(error)
				})
		}
	}
};
</script>