  <template>
    <div class="input-box">
      <input type="range" v-model="value" min="1" max="100" class="slider" ref="slider"/>
      <span class="thumbval" v-if="value">{{ value }}</span>  
      <input type="number" v-model="value" min="1" max="100" @keydown.prevent/>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      value: 50, 
      thumbWidth: 40,
    };
  },

  mounted() {
    window.addEventListener('resize', this.moveThumb);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.moveThumb);
  },

  methods: {
    moveThumb() {
      const { width } = this.$refs.slider.getBoundingClientRect();
      const thumb = this.$el.querySelector('.thumbval');
      const thumbPositionRatio = this.value / 100;

        if(this.value > 50){      
        const thumbCenter = (width * thumbPositionRatio - width * thumbPositionRatio * 0.15 ) + 24;
        thumb.style.left = `${thumbCenter }px`;
      } else{
        const thumbCenter = (width * thumbPositionRatio - width * thumbPositionRatio * 0.15 ) + 30;
        thumb.style.left = `${thumbCenter }px`;

      }
    }
  },

  watch: {
    value(newValue) {
      this.moveThumb();
      this.$emit('changestate', newValue);
    },
  },
};

</script>


<style scoped>
.input-box{
  position: relative;
  width: 15rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

input[type=number]{
  background: #ddd;
  border-radius: 5px;
  border: 2px solid #dddddd43;
  color: white;
  font-weight: 700;
}

input[type=range] {
  -webkit-appearance: none;
  width: calc(100% - 12px);
  height: 10px;
  position: relative;
  border: 4px solid #dddddd43;
  border-radius: 7px;
  margin-bottom: 0.5em;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #ddd;
  height: 20px;
  width: 40px;
  margin-top: -8px;
  border-radius: 5px;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 300px;
  height: 5px;
  background: white;
}

.thumbval{
  position: absolute;
  transform: translateX(-50%);
  top: -15%;
  color: white;
  font-weight: 700;
  left: 50%;
  text-align:start;
}
</style>