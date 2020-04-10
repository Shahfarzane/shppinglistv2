<template>
  <div> 
          <v-card-text >
        <p class="font-weight-black">Add Items to list.</p>
      </v-card-text>
    <form class="itemForm" @submit.prevent="addItemToList">
      <label class="image-label" for="image">        
        <input class="image-input" type="file" name="image" accept="image/*" v-on:click="onImageClicked" v-text="Upload">
        <img class="preview-image" :src="previewImage" alt="" @click="openFileManager" height="250" width="250">
      </label>

      <div class="item-info">
        <label class="name-label" for="name">
          Item name:<br>
          <input type="text" name="name" required pattern="[A-Za-z ]+" maxlength="30">
        </label>
        <label class="amount-label" for="amount"> 
          Amount:<br>
          <Quantity class="item-quantity" :amount="amount" @change="amountChanged"/>
        </label> 
         <v-btn rounded color="error" dark large type="submit" >Add to list</v-btn>

      </div>

    </form>
  </div>
</template>

<script>

import { API, AppActions } from '../Api.js'
import Quantity from '../components/Quantity.vue'
import defaultImage from '../assets/attach.png'

export default {

  data() {
    return {
      previewImage: defaultImage,
      amount: 0,
      
    }
  },
  methods: {
    openFileManager(e) {

     e.target.previousSibling.click()
    },
    onImageClicked(e) {
      this.setImagePreview(URL.createObjectURL(e.target.files[0])) 	
      var body = document.body,
      html = document.documentElement;

      var height = Math.max( body.scrollHeight, body.offsetHeight, 
       html.clientHeight, html.scrollHeight, html.offsetHeight );

      window.scrollTo({
        top: height,
        left: 0,
        behavior: 'smooth'
      });
    },
    setImagePreview(img) {
      this.previewImage = img;
    },
    amountChanged(value) {
      if (this.amount + value < 0) {
        console.log("ERROR : there is no item todecrease");
      } else {
        this.amount += value;
      }
    },
    addItemToList(e) {
      console.log("POST request to add new item.");

      const elements = e.target.elements;
      const item = {
        name: elements.name.value,
        amount: this.amount,
        path: defaultImage
        };
        
      let formData = new FormData();

      if (elements.image.files.length > 0) {
        formData.append("image", elements.image.files[0]);
        elements.image.value = "";
        this.setImagePreview(defaultImage);
      }
      elements.name.value = "";
      
      formData.append("info", JSON.stringify(item));
      
      fetch(API.Item.Add, {
        method: 'POST',
        body: formData
      }).then(res => res.json())
        .then(data => {
          let infoMessage;
          if (data.error) {
            console.error(data.info);
          }
          else {
            item.id = data.id; 
            item.path = data.path; 
            console.log("Server has added item: ", item);

            this.$root.$emit(AppActions.Item.Add, item);
          }
      });
    }
  },
  components: {
    Quantity
  }
}
</script>

<<style scoped>


. {
	 font-family: 'Roboto', 'Helvetica', sans-serif;
}
 .itemForm {
	 width: 50%;
	 margin: 0 auto;
}
 .itemForm .image-label {
	 display: block;
	 text-align: center;
	 margin: 1em 0;
	 font-size: 1em;
}
 .preview-image {
	 display: block;
	 background-color:#FCFCFC ;
	 cursor: grab;
	 max-width: 80%;
	 margin: 2px auto 0 auto;
	 box-sizing: border-box;
	 border: dashed 1px black;
}
 .preview-image:hover {
	 box-shadow: 0px 0px 10px 5px #c1c1c1;
}
 .add-items .itemForm .image-label .image-input {
	 display: none;
}
.item-info {
	 margin: 1em 1;
	 font-size: 1.5em;
	 text-align: center;
}
 .item-info .name-label {
	 font-family: 'Courier New', Courier, monospace;
	 color: crimson;
	 display: block;
	 width: 80%;
	 margin: 1em auto;
}
.name-label input {
	 font-family: 'Courier New', Courier, monospace;
	 border: dashed black 1px;
	 width: 100%;
	 text-align: center;
	 height: 3.5rem;
	 font-size: 1.25em;
}
 .itemForm .item-info .amount-label {
	 font-family: 'Courier New', Courier, monospace;
	 display: block;
	 width: 80%;
	 margin: 1em auto;
}
 .add-items .itemForm .item-info .amount-label .item-quantity {
	 border: dashed black 5px;
}
 
</style>
