<template>
	<Datable
		:defaultkey="'name'" :defaultdir="'asc'"
		:route="'permissions.index'"
		:sortables="[{key: 'name', label:'validation.attributes.name'}]"
		:createroutename="'permissions.create'"
		:indexloadroute="'permissions'"
		:searchloadroute="'permissions/search'"
		:bulkdeleteroute="'permissions/bulk'"
		:alllabel="'auth::permissions.all'"
		:canwrite="true"
	>
		<template v-slot:default="slotProps">
			<td><router-link :to="{ name: 'permissions.edit', params: {id: slotProps.row.id} }" v-text="slotProps.row.name" /></td>
			<DatableDropdown :can="true" :editroute="{ name: 'permissions.edit', params: {id: slotProps.row.id} }" :editlabel="trans.get('auth::permissions.edit')" :deletepayload="{ bulk: false, route: 'permissions/' + slotProps.row.id }" :deletelabel="'auth::permissions.delete'"/>
		</template>
	</Datable>
</template>

<script>
import {View, Datable, DatableDropdown, RequiresPermissions} from 'umomega-foundation'

export default {
	mixins: [ View, RequiresPermissions ],
	components: { Datable, DatableDropdown },
	data() { return {
		titleLabel: 'auth::permissions.manage',
		guardedBy: 'rw_permissions'
	}}
}
</script>