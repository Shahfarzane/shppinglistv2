<template>
    <v-container grid-list-xl>
      <v-layout wrap>
  <li class="item" :class="itemClass" @mouseleave="showDialogBox = true">
    <div class="item-img-wrapper">  
      <img class="item-img" :src="path" alt="">
      <div class="item-img-delete-overlay">
        <img @click="showDialogBox = false" class="delete-button" :class="{'hide-dialog-box': !this.showDialogBox}" :src="del" alt="">
        <div class="dialog" :class="{'hide-dialog-box': this.showDialogBox}">
          <span>Are you sure about deleting {{ name }} from list? </span><br>
          <img @click="onDelete" class="ok" :src="ok" alt="">
          <img @click="showDialogBox = true" class="cancel" :src="cancel" alt="">
        </div>
      </div>
    </div>
    <div class="item-name"><span>{{ name }}</span></div>
    <Quantity :amount="amount" @change="amountChanged"/>
  </li>
  </v-layout>
</v-container>
</template>

<script>
import Quantity from './Quantity.vue'
import { API, AppActions } from '../Api.js'
import ok from '../assets/ok.png' 
import cancel from '../assets/cancel.png' 
import del from '../assets/delete.png'
import defImage from'../assets/attach.png'

export default {
  name: 'Item',
  props: {
    id:  { type: Number, required: true },
    name:  { type: String, required: true },
    amount:  { type: Number, required: true },
    path:  { type: String, required: true },
    found:  { type: Boolean, required: true }
  },
  data() {
    return {
      showDialogBox: true,
      cancel: cancel,
      ok: ok,
      del: del,
      defImage: defImage
    }
  },
  computed: {
    itemClass() {
      return {
        'item-not-found': !this.found
      }
    }
  },
  methods: {
    onDelete() {
      console.log("onDeleteClick");
      
      fetch(API.Item.Remove, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: this.id, defImage: this.path === defImage })
      }).then(res => res.json())
        .then(data => {
          let infoMessage;
          if (data.error) {
            console.error(data.info);
          }
          else {
            console.log("Server successfully removed item with id: ", this.id, this.name);
            this.$root.$emit(AppActions.Item.Remove, this.id, this.name);
          }
      });
    },
    amountChanged(value) {
      const ApiUrl = (value > 0) ? API.Item.Increase : API.Item.Decrease;
      const EventToEmit = (value > 0) ? AppActions.Item.Increase : AppActions.Item.Decrease;
      
      if (this.amount + value < 0) {
        console.log("Can't decrease item below 0");
        return;
      }

      fetch(ApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: this.id})
      }).then(res => {
          if (res.status == 200) {

            this.$root.$emit(EventToEmit, this.id);
            return "Server successfully increased/decreased item count. Emit " + EventToEmit + " event.";
          } 
          return res.text();
      }).then(info => {
        console.log(info);
      });
    }
  },
  components: {
    Quantity
  }
}
</script>

<style>


.item {
	 width: 50%;
	 margin: 1 auto;
	 font-family: 'Courier New', Courier, monospace;
	 background-color: FCFCFC;
	 border: solid black 1px;
}
 .item .item-img-wrapper {
	 height: 255px;
	 text-align: center;
	 position: relative;
}
 .item .item-img-wrapper .item-img {
	 width: 100%;
	 height: 100%;
}
 .item .item-img-wrapper .item-img-delete-overlay {
	 z-index: 5;
	 text-align: initial;
	 position: absolute;
	 top: 0px;
	 width: 100%;
	 height: 100%;
}
 .item .item-img-wrapper .item-img-delete-overlay .delete-button {
	 float: left;
	 width: 14%;
	 max-width: 4em;
	 padding-top: 1px;
	 padding-right: 2px;
}
 .item .item-img-wrapper .item-img-delete-overlay .dialog {
	 width: 100%;
	 text-align: center;
	 position: absolute;
	 top: 50%;
	 transform: translateY(0%);
}
 .item .item-img-wrapper .item-img-delete-overlay .dialog span {
	 background-color: crimson;
	 font-size: 2em;
}
 .item .item-img-wrapper .item-img-delete-overlay .dialog img {
	 vertical-align: middle;
	 max-width: 3em;
	 margin: 2em 2em 0 2em;
	 filter: drop-shadow(1px 1px black);
}
 .item .item-name {
	 background-color: whitesmoke;
	 border-style: solid;
	 border-width: 1px 0;
	 border-color: black;
	 text-align: center;
	 line-height: 5em;
	 max-height: 5em;
	 color: red;
}
 .item .item-name span {
	 display: inline-block;
	 font-size: 2em;
	 vertical-align: middle;
	 line-height: 0.8;
}
 .item-not-found {
	 border: solid 1px red;
	 filter: grayscale(95%) brightness(50%);
}
 .hide-dialog-box {
	 visibility: hidden;
}
 
</style>
