<style>
.header-container {
    background-image: url('../assets/header-about.jpg');
    width: 100%;
    height: 400px;
    display: flex;
    align-items: end;
    padding-left: 20%;
    padding-bottom: 50px;
}

.header-title {
    color: white;
    font-size: 3em;
    font-weight: 300;
}

.second-container {
    margin-left: 20%;
    margin-right: 25%;
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    align-items: center;
}

.second-container h2 {
    margin-bottom: 25px;
}

.image-second-container {
    width: 600px;
    height: 375px;
    padding-right: 50px;
}

.third-container {
    background-image: url('../assets/nature-image.jpg');
    width: 100%;
    height: 400px;
    background-size: cover;
    padding-left: 20%;
    padding-right: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.third-container h2 {
    color: white;
    text-shadow: 1px 1px gray;
    margin-bottom: 10px;
    font-size: 2em;
}
.third-container p {
    color: white;
    text-shadow: 1px 1px gray;
}

.fourth-container {
    display: flex;
    align-content: space-between;
    align-items: center;
    margin-left: 20%;
    margin-right: 25%;
    padding-bottom: 50px;
    padding-top: 50px;
}

.fourth-container h2 {
    margin-bottom: 20px;
}

.image-fourth-container {
    padding-right: 50px;
}
</style>
<template>
    <div>
        <div class="header-container">
            <h1 class="header-title">À propos de nous</h1>
        </div>
        <div class="second-container">
            <img src="../assets/work-image.jpg" class="image-second-container" alt="Travail">
            <div>
                <h2>Nous réimaginons la façon dont le monde bouge pour le mieux</h2>
                <p>Le mouvement est ce que nous propulsons. C'est notre force vitale. Il coule dans nos veines. C'est ce qui nous fait sortir du lit chaque matin. Cela nous pousse à constamment réimaginer comment nous pouvons mieux bouger. Pour vous. Pour tous les endroits où vous voulez aller. Pour toutes les choses que vous voulez obtenir. Pour toutes les façons dont vous voulez gagner. A travers le monde entier. En temps réel. À la vitesse incroyable de maintenant.</p>
            </div>   
        </div>
        <div class="third-container">
            <h2>Durabilité</h2>
            <p>Uber s'engage à devenir une plate-forme entièrement électrique et zéro émission d'ici 2040, avec 100 % des trajets effectués dans des véhicules zéro émission, dans les transports en commun ou en micromobilité. Il est de notre responsabilité, en tant que plus grande plateforme de mobilité au monde, de relever plus agressivement le défi du changement climatique. Nous y parviendrons en offrant aux conducteurs davantage de moyens de rouler écologiquement, en aidant les conducteurs à passer à l'électrique, en faisant de la transparence une priorité et en nous associant aux ONG et au secteur privé pour aider à accélérer une transition énergétique propre et juste.</p>
        </div>
        <div class="fourth-container">
            <img src="../assets/traffic-image.jpg" alt="Trafic" class="image-fourth-container">
            <div>
                <h2>Balades et au-delà</h2>
                <p>Nous aidons les gens à commander de la nourriture rapidement et à moindre coût, en supprimant les obstacles aux soins de santé, en créant de nouvelles solutions de réservation de fret et en aidant les entreprises à offrir une expérience de voyage fluide aux employés. Et toujours aider les chauffeurs et les coursiers à gagner.</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'AboutComp'
    }
</script>