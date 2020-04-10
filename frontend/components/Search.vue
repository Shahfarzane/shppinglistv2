<template>
  <div class="search-input">
    <input class="input" type="text" name="name" placeholder="Search"
      @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style>


.search-input {
	 margin: 0.5em 0.5em 0.5em 0.5em;
	 padding: 1em 1em;
	 border: s #000033 1px;
	 position: left;
	 top: 10px;
	 bottom: 10px;
	 z-index: 50;
	 font-family: 'Courier New', Courier, monospace;
}
 .input {
	 border-radius: 10px;
	 width: 100%;
	 font-size: 3em;
	 box-sizing: border-box;
	 border-radius: 5px;
	 font-family: 'Courier New', Courier, monospace;
}
 


</style>
