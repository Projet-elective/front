<style>
.container-contact {
    height: 100%;
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 50px;
    background-color: rgb(240, 240, 240);
}

.container-contact h1 {
    text-align: center;
    font-size: 3em;
}

.container-contact p {
    text-align: center;
}

.box-container-contact {
    display: flex;
    justify-content: space-evenly;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-right: 10%;
    margin-left: 10%;
}

.box-contact {
    width: 300px;
    height: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 1s;
    box-shadow: 0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%);
    padding: 1em;
}
.box-contact h2 {
    margin-bottom: 0.5em;
}

.box-contact div {
    text-align: center;
}

.box-contact:hover {
    transform: scale(1.1);
    box-shadow: 0px 20px 20px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%);
   
}

.icon-contact {
    margin-bottom: 10px
}
</style>
<template>
    <div class="container-contact">
        <h1>Contactez-nous</h1>
        <p>Une question ? N'hésitez pas à nous contacter grâce à nos cordonnées ci-dessous.</p>
        <div class="box-container-contact">
            <div class="box-contact">
                <v-icon class="icon-contact" color="primary" x-large>mdi-map-marker-radius</v-icon>
                <h2>Adresse</h2>
                <div>Bd de l'Université, 44600 Saint-Nazaire</div>
            </div>
            <div class="box-contact">
                <v-icon class="icon-contact" color="primary" x-large>mdi-phone</v-icon>
                <h2>Téléphone</h2>
                <div>02 40 15 20 17</div>
            </div>
        </div>
        <div class="box-container-contact">
            <div class="box-contact">
                <v-icon class="icon-contact" color="primary" x-large>mdi-email</v-icon>
                <h2>E-mail</h2>
                <div>cesi.saintnazaire@cesi.fr</div>
            </div>
        </div>
    </div> 
</template>
<script>
    export default {
        name: 'ContactComp'
    }
</script>