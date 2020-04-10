<template>
  <div>

      {{ count }}
   
    
  </div>
</template>
<script>

import { mapState } from 'vuex';

export default {
  computed: mapState({
      count: function(state){
        if(state.count < 0){
          state.count = 0;
          return state.count;
        }
       return state.count;
     }
    })
}
</script>
