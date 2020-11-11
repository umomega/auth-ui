<template>
	<Datable
		:defaultkey="'name'" :defaultdir="'asc'"
		:route="'roles.index'"
		:sortables="[{key: 'name', label:'validation.attributes.name'}]"
		:createroutename="'roles.create'"
		:indexloadroute="'roles'"
		:searchloadroute="'roles/search'"
		:bulkdeleteroute="'roles/bulk'"
		:alllabel="'auth::roles.all'"
		:canwrite="true"
	>
		<template v-slot:default="slotProps">
			<td><router-link :to="{ name: 'roles.edit', params: {id: slotProps.row.id} }" v-text="slotProps.row.name" /></td>
			<DatableDropdown :can="true" :editroute="{ name: 'roles.edit', params: {id: slotProps.row.id} }" :editlabel="trans.get('auth::roles.edit')" :deletepayload="{ bulk: false, route: 'roles/' + slotProps.row.id }" :deletelabel="'auth::roles.delete'"/>
		</template>
	</Datable>
</template>

<script>
import {View, Datable, DatableDropdown} from 'umomega-foundation'

export default {
	mixins: [ View ],
	components: { Datable, DatableDropdown },
	data() { return {
		titleLabel: 'auth::roles.manage',
		guardedBy: 'rw_permissions'
	}},
}
</script>