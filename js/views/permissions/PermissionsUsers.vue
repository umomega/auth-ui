<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">
		<div class="has-text-centered mb-lg">
			<p class="is-size-4">{{ resource.name }}</p>
		</div>
		
		<tabs class="is-marginless" :tabs="[
			{route: 'permissions.edit', label: 'auth::permissions.single', active: false},
			{route: 'permissions.users', label: 'auth::users.multiple', active: true, show: 'read_users'}
		]"></tabs>
		
		<div class="paper">
			<Datable
				:defaultkey="'first_name'" :defaultdir="'asc'"
				:route="'permissions.users'"
				:sortables="[
					{key: 'first_name', label:'validation.attributes.name'},
					{key: 'email', label:'validation.attributes.email'},
					{key: 'created_at', label:'validation.attributes.created_at'}
				]"
				:indexloadroute="'permissions/' + $route.params.id + '/users'"
				:canwrite="$can('write_users')"
				:hidestoolbar="true"
			>
				<template v-slot:table-row-thumb="slotProps">
					<div class="datable-row-thumb">
						<img :src="slotProps.row.gravatar" class="datable-thumb">
						<span class="datable-initials" v-text="slotProps.row.initials"></span>
					</div>
				</template>

				<template v-slot:default="slotProps">
					<td><router-link :to="{ name: 'users.edit', params: {id: slotProps.row.id} }" v-text="slotProps.row.full_name" /></td>
					<td><a class="is-size-7" :href="makeMailableLink(slotProps.row.email)" v-text="slotProps.row.email"></a></td>
					<td><span class="is-size-7" v-text="makeReadableDate(slotProps.row.created_at)"></span></td>
					<DatableDropdown :can="$can('write_users')" :editroute="{ name: 'users.edit', params: {id: slotProps.row.id} }" :editlabel="trans.get('auth::users.edit')" :deletepayload="{ bulk: false, route: 'users/' + slotProps.row.id }" :deletelabel="'auth::users.delete'">
						<a href="#" class="dropdown-item" @click.prevent="revoke(slotProps.row.id)">
							<i class="icon fas fa-user-minus has-color-grey-darker"></i> {{ trans.get('auth::permissions.revoke') }}
						</a>
					</DatableDropdown>
				</template>
			</Datable>
		</div>
	</div>
</template>

<script>
import {View, Shower, Tabs, Datable, DatableDropdown, format_date, RequiresPermissions} from 'umomega-foundation'

export default {
	mixins: [ View, Shower, RequiresPermissions ],
	components: { Datable, DatableDropdown, Tabs },
	data() { return {
		titleLabel: 'auth::users.multiple',
		breadcrumbs: [
			{to: { name: 'permissions.index'}, text: this.$root.trans.get('auth::permissions.multiple')}
		],
		showRoute: 'permissions',
		guardedBy: 'rw_permissions'
	}},
	methods: {
		makeMailableLink(mail) {
			return 'mailto:' + mail
		},
		makeReadableDate(date) {
			return format_date(date)
		},
		revoke(id) {
			var self = this
			
			axios.delete(api_url('permissions/' + this.resource.id + '/users/' + id))
				.then(function(response) {
					self.notifier.success(response.data.message)
					Event.$emit('resources-deleted', {})

					if(response.data.event) Event.$emit(response.data.event)
				})
		}
	}
}
</script>