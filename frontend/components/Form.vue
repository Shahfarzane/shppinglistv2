


<template>
    <div class="about" fill-height>
    
            <v-container grid-list-md style="fill" class="scroll-y">
                <v-layout row wrap>

                    <v-flex xs6>
                        <v-card class="text-xs-center" dark color="dark grey">
                            <v-icon class="pt-4" size="50" color="green">Add notes:</v-icon>
                            <v-card-text title style='font-size: 2em'>
                                  <div>
                                   <label aria-multiline="5" for="notes">Write here :  </label>
                                   <input @input="changed" name="notes">
                                </div>
                            </v-card-text>

                        </v-card>
                    </v-flex>
    
                </v-layout>
            </v-container>
    </div>
</template>

<script>
export default {
  methods: {
    changed: function(event) {
      this.$store.commit('change', event.target.value)
    }
  }
}
</script>