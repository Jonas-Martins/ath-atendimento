<template>
<div>
    <header id="menu">
      <div class="menu_container">
          <div class="menu_logo">
              <img src="@/imgs/complementos/logoempresa.jpeg" alt="" />
          </div>
          <nav class="menu_links">
              <div class="btn_mobile">
                  <img @click="btnMobile = !btnMobile" src="@/imgs/icones/menu.png" alt=""/>
              </div>
              <ul>
                  <li>INÍCIO</li>
                  <li><Login>ENTRAR</Login></li>
              </ul>
          </nav>
      </div>
  </header>
  <div class="menu_mobile">
    <ul class="menu_links_mobile" :style="btnMobile ? {display: 'block'} : {display: 'none'}">
        <li>INÍCIO</li>
        <li>
            <Login>ENTRAR</Login>
        </li> 
    </ul>
</div>
</div>
</template>

<script>
import Login from '@/components/MyLogin.vue'
export default {
    components: {
        Login
    },
    data(){
        return{
            btnMobile: false
        }
    },
}
</script>

<style scoped>
li{
    list-style-type: none;
}
/* Menu */
#menu {
    display: flex;
    justify-content: center;
    height: 65px;
    width: 100%;
    position: absolute;
    margin-top: 25px;
    z-index: 10 
}

.menu_container {
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: 0 auto;
}

.menu_logo {
    display: flex;
    height: 100%;
    align-items: center;
    width: 100px;
}

.menu_logo img {
    width: 100%;
}

.menu_links ul, .btn_mobile {
    display: flex;
    height: 100%;
    align-items: center;
}

.btn_mobile {
    display: none;
}

.btn_mobile img {
    cursor: pointer;
    width: 32px;

}

.menu_links ul li {
    color: white;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 16px;
    margin-left: 15px;
    cursor: pointer;
    display: flex;
}

.menu_links ul li:hover {
    color: #5ca3b5;
}

.menu_links_mobile{
    height: 100vh;
    width: 230px;
    text-align: left;
    position: absolute;
    right: 0;
    background-color: #000000d1;
    padding-top: 85px;
}

.menu_links_mobile li{
    text-decoration: none;
    color: white;
    font-size: 14px; 
    cursor: pointer;
    margin: 20px 20px 20px 25px;
}

.menu_links_mobile li:hover{
    color: #9cd9e8;
}

@media (max-width: 1060px) {
    .menu_container{
        width: 90%;
    }

    .btn_slide {
        font-size: 13px;
        width: 150px;
        padding: 12px;
    }
}

@media (max-width: 885px) {
    .menu_links ul {
        display: none;
    }
    .menu_links ul:hover {
        border-bottom: 0px;
    }
    .btn_mobile {
        display: flex;
        justify-content: center;
    }
}

@media (max-width: 750px) {
    #menu {
        justify-content: flex-start;
        height: 80px;
    }
    .menu_container {
        padding: 25px;
        width: 100%;
    }
}

@media (max-width: 374px) {
    .menu_links_mobile{
        width: 200px;
    }
}
</style>