<template>
  <div class="quantity">
    
        <a class="item-decrease" href="" @click.prevent="$emit('change', -1)"><img class="decrease" :src="decrease" alt=""></a>
        <span class="item-amount">{{ amount }}</span>
        <a class="item-increase" href=""  @click.prevent="$emit('change', 1)"><img class="increase" :src="increase" alt=""></a>
         <div class="text-center">
    </div>
  </div>

  
</template>

<script>
import decrease from '../assets/decrease.png'
import increase from '../assets/increase.png'

export default {
  name: 'Quantity',
	 data() {
    return {
	  decrease: decrease,
	  increase: increase,
    //   amount: 0
    }
  },
  props: {
    amount:  {
      type: Number,
      required: true
    }
  },
}
</script>

<style>

.quantity .item-decrease {
	 display: inline-block;
	 vertical-align: top;
	 width: 25%;
	 text-align: center;
	 background-color: #E7E7E7;
}
 .quantity .item-decrease img {
	 vertical-align: center;
}
 .quantity .item-decrease:hover {
	 background: #10b468;
}
 .quantity .item-amount {
	 display: inline-block;
	 background-color: whitesmoke;
	 color: black;
	 text-align: center;
	 font-size: 34px;
	 line-height: 2;
	 width: 50%;
	 border: dashed 2px black;
}
 .quantity .item-increase {
	 display: inline-block;
	 vertical-align: top;
	 width: 25%;
	 text-align: center;
	 background-color: #E7E7E7;
}
 .quantity .item-increase img {
	 vertical-align: center;
}
 .quantity .item-increase:hover {
	 background: #10b468;
}
 
</style>
