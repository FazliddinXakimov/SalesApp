<template>
  <transition name="fade">
    <div class="fixed top-0 left-0 h-full w-full bg-[#00000045] z-40">
      <div class="flex h-full w-full animate-slide-in z-50">
        <div
          class="flex flex h-full w-80 flex-col border-r border-secondary-light bg-white py-8 text-primary overflow-auto"
        >
          <div
            v-for="(catalog, index) in categories"
            :key="index"
            class="flex cursor-pointer items-center gap-3 py-3 px-4"
            :class="
              catalog.id == currentCategory?.id ? 'bg-blue-600 text-white' : ''
            "
            @mouseover="handleSelectCategory(catalog)"
          >
            <div>{{ catalog.title }}</div>
          </div>
        </div>
        <div
          class="flex h-full w-[540px] justify-between overflow-auto bg-white py-8 text-primary"
        >
          <div class="flex flex-col gap-8">
            <div v-if="currentCategory" class="px-6 last:pb-12">
              <div
                class="mb-2 cursor-pointer text-lg font-semibold leading-6 text-black"
              >
                {{ currentCategory.title }}
              </div>
              <ul class="flex flex-col gap-1.5">
                <li
                  v-for="(child, index) in currentCategory.children"
                  :key="index"
                >
                  <div>
                    <div
                      class="cursor-pointer text-slate-500 hover:text-blue-600 text-xl mt-3"
                    >
                      {{ child.title }}
                    </div>

                    <ul>
                      <li v-for="(item, ind) in child.children" :key="ind">
                        <span
                          class="ml-2 cursor-pointer text-slate-500 hover:text-blue-600 text-sm"
                        >
                          {{ item.title }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <svg
          fill="#ffffff"
          width="32"
          height="32"
          class="cursor-pointer"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          @click="catalogModal = false"
        >
          <path
            d="M16.0001 17.8658L9.46673 24.3991C9.22229 24.6435 8.91118 24.7658 8.5334 24.7658C8.15562 24.7658 7.84451 24.6435 7.60006 24.3991C7.35562 24.1546 7.2334 23.8435 7.2334 23.4658C7.2334 23.088 7.35562 22.7769 7.60006 22.5324L14.1334 15.9991L7.60006 9.46575C7.35562 9.22131 7.2334 8.9102 7.2334 8.53242C7.2334 8.15464 7.35562 7.84353 7.60006 7.59909C7.84451 7.35464 8.15562 7.23242 8.5334 7.23242C8.91118 7.23242 9.22229 7.35464 9.46673 7.59909L16.0001 14.1324L22.5334 7.59909C22.7778 7.35464 23.089 7.23242 23.4667 7.23242C23.8445 7.23242 24.1556 7.35464 24.4001 7.59909C24.6445 7.84353 24.7667 8.15464 24.7667 8.53242C24.7667 8.9102 24.6445 9.22131 24.4001 9.46575L17.8667 15.9991L24.4001 22.5324C24.6445 22.7769 24.7667 23.088 24.7667 23.4658C24.7667 23.8435 24.6445 24.1546 24.4001 24.3991C24.1556 24.6435 23.8445 24.7658 23.4667 24.7658C23.089 24.7658 22.7778 24.6435 22.5334 24.3991L16.0001 17.8658Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
import '@/assets/css/megaMenuCategory.css'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CategoryIndex',
  props: {
    category: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      mainSub: '',
    }
  },
  computed: {
    ...mapGetters({
      categories: 'references/GET_ROOT_CATEGORIES',
    }),
    catalogModal: {
      set(val) {
        return this.$store.commit('modal/changeCatalogModal', val)
      },
      get() {
        return this.$store.state.modal.catalogModal
      },
    },
    currentCategory: {
      set(val) {
        this.$store.commit('references/SET_CATEGORY', val)
      },
      get() {
        return this.$store.getters['references/GET_CURRENT_CATEGORY']
      },
    },
  },

  methods: {
    ...mapActions('references', ['FETCH_ROOT_CATEGORIES']),
    ...mapMutations('products', ['SET_NULL_PRODUCTS_LIST']),
    subGet(value) {
      this.mainSub = value.title
    },

    handleSelectCategory(category) {
      this.currentCategory = category
    },

    onSubmit(slug, sub) {
      this.SET_NULL_PRODUCTS_LIST()
      this.$nextTick(() => {
        this.$router.push(
          this.localePath(
            `/products/category/${slug.slug ? slug.slug : 'no_slug'}`
          )
        )
        this.$emit('openCatalog')
      })
    },
  },
}
</script>
<style scoped>
.fa-xmark {
  width: 32px;
  height: 32px;
  border: 1px solid #ececec;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
