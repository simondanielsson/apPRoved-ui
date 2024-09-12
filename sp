<!-- <script> -->
<!--   import { createEventDispatcher } from 'svelte'; -->
<!---->
<!--   export let repositories = []; -->
<!--   let showRepositories = false; -->
<!--   let isSidebarExpanded = true; -->
<!--    -->
<!--   const dispatch = createEventDispatcher(); -->
<!---->
<!--   function toggleRepositories() { -->
<!--     showRepositories = !showRepositories; -->
<!--   } -->
<!--      -->
<!--   function toggleSidebarSize() { -->
<!--     isSidebarExpanded = !isSidebarExpanded; -->
<!--   } -->
<!---->
  <!-- function selectRepository(repo) { -->
  <!--   dispatch('selectRepository', {"repository": repo}); -->
  <!-- } -->
  <!---->
  <!-- function showHome() { -->
  <!--   dispatch('selectRepository', {"repository": null}); -->
  <!-- } -->
<!-- </script> -->
<!---->
<!---->
<!-- <div class="h-full shadow-lg flex flex-col"> -->
<!--   <div class="bg-primary text-white h-full flex flex-col transition-all duration-300" class:w-64={isSidebarExpanded} class:w-20={!isSidebarExpanded}> -->
<!--      -->
<!--     {#if isSidebarExpanded} -->
<!--       <div class="flex items-center mb-8 p-4"> -->
<!--         <img src="/favicon-32x32.png" alt="Logo" class="h-8 w-8 mr-3" /> -->
<!--         <span class="text-2xl font-bold">apPRoved</span> -->
<!--         <button class="text-white ml-auto mr-0" on:click={toggleSidebarSize}> -->
<!--           <span> -->
<!--             <svg  -->
<!--               xmlns="http://www.w3.org/2000/svg"  -->
<!--               fill="none"  -->
<!--               viewBox="0 0 24 24"  -->
<!--               stroke="currentColor"  -->
<!--               stroke-width="0" -->
<!--               class="w-6 h-6 transition-transform transform duration-200"  -->
<!--               class:rotate-180={!isSidebarExpanded}> -->
<!--                 <path fill="none" d="M0 0h24v24H0V0z"></path> -->
<!--                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" /> -->
<!--             </svg> -->
<!--           <span> -->
<!--         </button> -->
<!--       </div> -->
<!---->
<!--       <div class="p-4"> -->
<!--         <li class="ant-menu-item ant-menu-item-selected" role="menuitem" tabindex="-1" data-menu-id="rc-menu-uuid-68003-1-/"> -->
<!--           <span role="img" aria-label="home" class="anticon anticon-home ant-menu-item-icon"> -->
<!--             <svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true"> -->
<!--               <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"> -->
<!--               </path> -->
<!---->
<!--             </svg> -->
<!---->
<!--           </span> -->
<!--           <span class="ant-menu-title-content">Home</span> -->
<!--         </li> -->
<!--         <!-- <li class""> --> -->
<!--         <!-- <span role="img" aria-label="home" class="anticon anticon-home ant-menu-item-icon"> --> -->
<!--         <!--   <button class="flex items-center text-lg font-bold cursor-pointer bg-transparent border-none w-full text-left hover:text-gray-300 transition-all" on:click={showHome} type="button"> --> -->
<!--         <!--     <svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true"> --> -->
<!--         <!--       <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path> --> -->
<!--         <!--       <!-- <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" /> --> --> -->
<!--         <!--     </svg> --> -->
<!--         <!--     Home --> -->
<!--         <!--   </button> --> -->
<!--         <!-- </span> --> -->
<!--         <!-- </li> --> -->
<!--       </div> -->
<!---->
<!--       <div class="mb-4"> -->
<!--         <button class="flex items-center text-lg font-bold cursor-pointer bg-transparent border-none w-full text-left hover:text-gray-300 transition-all" on:click={toggleRepositories} type="button"> -->
<!--           Repositories -->
<!--           <svg  -->
<!--             class="ml-2 h-4 w-4 transition-transform duration-200" -->
<!--             xmlns="http://www.w3.org/2000/svg"  -->
<!--             fill="none"  -->
<!--             viewBox="0 0 24 24"  -->
<!--             stroke="currentColor" -->
<!--             class:rotate-180={showRepositories}> -->
<!--             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /> -->
<!--           </svg> -->
<!--         </button> -->
<!---->
<!--         {#if showRepositories} -->
<!--           <ul class="w-full"> -->
<!--             {#each repositories as repository} -->
<!--               <li> -->
<!--                 <button class="bg-primary-dark hover:text-gray-300 p-2 pl-6 rounded w-full text-left text-white border border-primary focus:outline-none focus:ring-white" on:click={() => selectRepository(repository)}> -->
<!--                   {repository.name} -->
<!--                 </button> -->
<!--               </li> -->
<!--             {/each} -->
<!--           </ul> -->
<!--         {/if} -->
<!--       </div> -->
<!--     {:else} -->
<!--         <div class="flex items-center mb-8"> -->
<!--           <button class="text-white p-2" on:click={toggleSidebarSize}> -->
<!--             <span class="ant-btn-icon"> -->
<!--               <svg  -->
<!--                 xmlns="http://www.w3.org/2000/svg"  -->
<!--                 fill="none"  -->
<!--                 viewBox="0 0 24 24"  -->
<!--                 stroke="currentColor"  -->
<!--                 stroke-width="0" -->
<!--                 class="w-6 h-6 transition-transform transform duration-200"  -->
<!--                 class:rotate-180={!isSidebarExpanded}> -->
<!--                   <path fill="none" d="M0 0h24v24H0V0z"></path> -->
<!--                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /> -->
<!--               </svg> -->
<!--             <span> -->
<!--           </button> -->
<!--         </div> -->
<!--     {/if} -->
<!--   </div> -->
<!-- </div> -->
