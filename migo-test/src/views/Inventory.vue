<template>
  <div class="container-1">
    <h2 align="left" class="title">Inventory Manager</h2>
    <div align="left" class="pa">
      <input
        type="text"
        placeholder="Search for titles in inventory"
        class="input-class"
      />
    </div>
    <section>
      <table class="table-1">
        <thead class="header-1">
          <tr>
            <th>
              <span>ID</span>
            </th>
            <th align="left">
              <span>Title Name</span>
            </th>
            <th>
              <span>Type</span>
            </th>
            <th>
              <span>Season</span>
            </th>
            <th>
              <span>Episode</span>
            </th>
            <th>
              <span>Published</span>
            </th>
            <th>
              <span>Programmable</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in titles" :key="index">
            <td class="text-start" >{{item.title_id}}</td>
            <td class="text-title" align="left">{{item.title_name}}</td>
            <td class="text-start">{{item.content_type}}</td>
            <td class="text-start">{{item.seasons.length}}</td>
            <td class="text-start">{{item.episode_count}}</td>
            <td class="text-start">{{item.publish_timestamp}}</td>
            <td class="text-start">
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      titles: [],
    };
  },
  mounted() {
    axios
      .get("titles.json")
      .then((res) => {
        this.titles = res.data;
        console.log(this.titles);
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style scoped>
.text-start{
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
}
.text-title{
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
}
table {
  border-collapse: collapse;
  border: thin solid rgba(0,0,0,.12);
}
tr{
  height:48px;
  padding: 20px;
  border-bottom: thin solid rgba(0,0,0,.12);
}
th{
  background: rgba(32, 32, 32, 0.05);
  padding:10px
}
.table-1 {
  width: 100%;
}
.header-1 {
  font-size: 12px;
  line-height: 30px;
  font-weight: 500px;
  height: 48px;
  background-color: #2020200d;
}
.container-1 {
  padding: 16px 26px 26px 26px;
}
.pa {
  padding: 16px 0 16px;
}
.display {
  display: flex;
}
.title {
  line-height: 30px;
  font-size: 16px;
}

.input-class {
  width: 419px;
  height: 40px;
  border-radius: 4px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 47px;
  height:21px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:#B2B2B2;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #08AA5E;;
}

input:focus + .slider {
  box-shadow: 0 0 1px #08AA5E;;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
