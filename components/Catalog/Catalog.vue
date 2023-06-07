<template>
  <div>
    <div :class="category ? 'openCatalog menu' : 'defaultCatalog menu'">
      <div class="body__menu">
        <b-container class="p-0">
          <div class="float-right mt-2 mr-1" @click="$emit('openCatalog')">
            <i class="fa-solid fa-xmark" />
          </div>
          <b-row>
            <b-card class="w-100 border-0" no-body>
              <b-tabs pills card vertical>
                <b-tab
                  v-for="(item, indexMenu) in GET_MEGA_MENU"
                  :key="indexMenu"
                  :title="item.title ? item.title[$i18n.locale] : ''"
                >
                  <div class="ml-3 animate">
                    <h5 v-if="item.title" class="menu__h5">
                      <NuxtLink
                        v-if="item.title"
                        :to="
                          localePath(
                            `/products/category/${
                              item.slug ? item.slug : 'no_slug'
                            }`
                          )
                        "
                        class="menu__ul__h6"
                      >
                        <span @click="$emit('openCatalog')">
                          {{ item.title[$i18n.locale] }}
                        </span>
                      </NuxtLink>
                    </h5>
                    <div class="row overflow-auto">
                      <ul
                        v-for="(sub, indexSub) in item.children"
                        :key="indexSub"
                        class="ul__menu col-md-6 col-lg-3 col-12"
                      >
                        <NuxtLink
                          v-if="sub.title"
                          :to="
                            localePath(
                              `/products/category/${
                                sub.slug ? sub.slug : 'no_slug'
                              }`
                            )
                          "
                          class="menu__ul__h6"
                        >
                          <span @click="$emit('openCatalog')">
                            {{ sub.title[$i18n.locale] }}
                          </span>
                        </NuxtLink>
                        <br />

                        <br />
                        <li
                          v-for="(br, indexBrands) in sub.children"
                          :key="indexBrands"
                          class="mb-2"
                          @click="onSubmit(br, sub)"
                        >
                          <div v-if="br.title" class="ft-li">
                            <span @click="subGet(sub)">
                              {{ br.title[$i18n.locale] }}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-row>
        </b-container>
      </div>
    </div>

    <div
      :class="category ? 'black__shadow' : ''"
      @click="$emit('openCatalog')"
    />
  </div>
</template>

<script>
import '../../assets/css/megaMenuCategory.css'
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
    ...mapGetters('knowledgeBase', ['GET_MEGA_MENU']),
  },
  async mounted() {
    await this.FETCH_MEGA_MENU()
  },
  methods: {
    ...mapActions('knowledgeBase', ['FETCH_MEGA_MENU']),
    ...mapMutations('products', ['SET_NULL_PRODUCTS_LIST']),
    subGet(value) {
      this.mainSub = value.title[this.$i18n.locale]
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
<style>
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
</style>
