<template>
    <div class="page-wrapper">
        <div class="page-body">
            <div class="container-xl">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row row g-5">
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <div class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Group
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label">Group name</label>
                                                    <input type="text" class="form-control" id="group_name"
                                                        placeholder="name">
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button id="addGroup" type="submit"
                                                    class="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-header">
                                                <h3 class="card-title">Add Permission</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="row row-cards">
                                                    <div class="mb-3 col-sm-4 col-md-2">
                                                        <label class="form-label required">Method</label>
                                                        <select id="permissionMethod" class="form-select">
                                                            <option value="GET">GET</option>
                                                            <option value="POST">POST</option>
                                                            <option value="PUT">PUT</option>
                                                            <option value="DELETE">DELETE</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 col-sm-4 col-md-3">
                                                        <label class="form-label required">Group</label>
                                                        <select id="groupId" class="form-select">
                                                            <option value="1">SUPERADMIN</option>
                                                            <option value="2">STAFF</option>
                                                            <option value="3">SELLER</option>
                                                            <option value="4">USER</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 col-sm-8 col-md-10">
                                                        <label class="form-label required">URL</label>
                                                        <input id="permissionUrl" type="text" class="form-control" value="/api/">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button id="addPermission" type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>