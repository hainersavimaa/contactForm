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
            <input type="text" name="Lisa-aadress" v-model="contactForm.submittedExtraAddress" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('Lisa-aadress') }"/>
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
         <p v-if="contactForm.submittedPhone">Telefoni number: +372 {{contactForm.submittedPhone}}</p>
         <p v-if="contactForm.submittedEmail">E-posti aadress: {{contactForm.submittedEmail}}</p>
         <p>Aadress: {{contactForm.submittedAddress}}, {{contactForm.submittedArea}}, {{contactForm.submittedCounty}}</p>
         <p v-if="contactForm.newAddress">Lisa-aadress: {{contactForm.submittedAddress}}, {{contactForm.submittedArea}}, {{contactForm.submittedCounty}}</p>
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
/* Muutujad */
$main: #8470E5;
$secondary: #13B2BB;
$input-bg: #ccc;
$borders: #ddd;

$font: 'Lato', sans-serif;





/* CLEARFIX */
.cf:before,
.cf:after {
    content: " "; /* 1 */
    display: table; /* 2 */
}

.cf:after {
    clear: both;
}
/**
 * For IE 6/7 only
 * Include this rule to trigger hasLayout and contain floats.
 */
.cf {
    *zoom: 1;
}

/* Vormi stiilid */

.contact-form{
   max-width: 450px;
   margin: 20px auto;
   padding: 20px 10px;
   box-sizing: border-box;
   font-size: 14px;
   font-family: $font;
}
.read-only{
   max-width: 345px;
   margin: 20px auto;
   padding: 20px;
   font-size: 14px;
   font-family: $font;
}
.contact-form h1, .read-only h1{
   color: $secondary;
   margin-bottom: 32px;
   font-size: 26px;
}
.contact-form h1{
   text-align: center;
}
.read-only h1{
   text-align: left;
}
.contact-form input[type="text"],.contact-form input[type="tel"],.contact-form input[type="email"], .contact-form select{
   box-sizing: border-box;
   display: block;
   width: 260px;
   margin: 5px auto;
   padding: 7px 15px;
   border-radius: 15px;
   border: 1px solid #ddd;
   outline: none;
}
.contact-form input:focus{
   outline: none;
}
.contact-form label, .contact-form span{
   box-sizing: border-box;
   display: block;
   text-align: center;
}
.contact-form .radio-button-wrap, .contact-form .accept-box-wrap{
   width: 281px;
   margin: 0 auto;
}
.contact-form .radio-button-wrap{
   margin: 15px auto;
}
.contact-form .check-label{
   display: inline-block;
}
.contact-form .additional-form{
   margin-bottom: 15px;
}
.contact-form .submit-button-wrap{
   max-width: 260px;
   margin: 20px auto;
}
.submit-button{
   display: inline-block;
   float: right;
   padding: 10px 20px;
   border-radius: 25px;
   border: 0;
   font-size: 15px;
   cursor: pointer;
   background: $main;
   color: #fff;
}
.submit-button:focus{
   outline: none;
}
.submit-button:disabled{
   background: $borders;
   color: #999;
}
.help.is-danger{
   color: red;
}
.help{
   padding-left: 20px;
}
/* RADIO NUPP */
input[type=radio] {
   position: absolute; opacity: 0;
}
input[type=radio] + label {
   position: relative;
   cursor: pointer;
   padding: 0;
}
input[type=radio] + label:before {
  border: 1px solid $borders;
  content: '';
  margin-right: 10px;
  margin-top: -3px;
  display: inline-block;
  vertical-align: text-top;
  width: 24px;
  height: 24px;
  background: $input-bg;
  border-radius: 50%;
}
input[type=radio]:hover + label:before { background: $input-bg; }
input[type=radio]:checked + label:before { background: #fff; }
input[type=radio]:disabled + label { color: #b8b8b8; cursor: auto; }
input[type=radio]:disabled + label:before { box-shadow: none; background: #ddd; }
input[type=radio]:checked + label:after {
   content: '●';
   color: $secondary;
   font-size: 42px;
   left: 0.5px;
   top: -19.75px;
   position: absolute;
}
input[type=checkbox] {
   position: absolute; opacity: 0;
}
input[type=checkbox] + label {
   position: relative; cursor: pointer; padding: 0;
}
input[type=checkbox] + label:before {
   border: 1px solid $borders;
   content: '';
   margin-right: 10px;
   margin-top: -2px;
   display: inline-block;
   vertical-align: text-top;
   width: 22px;
   height: 22px;
   background: $input-bg;
   border-radius: 3px;
   }
input[type=checkbox]:hover + label:before { background: $input-bg; }
input[type=checkbox]:checked + label:before { background: #fff; }
input[type=checkbox]:disabled + label { color: #b8b8b8; cursor: auto; }
input[type=checkbox]:disabled + label:before { box-shadow: none; background: #ddd; }
input[type=checkbox]:checked + label:after {
   content: '✓';
   color: $secondary;
   font-size: 20px;
   font-weight: bold;
   left: 4px;
   top: -4px;
   position: absolute;
}
@media (min-width: 640px){
   .contact-form{
      max-width: 640px;
      padding: 20px 0px;
   }
   .contact-form input[type="text"],.contact-form input[type="tel"],.contact-form input[type="email"], .contact-form select{
      display: inline-block;
      width: 280px;
      margin: 8px auto;
   }
   .contact-form label, .contact-form span{
      display: inline-block;
      text-align: left;
   }
   .contact-form span{
      width: 160px;
   }
   .contact-form .field-label{
      width: 180px;
      text-align: right;
      padding-right: 20px;
   }
   .contact-form .radio-button-wrap, .contact-form .accept-box-wrap{
      width: 290px;
   }
}
@media (min-width: 720px){
   .contact-form{
      max-width: 700px;
   }
   .contact-form .field-label{
      width: 205px;
   }
   .contact-form span{
      width: 180px;
   }
}
</style>
