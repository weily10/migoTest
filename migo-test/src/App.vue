<template>
  <div id="app">
    <header class="toolbar">
      <div class="content">
        <div>
          <img src="../public/default.jpg" />
        </div>
        <div class="button">
          <span class="btn_content"
            ><i class="icon"><img
              src="../public/Vector.svg"
              width="16"
              height="18"
            /></i>INVENTORY</span
          >
        </div>
      </div>
    </header>
    <!-- <router-link to="/inventory">Inventory</router-link> | -->
    <main class="main">
      <section class="container"><router-view /></section>
    </main>
  </div>
</template>

<script></script>

<style>
* {
  margin: 0 !important;
}
.icon{
  padding: 2px 10px 2px 2px;
}
.btn_content {
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1 0 auto;
  justify-content: inherit;
  line-height: normal;
  position: relative;
  transition: inherit;
  transition-property: opacity;
}
.main {
}
.container {
  width: 100%;
}
.button {
  line-height: 21px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 64px;
  min-width: 176px;
  padding: 0 16px;
  position: relative;
  text-align: center;
}
.toolbar {
  top: 0;
  background-color: #e31e30;
  height: 64px;
  margin-top: 0px;
  left: 300px;
  right: 0px;
}

.content {
  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
}

#nav a {
}

#nav a.router-link-exact-active {
}
</style>
