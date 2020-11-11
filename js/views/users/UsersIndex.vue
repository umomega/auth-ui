<template>
	<Datable
		:defaultkey="'first_name'" :defaultdir="'asc'"
		:route="'users.index'"
		:sortables="[
			{key: 'first_name', label:'validation.attributes.name'},
			{key: 'email', label:'validation.attributes.email'},
			{key: 'created_at', label:'validation.attributes.created_at'}
		]"
		:createroutename="'users.create'"
		:createicon="'user-plus'"
		:indexloadroute="'users'"
		:searchloadroute="'users/search'"
		:bulkdeleteroute="'users/bulk'"
		:alllabel="'auth::users.all'"
		:canwrite="$can('write_users')"
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
			<DatableDropdown :can="$can('write_users')" :editroute="{ name: 'users.edit', params: {id: slotProps.row.id} }" :editlabel="trans.get('auth::users.edit')" :deletepayload="{ bulk: false, route: 'users/' + slotProps.row.id }" :deletelabel="'auth::users.delete'"/>
		</template>
	</Datable>
</template>

<script>
import {View, Datable, DatableDropdown, format_date, RequiresPermissions} from 'umomega-foundation'

export default {
	mixins: [ View, RequiresPermissions ],
	components: { Datable, DatableDropdown },
	data() { return {
		titleLabel: 'auth::users.manage',
		guardedBy: 'read_users'
	}},
	methods: {
		makeMailableLink(mail) {
			return 'mailto:' + mail;
		},
		makeReadableDate(date) {
			return format_date(date);
		}
	}
}
</script>