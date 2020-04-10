<template>
    <div class="about" fill-height>
        <page-header/>
            <v-container grid-list-md >
                <v-layout row wrap>

                    <v-flex xs12>

                        <v-card class="text-xs-center" dark color="rgba(0, 0, 0, 0.6">
                                    <v-spacer></v-spacer>

                            <v-card-text class="pt-4" size="100" color="green"></v-card-text>
                            <v-card-text title style='font-size: 2em'>
                                THIS IS JUST ONE PAGE TO SHOW OFF VUE-ROUTER 
                            </v-card-text>
                            <v-card-text style='font-size: 1.6em'>
                                <ol>
                                    <li>Just one simple shopping list creator</li>
                                    <li>Another line here</li>
                                </ol>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
    </div>
</template>
<script>

import PageHeader from '../components/Header.vue'
export default {
  name: 'App',
  components: {

    PageHeader
  }
}
</script>

<style>
    ol li {
        list-style: none;
    }
</style>

