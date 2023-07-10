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
                @click="toCatalogPage(currentCategory)"
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
                      @click="toCatalogPage(child)"
                    >
                      {{ child.title }}
                    </div>

                    <ul>
                      <li v-for="(item, ind) in child.children" :key="ind">
                        <span
                          class="ml-2 cursor-pointer text-slate-500 hover:text-blue-600 text-sm"
                          @click="toCatalogPage(item)"
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

        <span>
          <img
            src="@/assets/img/close.svg"
            width="20"
            height="20"
            class="cursor-pointer ml-1 mt-1"
            @click="catalogModal = false"
          />
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
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

    handleSelectCategory(category) {
      this.currentCategory = category
    },

    toCatalogPage(catalog) {
      this.$router.push(
        this.localePath({
          name: `catalog-id`,
          params: { id: catalog.slug },
          query: { catalog: catalog.id },
        })
      )

      this.catalogModal = false
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
<style src="@/assets/css/megaMenuCategory.css" scoped></style>
