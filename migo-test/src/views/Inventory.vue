<template>
  <div class="container-1">
    <h2 align="left" class="title">Inventory Manager</h2>
    <div align="left" class="pa">
      <input
        type="text"
        placeholder="Search for titles in inventory"
        class="input-class"
        v-model="search"
      />
    </div>
    <section>
      <table class="table-1">
        <thead class="header-1">
          <tr>
            <th style="width: 8px"></th>
            <th align="left" style="width: 80px">
              <span>ID</span>
            </th>
            <th align="left">
              <span>Title Name</span>
            </th>
            <th>
              <span>Type</span>
            </th>
            <th style="width: 100px" align="left">
              <span>Season</span>
            </th>
            <th style="width: 50px" align="left">
              <span>Episode</span>
            </th>
            <th align="left">
              <span>Published</span>
            </th>
            <th style="width: 150px">
              <span>Programmable</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in filteredItems">
            <tr @click="toggle(item.title_id)" :key="index">
              <td style="width: 10px; padding: 0 10px 0 16px">
                <i v-show="item.content_type === 'Series'">
                  <img
                    v-show="opened.includes(item.title_id)"
                    src="../../public/Expand.svg"
                    width="14"
                    height="14"
                    alt="" />
                  <img
                    v-show="!opened.includes(item.title_id)"
                    src="../../public/Collapse.svg"
                    width="14"
                    height="14"
                    alt=""
                /></i>
              </td>
              <td class="text-start" align="left">
                {{ item.title_id }}
              </td>
              <td class="text-title" align="left">{{ item.title_name }}</td>
              <td class="text-start">
                {{ item.content_type }}
              </td>

              <td class="text-start" align="left">
                {{ hasValue(item.seasons.length) }}
              </td>
              <td class="text-start" align="left">
                {{ hasEpisode(item.episode_count) }}
              </td>
              <td class="text-start" align="left">
                {{ hasValue(item.publish_timestamp) }}
              </td>
              <td class="text-start" align="right">
                <div class="flex-1">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="switch3"
                      @click="switchSeason(item)"
                      :value="item.title_id"
                    />
                    <span class="slider round"></span>
                  </label>
                  <div style="padding-left: 10px">
                    {{
                      item.content_type === "Movie"
                        ? "Single Movie"
                        : "All Seasons"
                    }}
                  </div>
                </div>
              </td>
            </tr>
            <template v-for="season in item.seasons">
              <tr
                @click="toggle1(season.season_id)"
                v-if="
                  opened.includes(item.title_id) &&
                  item.content_type === 'Series'
                "
                :key="season.season_id"
              >
                <td></td>
                <td align="left" class="text-start-1">
                  <i class="icon-class">
                    <img
                      v-if="!opened2.includes(season.season_id)"
                      src="../../public/Plus.svg"
                      width="14"
                      height="14"
                      alt=""
                    />
                    <img
                      v-if="opened2.includes(season.season_id)"
                      src="../../public/Minus.svg"
                      width="14"
                      height="14"
                      alt=""
                    />
                  </i>
                  <span>
                    {{ season.season_id }}
                  </span>
                </td>
                <td class="text-title" align="left">
                  <span class="text-title-2"> Season {{ index + 1 }} </span>
                </td>
                <td class="text-start">Season</td>
                <td class="text-start" align="left">
                  {{ season.season_name }}
                </td>
                <td class="text-start" align="left">
                  {{ season.episode_count }}
                </td>
                <td class="text-start" align="left">
                  {{ season.publish_timestamp }}
                </td>
                <td class="text-start">
                  <div class="flex-1">
                    <label class="switch">
                      <input
                        type="checkbox"
                        v-model="switch1"
                        :value="season.season_id"
                        @click="switchEpisodes(season)"
                      />
                      <span class="slider round"></span>
                    </label>
                    <div style="padding-left: 10px">All Episodes</div>
                  </div>
                </td>
              </tr>
              <template v-for="episode in season.episodes">
                <tr
                  :key="episode.episode_id"
                  v-if="
                    opened.includes(item.title_id) &&
                    opened2.includes(season.season_id) &&
                    item.content_type === 'Series'
                  "
                >
                  <td></td>
                  <td class="text-start" align="right">
                    {{ episode.episode_id }}
                  </td>
                  <td
                    class="text-title"
                    align="left"
                    style="padding-left: 50px"
                  >
                    {{ hasValue(episode.episode_name) }}
                  </td>
                  <td class="text-start">Episode</td>
                  <td class="text-start" align="left">--</td>
                  <td class="text-start" align="left">
                    {{ episode.episode_number }}
                  </td>
                  <td align="left">--</td>
                  <td class="text-start">
                    <div class="flex-1">
                      <label class="switch">
                        <input
                          type="checkbox"
                          v-model="switch2"
                          :value="episode.episode_id"
                        />
                        <span class="slider round"></span>
                      </label>
                      <div style="padding-left: 10px">Per Episode</div>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </template>
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
      filteredItems: [],
      isOn1: false,
      isOn2: false,
      off2: false,
      switch1: [],
      switch2: [],
      hierarchy1: false,
      opened2: [],
      opened: [],
      titles: [],
      switch3: [],
      search: "",
    };
  },

  methods: {
    hasValue(value) {
      return !value || value === 0 ? "--" : value;
    },
    hasEpisode(value) {
      return !value || value === 0 || value === 1 ? "--" : value;
    },
    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    toggle1(id) {
      const index = this.opened2.indexOf(id);
      if (index > -1) {
        this.opened2.splice(index, 1);
      } else {
        this.opened2.push(id);
      }
    },
    switchSeason(season) {
      // if(!this.switch3.includes(season.title_id)){
      //   this.switch3.push(season.title_id);
      // }

      console.log("SEASON", this.switch3);
      if (!this.switch3.includes(season.title_id)) {
        console.log("tem", this.switch3);
        season.seasons.forEach((element) => {
          this.switch1.push(element.season_id);
          // if (!this.switch1.includes(element.season_id)) {
          //   this.switch1.push(element.season_id);
          //   this.switch2 = [];
          // }
        });
      }
    },

    switchEpisodes(season) {
      if (!this.switch1.includes(season.season_id)) {
        season.episodes.forEach((element) => {
          this.switch2.push(element.episode_id);
        });
      }
    },
  },
  watch: {
    search: async function (v) {
      await axios
        .get("titles.json")
        .then((res) => {
          this.titles = res.data;
        })
        .catch((err) => console.log(err));

      this.filteredItems = this.titles.filter((item) => {
        return item.title_name.toLowerCase().match(v.toLowerCase());
      });

      if (this.filteredItems.length === 0) {
        await axios.get("titles.json").then((res) => {
          this.filteredItems = res.data;
        });
      }
    },
  },

  mounted() {
    axios
      .get("titles.json")
      .then((res) => {
        this.filteredItems = res.data;
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style scoped>
.flex-1 {
  display: flex;
  align-items: center;
}
.icon-class {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  position: relative;
  text-indent: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.text-start {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
}
.text-start-1 {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  padding: 0 0 0 20px;
}
.text-title {
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
}

.text-title-2 {
  font-weight: 600;
  padding-left: 20px;
}

table {
  border-collapse: collapse;
  border: thin solid rgba(0, 0, 0, 0.12);
}
tr {
  height: 48px;
  padding: 20px;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
th {
  background: rgba(32, 32, 32, 0.05);
  padding: 10px;
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
  background-image: url(../../public/search.svg);
  background-size: 17px 17px;
  background-position: 10px center;
  background-repeat: no-repeat;
  border: 1px solid #ccc;
  padding: 10px 5px 10px 20px;
  text-indent: 20px;

  -webkit-transition: all 0.1s;
  -moz-transition: all 0.2s;
  transition: all 0.01s;

  width: 419px;
  height: 40px;
  border-radius: 4px;
}

.input-class:focus {
  background-position: -50px center;
  text-indent: 0;
}
.switch {
  position: relative;
  display: inline-block;
  width: 47px;
  height: 21px;
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
  background-color: #b2b2b2;
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
  background-color: #08aa5e;
}

input:focus + .slider {
  box-shadow: 0 0 1px #08aa5e;
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
