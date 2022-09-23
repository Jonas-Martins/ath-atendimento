<template>
  <main id="corpo">
    <section id="corpo_slide">
      <div class="slide">
        <v-img
          lazy-src="@/imgs/complementos/enl.png"
          max-height="150"
          max-width="250"
          src="@/imgs/complementos/enl.png"
        ></v-img>
        <Login>
          <div class="btn_slide">Entrar</div>
        </Login>
        <TrocarSenha v-if="reset"></TrocarSenha>
      </div>
    </section>
  </main>
</template>

<script>
import Login from "@/components/MyLogin.vue";
import TrocarSenha from "@/components/TrocarSenha.vue";
export default {
  components: {
    Login, TrocarSenha
  },
  data() {
    return {
      reset: this.$route.query.reset,
    };
  },
};
</script>

<style scoped>
*,
a {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}

/* Slide */
#corpo_slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("../imgs/complementos/img-background-a-nova-economia.jpg");
  background-size: cover;
  background-position: center;
  text-transform: uppercase;
  text-align: center;
  color: white;
}

.slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.slide span {
  font-size: 20px;
  color: #9cd9e8;
}

.btn_slide {
  text-decoration: none;
  font-size: 15px;
  color: white;
  width: 180px;
  padding: 13px;
  border-radius: 20px;
  background-color: #9cd9e875;
  text-align: center;
  margin-top: 20px;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: 0.6s;
}

.btn_slide:hover {
  background-color: #54a6bb;
}

@media (max-width: 1060px) {
  .btn_slide {
    font-size: 13px;
    width: 150px;
    padding: 12px;
  }
}

@media (max-width: 750px) {
  .slide h1 {
    font-size: 45px;
    margin-bottom: 10px;
  }
  .slide h2 {
    font-size: 15px;
    margin-bottom: 20px;
  }
  .btn_slide {
    font-size: 12px;
    width: 140px;
    padding: 16px;
  }
}

@media (max-width: 470px) {
  .slide h1 {
    font-size: 35px;
    margin-bottom: 6px;
  }
  .slide h2 {
    font-size: 13px;
    margin-bottom: 15px;
  }
  .btn_slide {
    font-size: 10px;
    padding: 12px;
    width: 125px;
  }
}

@media (max-width: 374px) {
  .slide h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  .slide h2 {
    font-size: 11px;
    margin-bottom: 20px;
  }
  .btn_slide {
    font-size: 10px;
    padding: 10px;
    width: 120px;
    margin-bottom: 0;
  }
}
</style>