<template lang="html">
   <div id="formView">
      <form id="contactForm" class="contact-form" v-if="!submitted">
         <h1>Kontaktandmed</h1>
         <label>Ees -ja perenimi</label>
         <input type="text" v-model="contactForm.submittedName"/>
         <br>
         <label>Telefon</label>
         <input type="tel" v-model="contactForm.submittedPhone" placeholder="+372 "/>
         <br>
         <label>E-post</label>
         <input type="email" v-model="contactForm.submittedEmail"/>
         <br>
         <label>Tänav, maja, korter</label>
         <input type="text"v-model="contactForm.submittedAddress"/>
         <br>
         <label>Küla/alevik</label>
         <input type="text"v-model="contactForm.submittedArea"/>
         <br>
         <label>Linn/maakond</label>
         <select v-model="contactForm.submittedCounty">
            <option value="" disabled selected hidden>Vali</option>
            <option value="Harjumaa">Harjumaa</option>
            <option value="Hiiumaa">Hiiumaa</option>
            <option value="Ida-Virumaa">Ida-Virumaa</option>
            <option value="Jõgevamaa">Jõgevamaa</option>
            <option value="Järvamaa">Järvamaa</option>
            <option value="Läänemaa">Läänemaa</option>
            <option value="Lääne-Virumaa">Lääne-Virumaa</option>
            <option value="Põlvamaa">Põlvamaa</option>
            <option value="Pärnumaa">Pärnumaa</option>
            <option value="Raplamaa">Raplamaa</option>
            <option value="Saaremaa">Saaremaa</option>
            <option value="Tartumaa">Tartumaa</option>
            <option value="Valgamaa">Valgamaa</option>
            <option value="Viljandimaa">Viljandimaa</option>
            <option value="Võrumaa">Võrumaa</option>
         </select>
         <br>
         <div class="radio-button-wrap">
            <input type="radio" name="deliveryAddress" id="delivery1" value="false" checked v-model="contactForm.newAddress"/> <label for="delivery1" class="check-label">Kohaletoimetamine sama aadressile</label>
            <br>
            <br>
            <input type="radio" name="deliveryAddress" id="delivery2" value="true" v-model="contactForm.newAddress"/> <label for="delivery2" class="check-label">Kohaletoimetamine erinevale aadressile</label>
         </div>
         <!-- Lisa-aadressi algus -->
         <div v-if="contactForm.newAddress==='true'">
            <label>Tänav, maja, korter</label>
            <input type="text" v-model="contactForm.submittedExtraAddress"/>
            <br>
            <label>Küla/alevik</label>
            <input v-model="contactForm.submittedExtraArea"/>
            <br>
            <label>Linn/maakond</label>
            <select v-model="contactForm.submittedExtraCounty">
               <option value="" disabled selected hidden>Vali</option>
               <option value="Harjumaa">Harjumaa</option>
               <option value="Hiiumaa">Hiiumaa</option>
               <option value="Ida-Virumaa">Ida-Virumaa</option>
               <option value="Jõgevamaa">Jõgevamaa</option>
               <option value="Järvamaa">Järvamaa</option>
               <option value="Läänemaa">Läänemaa</option>
               <option value="Lääne-Virumaa">Lääne-Virumaa</option>
               <option value="Põlvamaa">Põlvamaa</option>
               <option value="Pärnumaa">Pärnumaa</option>
               <option value="Raplamaa">Raplamaa</option>
               <option value="Saaremaa">Saaremaa</option>
               <option value="Tartumaa">Tartumaa</option>
               <option value="Valgamaa">Valgamaa</option>
               <option value="Viljandimaa">Viljandimaa</option>
               <option value="Võrumaa">Võrumaa</option>
            </select>
         </div> <!-- Lisa-aadressi lõpp -->
         <div class="accept-box-wrap">
            <input type="checkbox" value="true" v-model="contactForm.submittedAccept"/> <!-- v-model lisab true väärtuse submittedAccept muutujale -->
            <label>Olen tingimustega tutvunud</label>
         </div>
         <!-- Salvesta nupp-->
         <div class="submit-button-wrap">
            <button :disabled="!contactForm.submittedAccept" v-on:click.prevent="submitForm">Salvesta</button> <!-- Nupp on disabled kuni submittedAccept on true. Vajutades kutsutakse submitForm meetod, mis määrab muutuja "submitted" true-ks. -->
         </div>
      </form>
      <div id="readOnly" v-if="submitted" class="read-only"> <!-- readOnly on ainult siis nähtav kui kasutaja on vajutanud "Salvesta" nuppu -->
         <h1>Sisestatud kontaktandmed</h1>
         <p>Ees -ja perenimi: {{contactForm.submittedName}} </p>
         <p>Telefoni number: +372 {{contactForm.submittedPhone}}</p>
         <p>E-posti aadress: {{contactForm.submittedEmail}}</p>
         <p>Aadress: {{contactForm.submittedAddress}}, {{contactForm.submittedArea}}, {{contactForm.submittedCounty}}</p>
         <button v-on:click.prevent="editFrom" class="submit-button">Muuda</button> <!-- Vajutades muuda nuppu kutsutakse editForm meetod, et muuta "submitted" muutuja väärtus false-ks ning taaskuvada kontaktvorm -->
      </div>
   </div>
</template>

<script>
export default {
   computed: {
    emailRules() {
      return this.contactForm.submittedPhone.length ? '' : 'required|email';
   },
   phoneRules() {
     return this.contactForm.submittedEmail.length ? '' : 'required|numeric';
   }
},
   data() {
      return {
         contactForm: {
            submittedName: '',   // Muutuja Ees -ja perenime hoidmiseks
            submittedPhone: '',  // Muutuja telefoninumbri hoidmiseks
            submittedEmail: '',  // Muutuja E-maili hoidmiseks
            submittedAccept: '', // Muutuja tingimustega nõustumise kohta
            submittedArea: '',   // Muutuja küla/aleviku salvestamiseks
            submittedCounty: '', // Muutuja maakonna salvestamiseks
            submittedAddress: '',   // Muutuja aadressi salvetamiseks
            submittedExtraArea: '', // Muutuja lisa-aadressi küla/aleviku salvestamiseks
            submittedExtraCounty: '',  // Muutuja lisa-aadressi maakonna salvetamiseks
            submittedExtraAddress: '', // Muutuja lisa-aadressi salvestamiseks
            newAddress: false, // Muutuja mille abil kontrollida lisa-aadressiväljade kuvamist. True korral on kuvatud.
         },
         submitted: false, // Muutuja, mis kontrollib vaadet. True korral kuvatakse readOnly vaade. False korral kontaktvorm.
      }
   },
   methods: {
      submitForm: function(){ // See funktsioon kutsutakse "Salvesta" nuppu vajutades.
        this.$validator.validateAll().then((result) => { //vee-validate funktsioon, mis valideerib kõik required väljad.
        if (result) {   // kui on valideeritud
          alert('Vorm salvestatud');
          this.submitted = true; // submitted on true. st et kuvatakse readOnly vaade
          return;
        }
        alert('Palun korrasta väljad!');
      });
         //this.submitted = true; // Kuvatakse readOnly vaade ja peidetakse kontaktvorm
         console.log(this.contactForm.newAddress);
      },
      editFrom: function(){   //See funktsioon kutsutakse "Muuda" nuppu vajutades
         this.submitted = false; // Kuvatakse kontaktvorm ja peidetakse readOnly vaade
      },
}
}
</script>


<style scoped>

</style>
