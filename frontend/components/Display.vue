
<template>
    <div class="about" fill-height>
        <v-parallax height="800" >
    
            <v-container  grid-list-md>
                <v-layout row wrap>

                    <v-flex xs6>
                        <v-card class="text-xs-center" dark color="rgba(0, 0, 0, 0.6">
                            <v-icon class="pt-4" size="50" color="green">NOTES:</v-icon>
                            <v-card-text title style='font-size: 2em'>
                                    <p> {{ $store.getters.notes }}</p>
                            </v-card-text>

                        </v-card>
                    </v-flex>
    
                </v-layout>
            </v-container>
        </v-parallax>
    </div>
</template>