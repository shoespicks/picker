<template>
  <div class="organisms-spike-detail-spec">
    <section>
      <table>
        <tbody>
          <tr v-if="spike.name">
            <th>スパイク名</th>
            <td>{{ spike.name }}</td>
          </tr>
          <tr v-if="spike.series && spike.brand && shoeBrands[spike.brand]">
            <th>シリーズ</th>
            <td>{{ shoeBrands[spike.brand].name }} {{ spike.series }}</td>
          </tr>
          <tr v-if="spike.price">
            <th>価格</th>
            <td>{{ spike.price.toLocaleString('ja') }} 円</td>
          </tr>
          <tr v-if="spike.weight">
            <th>重さ</th>
            <td>{{ spike.weight }}g（26.0cm片足）</td>
          </tr>
          <tr v-if="spike.events">
            <th>対応種目</th>
            <td>
              <ul class="spec-item-events">
                <li v-for="event in spike.events" :key="event">
                  <v-chip
                    outlined
                    color="#383838"
                    x-small
                    disabled
                    style="padding: 0 8px; opacity: 1"
                    >{{ event }}</v-chip
                  >
                </li>
              </ul>
            </td>
          </tr>
          <tr
            v-if="
              spike.allWeatherOnly === true || spike.allWeatherOnly === false
            "
          >
            <th>対応環境</th>
            <td>
              {{ spike.allWeatherOnly ? 'オールウェザー専用' : '土兼用' }}
            </td>
          </tr>
          <tr v-if="spike.pinType && shoePinType[spike.pinType]">
            <th>スパイクピン</th>
            <td>
              {{ shoePinType[spike.pinType].label }}
              <span v-if="spike.pinDetail">（{{ spike.pinDetail }}）</span>
            </td>
          </tr>
          <tr v-if="spike.releaseYear">
            <th>発売年</th>
            <td>{{ spike.releaseYear }}年</td>
          </tr>
          <tr v-if="spike.madeIn">
            <th>生産国</th>
            <td>{{ spike.madeIn }}</td>
          </tr>
          <tr v-if="spike.shoeLaceType && !!spike.shoeLaceType.length">
            <th>靴紐タイプ</th>
            <td>
              <span v-for="laceType in spike.shoeLaceType" :key="laceType">{{
                shoeLaceTypes[laceType] && shoeLaceTypes[laceType].label
              }}</span>
            </td>
          </tr>
          <tr v-if="spike.upperMaterial">
            <th>アッパー素材</th>
            <td>{{ spike.upperMaterial }}</td>
          </tr>
          <tr v-if="spike.soleMaterial">
            <th>ソール素材</th>
            <td>{{ spike.soleMaterial }}</td>
          </tr>
          <tr v-if="spike.maxSize && spike.minSize">
            <th>サイズ</th>
            <td>{{ spike.minSize }}cm 〜 {{ spike.maxSize }}cm</td>
          </tr>
          <tr v-if="spike.level && athleteLevels[spike.level]">
            <th>競技レベル</th>
            <td>{{ athleteLevels[spike.level].label }}向け</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { ISpikeModel } from '~/store/model/spike';
import { shoeLaceTypes } from '~/types/shoes/shoeLaceTypes';
import { shoePinType } from '~/types/shoes/shoePinTypes';
import { athleteLevels } from '~/types/shoes/athleteLevel';
import { shoeBrands } from '~/types/shoes/shoeBrands';

export default defineComponent({
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup() {
    return { shoeLaceTypes, shoePinType, athleteLevels, shoeBrands };
  }
});
</script>
<style lang="scss" scoped>
// この画面幅を超えたとき特徴セクションを2列配置に
$keyFeaturesTwoColBreakPoint: 1100px;

// この画面幅を超えたときサイドナビを表示
$sideNavBreakPoint: 768px;

.organisms-spike-detail-spec {
  > section {
    display: flex;
    padding: 48px 264px 96px 32px;
    width: 100%;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: $sideNavBreakPoint) {
      padding: 48px 32px 96px;
    }

    > table {
      max-width: 100%;

      > tbody {
        > tr {
          height: 50px;

          > th {
            text-align: left;
            width: 160px;
          }

          > * {
            vertical-align: center;
            padding: 16px 16px 16px 32px;
          }
        }
      }
    }

    ul.spec-item-events {
      display: flex;
      margin-top: -8px;
      margin-left: -8px;
      align-items: center;
      flex-wrap: wrap;

      > li {
        display: inline-flex;
        margin-top: 8px;
        margin-left: 8px;
      }
    }
  }
}
</style>
