<template lang="html">
   <div id="formView">
      <form id="contactForm" class="contact-form" v-if="!submitted">
         <h1>Kontaktandmed</h1>
         <label class="field-label" for="">Ees -ja perenimi</label>
         <input type="text" name="Nimi" v-model="contactForm.submittedName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('Nimi') }"/>
         <span v-show="errors.has('Nimi')" class="help is-danger">{{ errors.first('Nimi') }}</span>
         <br>
         <label class="field-label" for="">Telefon</label>
         <input type="tel" id="phone-input" name="Telefon" v-model="contactForm.submittedPhone" v-validate="phoneRules" :class="{'input': true, 'is-danger': errors.has('Telefon') }" placeholder="+372 "/>
         <span v-show="errors.has('Telefon')" class="help is-danger">{{ errors.first('Telefon') }}</span>
         <br>
         <label class="field-label" for="">E-post</label>
         <input type="email" name="Email" v-model="contactForm.submittedEmail" v-validate="emailRules" :class="{'input': true, 'is-danger': errors.has('Email') }"/>
         <span v-show="errors.has('Email')" class="help is-danger">{{ errors.first('Email') }}</span>
         <br>
         <label class="field-label" for="">Tänav, maja, korter</label>
         <input type="text" name="Aadress" v-model="contactForm.submittedAddress" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('Aadress') }"/>
         <span v-show="errors.has('Aadress')" class="help is-danger">{{ errors.first('Aadress') }}</span>
         <br>
         <label class="field-label" for="">Küla/alevik</label>
         <input type="text" name="Alevik" v-model="contactForm.submittedArea"/>
         <br>
         <label class="field-label" for="">Linn/maakond</label>
         <select name="Maakond" v-validate="'required'" v-model="contactForm.submittedCounty":class="{'input': true, 'is-danger': errors.has('Maakond') }">
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
         <span v-show="errors.has('Maakond')" class="help is-danger">{{ errors.first('Maakond') }}</span>
         <br>
         <div class="radio-button-wrap">
            <input type="radio" name="deliveryAddress" id="delivery1" value="false" checked v-model="contactForm.newAddress"/> <label for="delivery1" class="check-label">Kohaletoimetamine sama aadressile</label>
            <br>
            <br>
            <input type="radio" name="deliveryAddress" id="delivery2" value="true" v-model="contactForm.newAddress"/> <label for="delivery2" class="check-label">Kohaletoimetamine erinevale aadressile</label>
         </div>
         <!-- Lisa-aadressi algus -->
         <div class="additional-form" v-if="contactForm.newAddress==='true'">
            <label class="field-label" for="">Tänav, maja, korter</label>
            <input type="text" name="Lisa-aadress" v-model="contactForm.submittedExtraAddress" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('Lisa-aadress') }"/>
            <span v-show="errors.has('Lisa-aadress')" class="help is-danger">{{ errors.first('Lisa-aadress') }}</span>
            <br>
            <label class="field-label" for="">Küla/alevik</label>
            <input type="text" name="Lisa-Alevik" v-model="contactForm.submittedExtraArea"/>
            <br>
            <label class="field-label" for="">Linn/maakond</label>
            <select name="Linn" v-validate="'required'" v-model="contactForm.submittedExtraCounty" :class="{'input': true, 'is-danger': errors.has('Linn') }">
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
            <span v-show="errors.has('Linn')" class="help is-danger">{{ errors.first('Linn') }}</span>
         </div> <!-- Lisa-aadressi lõpp -->
         <div class="accept-box-wrap">
            <input type="checkbox" value="true" name="acceptCond" id="acceptCond" v-model="contactForm.submittedAccept"/> <!-- v-model lisab true väärtuse submittedAccept muutujale -->
            <label for="acceptCond" class="check-label">Olen tingimustega tutvunud</label>
         </div>
         <!-- Salvesta nupp-->
         <div class="submit-button-wrap">
            <button :disabled="!contactForm.submittedAccept" v-on:click.prevent="submitForm" class="submit-button">Salvesta</button> <!-- Nupp on disabled kuni submittedAccept on true. Vajutades kutsutakse submitForm meetod, mis määrab muutuja "submitted" true-ks. -->
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
<style lang="scss" scoped>

</style>
