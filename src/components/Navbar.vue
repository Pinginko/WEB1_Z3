<template>
<nav class="navbar navbar-expand-lg navbar-light bg-dark-subtle">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold link-light" href="#">Zadanie 3</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/~xkubala/hanba/" class="nav-link fw-bold link-light">Dáta Študentov</router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/~xkubala/hanba/student-data/" class="nav-link fw-bold link-light">Matematické Dáta</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>


</template>


<style>
nav{
    border-radius: 20px;
}

router-link{
    color: white !important;
}
</style>
