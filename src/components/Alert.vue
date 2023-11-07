<template>
    <div class="container-xl">
        <div class="alert alert-success alert-warning-success" role="alert">Success!</div>
        <div class="alert alert-danger alert-warning-error" role="alert">Error!</div>
    </div>
</template>

<style>
    .alert {
      width: 80%;
      margin: 10px auto;
      position: relative;
      padding: 0.75rem 1.25rem;
      border: 1px solid transparent;
      border-radius: 0.25rem;
    }

    .alert-success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
    }

    .alert-danger {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
</style>