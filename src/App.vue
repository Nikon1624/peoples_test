<template>
  <div id="app">
    <div class="search">
      <label class="search__label" for="search">Search</label>
      <input v-model="searchValue" class="search__input" id="search" type="text">
    </div>
    <ul class="peoples">
      <li v-for="(people, i) in peoplesParts[currentPart]" :key="i" class="peoples__item">{{ people.name }}</li>
    </ul>
    <Paginate v-if="paginationCount > 1"
              :page-count="paginationCount"
              :click-handler="switchPage"
              prev-text="Назад"
              next-text="Вперед"
              container-class="pagination"
              page-class="pagination__item"
              active-class="pagination__item--active"
              break-view-class="pagination__item--break"
    ></Paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
    Paginate
  },
  data() {
    return {
      searchValue: '',
      peoplesPerStep: 10,
      currentPart: 0
    };
  },
  computed: {
    ...mapGetters({
      peoples: 'getPeoples'
    }),
    needlePeoples() {
      const regExp = new RegExp(`${this.searchValue}`,'gi');
      return this.peoples.filter((people) => regExp.test(people.name));
    },
    peoplesParts() {
      return this.needlePeoples.reduce((parts, item, index) => {
        if (index % this.peoplesPerStep === 0) {
          parts.push([]);
        }

        parts[parts.length - 1].push(item);

        return parts;
      }, []);
    },
    paginationCount() {
      return this.peoplesParts.length;
    }
  },
  methods: {
    switchPage(pageNum) {
      this.currentPart = pageNum - 1;
    }
  },
  beforeCreate() {
    this.$store.dispatch('setAllPeoples');
  }
}
</script>

<style>
.search {
  margin-bottom: 10px;
}

.search__label {
  margin-right: 10px;
}

.search__input {
  padding: 5px 10px;
  border-radius: 10px;
  outline: none;
}

.peoples {
  margin: 0 0 10px;
  padding: 15px;
  list-style: none;
}

.peoples__item {
  margin-bottom: 10px;
  padding: 15px 20px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
}

.peoples__item:last-child {
  margin-bottom: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 20px;
}

.pagination__item,
.pagination li {
  margin-right: 10px;
  border-radius: 5px;
  user-select: none;
}

.pagination__item:hover,
.pagination li:hover {
  box-shadow: 0 0 0 1px #000000;
}

.pagination__item a,
.pagination li a {
  display: block;
  padding: 10px;
  outline: none;
}

.pagination__item--active {
  box-shadow: 0 0 0 1px #000000;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
}
</style>
