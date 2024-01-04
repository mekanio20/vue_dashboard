<template>
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">{{ title }}</h3>
            </div>
            <div class="table-responsive">
                <table class="table card-table table-vcenter text-nowrap datatable">
                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Url</th>
                            <th>Method</th>
                            <th>Role</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in table__detail" :key="item.id">
                            <td><span class="text-secondary">#{{ item.id }}</span></td>
                            <td>{{ item.url }}</td>
                            <td>{{ item.method }}</td>
                            <td>{{ item.group.name }}</td>
                            <td>{{ item.createdAt }}</td>
                            <td>{{ item.updatedAt }}</td>
                            <td>
                                <button class="btn btn-blue" @click="
                                    update.id = item.id,
                                    update.url = item.url,
                                    update.method = item.method,
                                    update.groupId = item.group.id
                                    ">Edit
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="deletePermission(item.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Paginator :dataLength=dataLength :itemsPerPage=10 />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props: {
            title: {
                type: String,
                default: null
            },
            table__head: [],
            table__detail: []
        }
    }
</script>