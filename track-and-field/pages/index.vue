<template>
  <div class="page-content">
    <section>
      <Container :max-width="960">
        <NumberHeading
          text="スパイクの特徴から探す"
          :number="1"
        ></NumberHeading>
        <div class="features-search-container">
          <v-row>
            <v-col cols="12" md="4">
              <div class="d-flex align-center">
                <Select
                  v-model="featuresSearchValue.eventCategory"
                  :items="eventCategories"
                  :height="40"
                  item-value="id"
                  item-text="label"
                  placeholder="種目を選ぶ"
                  :dense="false"
                ></Select>
                <span class="flex-shrink-0 ml-4">で</span>
              </div>
            </v-col>
            <v-col cols="12" md="5">
              <div class="d-flex align-center">
                <Select
                  v-model="featuresSearchValue.features"
                  :items="searchOrders"
                  :height="40"
                  item-value="id"
                  item-text="labelAlias"
                  placeholder="特徴を選ぶ"
                  :dense="false"
                ></Select>
                <span class="flex-shrink-0 ml-4">スパイクを</span>
              </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center">
              <Button
                color="accent"
                height="52"
                width="100%"
                elevation="1"
                rounded
                @click="searchByFeatures()"
                ><v-icon size="18" left>fas fa-search</v-icon>探す</Button
              >
            </v-col>
          </v-row>
        </div>
      </Container>
    </section>
    <section>
      <Container :max-width="960">
        <NumberHeading text="競技力から探す" :number="2"></NumberHeading>
        <div class="features-search-container">
          <v-row>
            <v-col cols="12" md="3">
              <div class="d-flex align-center">
                <Select
                  v-model="levelSearchValue.event"
                  :items="events"
                  :height="40"
                  item-value="id"
                  item-text="label"
                  placeholder="種目を選ぶ"
                  :dense="false"
                ></Select>
                <span class="flex-shrink-0 ml-4">で</span>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="d-flex align-center flex-wrap">
                <div class="flex-grow-1" style="width: 200px">
                  <Select
                    v-model="levelSearchValue.level"
                    :items="levels"
                    :height="40"
                    item-value="id"
                    item-text="label"
                    placeholder="競技力を選ぶ"
                    :dense="false"
                  ></Select>
                </div>
                <span class="flex-shrink-0 ml-4">におすすめスパイクを</span>
              </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center">
              <Button
                color="accent"
                height="52"
                width="100%"
                elevation="1"
                rounded
                @click="searchByLevel()"
                ><v-icon size="18" left>fas fa-search</v-icon>探す</Button
              >
            </v-col>
          </v-row>
        </div>
      </Container>
    </section>
    <section class="ranking-section">
      <Container :max-width="960">
        <NumberHeading text="おすすめスパイク" :number="3"></NumberHeading>
        <section v-if="shortRankingSpikes">
          <h3>短距離のおすすめ</h3>
          <SimpleSpikeList :spikes="shortRankingSpikes"></SimpleSpikeList>
        </section>
        <section v-if="middleRankingSpikes">
          <h3>中距離のおすすめ</h3>
          <SimpleSpikeList :spikes="middleRankingSpikes"></SimpleSpikeList>
        </section>
        <section v-if="longRankingSpikes">
          <h3>長距離のおすすめ</h3>
          <SimpleSpikeList :spikes="longRankingSpikes"></SimpleSpikeList>
        </section>
        <section v-if="highJumpRankingSpikes">
          <h3>走幅跳・三段跳のおすすめ</h3>
          <SimpleSpikeList
            :spikes="longAndTripleJumpRankingSpikes"
          ></SimpleSpikeList>
        </section>
        <section v-if="highJumpRankingSpikes">
          <h3>走高跳のおすすめ</h3>
          <SimpleSpikeList :spikes="highJumpRankingSpikes"></SimpleSpikeList>
        </section>
      </Container>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useRouter
} from '@nuxtjs/composition-api';
import Button from '~/components/atoms/Button.vue';
import Container from '~/components/atoms/Container.vue';
import NumberHeading from '~/components/atoms/NumberHeading.vue';
import Select from '~/components/atoms/Select.vue';
import SimpleSpikeList from '~/components/molecules/spikeList/SimpleSpikeList.vue';
import { spikesStore } from '~/store';
import { ISpikeModel } from '~/store/model/spike';
import { athleteLevels, IAthleteLevel } from '~/types/shoes/athleteLevel';
import {
  IEventItem,
  shoeEventCategories,
  shoeEvents
} from '~/types/shoes/shoeEvents';
import {
  IShoeSearchOrder,
  shoeSearchOrders
} from '~/types/shoes/shoeSearchOrder';

export default defineComponent({
  components: { SimpleSpikeList, Button, NumberHeading, Container, Select },
  layout: 'top',
  setup() {
    const router = useRouter();
    const shortRankingSpikes = ref<ISpikeModel[]>();
    const middleRankingSpikes = ref<ISpikeModel[]>();
    const longRankingSpikes = ref<ISpikeModel[]>();
    const longAndTripleJumpRankingSpikes = ref<ISpikeModel[]>();
    const highJumpRankingSpikes = ref<ISpikeModel[]>();

    useFetch(async () => {
      shortRankingSpikes.value = await spikesStore.getRankingByEventCodes(
        shoeEventCategories.shortDistance.eventCodes
      );

      middleRankingSpikes.value = await spikesStore.getRankingByEventCodes(
        shoeEventCategories.middleDistance.eventCodes
      );

      longRankingSpikes.value = await spikesStore.getRankingByEventCodes(
        shoeEventCategories.longDistance.eventCodes
      );

      longAndTripleJumpRankingSpikes.value =
        await spikesStore.getRankingByEventCodes([
          ...shoeEvents.longJump.eventCodes,
          ...shoeEvents.tripleJump.eventCodes
        ]);

      highJumpRankingSpikes.value = await spikesStore.getRankingByEventCodes([
        ...shoeEvents.highJump.eventCodes
      ]);
    });

    const featuresSearchValue = ref<{
      eventCategory?: IEventItem;
      features?: IShoeSearchOrder;
    }>({});

    const levelSearchValue = ref<{
      event?: IEventItem;
      level?: IAthleteLevel;
    }>({});

    return {
      shortRankingSpikes,
      middleRankingSpikes,
      longRankingSpikes,
      longAndTripleJumpRankingSpikes,
      highJumpRankingSpikes,
      featuresSearchValue,
      levelSearchValue,
      events: Object.values(shoeEvents),
      eventCategories: Object.values(shoeEventCategories),
      searchOrders: Object.values(shoeSearchOrders),
      levels: Object.values(athleteLevels),
      searchByFeatures: () => {
        featuresSearchValue.value.eventCategory &&
          spikesStore.updateSearchFormValue({
            events: [featuresSearchValue.value.eventCategory],
            order: featuresSearchValue.value.features
          });
        router.push('/search');
      },
      searchByLevel: () => {
        levelSearchValue.value.event &&
          spikesStore.updateSearchFormValue({
            events: [levelSearchValue.value.event],
            level: levelSearchValue.value.level
              ? [levelSearchValue.value.level]
              : []
          });
        router.push('/search');
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.page-content {
  > section {
    padding: 48px 32px;

    h2 + * {
      margin-top: 16px;
    }
  }
}

.features-search-container,
.level-search-container {
  padding: 32px;
}

section.ranking-section {
  padding-bottom: 80px;

  h3 {
    font-size: 18px;

    + * {
      margin-top: 16px;
    }
  }

  section + section {
    margin-top: 48px;
  }
}
</style>
