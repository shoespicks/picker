<template>
  <div
    class="molecules-color-variations-picker"
    :class="{ 'molecules-color-variations-picker--large': large }"
  >
    <ul>
      <li v-for="item in items" :key="item.id" @click="clickItem($event, item)">
        <span
          :style="`background-color: ${colors[item.id].code}`"
          :class="{ 'color-variations-item--active': isActive(item) }"
          class="color-variations-item"
        ></span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api';
import { ISelectItem } from '~/types/selectItem';
import { shoeColors } from '~/types/shoes/shoeColors';

export default defineComponent({
  props: {
    value: {
      // type: [Object as PropType<ISelectItem>, Array as PropType<ISelectItem[]>],
      type: [Object, Array],
      required: true
    },
    multiple: Boolean,
    items: {
      type: Array as PropType<ISelectItem[]>,
      required: true
    },
    large: {
      type: Boolean
    }
  },
  setup(props, context) {
    const isActive = computed(() => {
      return (colorVariation: ISelectItem) => {
        if (!colorVariation || !props?.value) {
          return false;
        }

        if (!props.multiple && !Array.isArray(props.value)) {
          return colorVariation.id === (props.value as ISelectItem).id;
        }

        if (Array.isArray(props?.value)) {
          return (props.value as ISelectItem[]).some(
            (v: ISelectItem) => v.id === colorVariation.id
          );
        }

        return false;
      };
    });

    const clickItem = (e: Event, colorVariation: ISelectItem) => {
      if (!colorVariation) {
        return;
      }

      e.stopPropagation();
      if (!props.multiple && !Array.isArray(props?.value)) {
        context.emit('input', colorVariation);
        return;
      }

      if (
        Array.isArray(props?.value) &&
        (props.value as ISelectItem[]).some((v) => v.id === colorVariation.id)
      ) {
        context.emit(
          'input',
          (props.value as ISelectItem[]).filter(
            (v) => v.id !== colorVariation.id
          )
        );
      } else if (Array.isArray(props?.value)) {
        context.emit('input', [
          ...(props.value as ISelectItem[]),
          colorVariation
        ]);
      }
    };

    return {
      colors: shoeColors,
      isActive,
      clickItem
    };
  }
});
</script>
<style lang="scss" scoped>
.molecules-color-variations-picker {
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: -8px 0 0 -8px;

    li {
      display: inline-flex;
      margin: 8px 0 0 8px;

      + li {
      }
    }

    .color-variations-item {
      display: inline-flex;
      width: 40px;
      height: 20px;
      border: 1px solid #ddd;
      border-radius: 2px;
      cursor: pointer;
      transition: border 100ms ease-out, opacity 200ms ease-out;

      &:hover {
        opacity: 0.8;
      }

      &.color-variations-item--active {
        border: 2px solid var(--v-primary-base);
      }
    }
  }

  &.molecules-color-variations-picker--large {
    .color-variations-item {
      width: 64px;
      height: 32px;
    }
  }
}
</style>
