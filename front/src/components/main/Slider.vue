<template>
  <div class="swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <v-img v-for="i in 7" :key="i"
          class='swiper-slide'
          src="https://t1.daumcdn.net/liveboard/podbbang/29b9040019ca4098bab231c1d240401b.JPG"
          aspect-ratio="1.7"
        >
          <div class='swiper-btns'>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="pink"
            >
              <v-icon dark>
                mdi-heart
              </v-icon>
            </v-btn>
            <p>천우희 30</p>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="pink"
            >
              <v-icon dark>
              </v-icon>
            </v-btn>
          </div>
          </v-img>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectCube, EffectCoverflow } from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-cube/effect-cube.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCube, EffectCoverflow ]);

export default {
  mounted() {
      new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 400,
          modifier: 1,
          slideShadows: true,
        },
        loop: true,

      });
    }
}
</script>

<style>
    .swiper {
      background: #fff;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: #000;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
    }

    .swiper-container {
      width: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
    }

    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 240px;
      height: 400px;
      background: white;
      border-radius: 20px 20px;
      position: relative;
      display: flex;
      justify-content: center;
    }

    .swiper-btns {
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 10px;
      width: 100%;
    }

</style>