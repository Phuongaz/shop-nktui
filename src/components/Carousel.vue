<script lang="ts">
export default {
    props: {
      products: Array,
      carouselId: String,
      classNameCarousel: String,
      classNameForImage: String,
      isAutoPlay: {
        type: Boolean,
        default: true
      },
      autoPlayMilliseconds: {
        type: Number,
        default: 5000
      }
    },
    data() {
      return {
        activeIndex: 0,
        intervalId: null
      };
    },
    methods: {
      handleClickBtn(i) {
        const href = `#Carousel_img_${i}`;
        this.goToOtherImage(href);
        this.activeIndex = i;
      },
      goToOtherImage(href) {
        const carousel = document.getElementById(this.carouselId);
        if (carousel) {
          const target = document.querySelector(href);
          const left = target.offsetLeft;
          carousel.scrollTo({ left });
        }
      }
    },
    mounted() {
      if (this.isAutoPlay) {
        this.intervalId = setInterval(() => {
          const newActiveIndex =
            this.activeIndex + 1 === this.products.length ? 0 : this.activeIndex + 1;
          const href = `#Carousel_img_${newActiveIndex}`;
          this.goToOtherImage(href);
          this.activeIndex = newActiveIndex;
        }, this.autoPlayMilliseconds);
      }
    },
    beforeDestroy() {
      clearInterval(this.intervalId);
    },
    getProductId(product) {
      return product.id;
    }
  };
</script>

<template>
    <div class="relative">
      <div :id="carouselId" :class="['carousel', classNameCarousel]">
        <!-- Carousel items -->
        <div
          v-for="(product, i) in products"
          :key="`Carousel_img_${i}`"
          :id="`Carousel_img_${i}`"
          :class="[
            'carousel-item',
            classNameForImage
          ]">
        <router-link :to="`/product/${product.id}`">
            <figure class="px-10 pt-10">
                <img
                :src="product.image"
                alt="Card Image"
                class="object-contain h-32 carousel-item"
                >
            </figure>
        </router-link>
    </div>
      </div>
      <!-- Navigation buttons -->
      <div class="flex justify-center w-full py-2 gap-2 absolute bottom-3">
        <a
          v-for="(product, i) in products"
          :key="`Carousel_img_point_${i}`"
          @click="handleClickBtn(i)"
          :href="`#Carousel_img_${i}`"
          :class="[
            activeIndex !== i && 'opacity-30',
            'btn',
            'btn-xs',
            'btn-circle'
          ]"
        ></a>
      </div>
    </div>
  </template>