<template>
  <article class="organisms-spike-detail">
    <Container :max-width="1244" padding="0 32px 48px">
      <SpikeDetailTop
        :spike="spike"
        :is-favorite.sync="isFavorite"
        :have.sync="have"
        :reviewed.sync="reviewed"
      ></SpikeDetailTop>
    </Container>
    <div class="spike-detail-tab">
      <Container :max-width="1244" padding="0 32px">
        <v-tabs v-model="selectedTab" color="#262626" :height="60" grow>
          <v-tab :ripple="false">Top</v-tab>
          <v-tab :ripple="false">スペック情報</v-tab>
        </v-tabs>
      </Container>
    </div>
    <StickySidenavLayout
      :sticky-container-top-px="140"
      :container-max-width="1244"
      right
    >
      <v-tabs-items v-model="selectedTab">
        <v-tab-item>
          <SpikeDetailIntroduction :spike="spike"></SpikeDetailIntroduction>
        </v-tab-item>
        <v-tab-item>
          <SpikeDetailSpec :spike="spike"></SpikeDetailSpec>
        </v-tab-item>
        <v-tab-item>
          <div class="spacer">Comming Soon！</div>
        </v-tab-item>
      </v-tabs-items>
      <template #sidenav>
        <div class="sidenav-item">
          <ul class="sidenav-buttons">
            <li v-if="spike.amazonUrl">
              <Button
                color="grey darken-2"
                :width="200"
                :height="40"
                dark
                @click="openNewTabByUrl(spike.amazonUrl)"
              >
                <v-icon left>fab fa-amazon</v-icon>Amazonで買う</Button
              >
            </li>
            <li v-if="spike.rakutenUrl">
              <Button
                color="grey darken-2"
                :width="200"
                :height="40"
                dark
                @click="openNewTabByUrl(spike.rakutenUrl)"
                >楽天で買う</Button
              >
            </li>
            <li v-if="spike.brandPageUrl">
              <Button
                color="grey darken-2"
                :width="200"
                :height="40"
                dark
                @click="openNewTabByUrl(spike.brandPageUrl)"
                >公式サイトで買う</Button
              >
            </li>
          </ul>
          <section class="sidenav-recomend-items-section">
            <h4>似ているスパイク</h4>
            <ul>
              <li v-for="item in spike.recommendItems" :key="item.name">
                <router-link :to="`/search/${item.slug}`">
                  <LinkItem
                    :label="item.name"
                    :image-url="item.colorVariationImage1[0]"
                    :image-width="40"
                  ></LinkItem>
                </router-link>
              </li>
            </ul>
          </section>
        </div>
      </template>
    </StickySidenavLayout>
    <SpikeRecommendLink :spike="spike"></SpikeRecommendLink>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import Container from '~/components/atoms/Container.vue';
import StickySidenavLayout from '~/components/molecules/layout/StickySidenavLayout.vue';
import LinkItem from '~/components/molecules/links/LinkItem.vue';
import SpikeDetailTop from '~/components/organisms/spike-detail/SpikeDetailTop.vue';
import SpikeRecommendLink from '~/components/organisms/spike-detail/SpikeRecommendLink.vue';
import SpikeDetailIntroduction from '~/components/organisms/spike-detail/tab-content/SpikeDetailIntroduction.vue';
import SpikeDetailSpec from '~/components/organisms/spike-detail/tab-content/SpikeDetailSpec.vue';
import { ISpikeModel } from '~/store/model/spike';
import { openNewTabByUrl } from '~/utils/navigateUtils';

export default defineComponent({
  components: {
    SpikeRecommendLink,
    LinkItem,
    SpikeDetailSpec,
    Button,
    Container,
    StickySidenavLayout,
    SpikeDetailIntroduction,
    SpikeDetailTop
  },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      default: null
    }
  },
  setup() {
    return {
      isFavorite: ref<number>(),
      have: ref<number>(),
      reviewed: ref<number>(),
      selectedTab: ref<any>(),
      openNewTabByUrl: (url: string) => {
        openNewTabByUrl(url);
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-spike-detail {
  > .container {
    + .container {
      margin-top: 80px;
    }
  }

  .spike-detail-tab {
    position: sticky;
    top: 48px;
    z-index: 10;
    background-color: #ffffff;
  }

  .sidenav-item {
    width: 200px;

    > * + * {
      margin-top: 32px;
    }

    > .sidenav-buttons {
      * + * {
        margin-top: 16px;
      }
    }

    > .sidenav-recomend-items-section {
      h4 {
        + * {
          margin-top: 8px;
        }
      }

      > ul {
        > li {
          margin-top: 8px;
        }
      }
    }
  }

  .spacer {
    height: 1000px;
    padding-top: 64px;
    text-align: center;
  }
}
</style>
