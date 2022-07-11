<style>
.header-container {
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
</style>
<template>
    <div>
        <div class="header-container">
            <h1 class="header-title">Notre Github</h1>
        </div>
        <div class="second-container">
            <div>
               Projet-elective : <a href="https://github.com/Projet-elective">Exeat </a>
            </div>   
        </div>
    </div>
</template>
<script>
    export default {
        name: 'DevComp'
    }
</script>