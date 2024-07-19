<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horarios UI</title>
    <link rel="stylesheet" href="../css/estiloHorarioSemanal.css">
</head>

<?php include('header.php'); ?>
<section class="pt-2">
<div class="container-fluid">
    <div class="position-absolute ocultar-en-pantalla" style="right: 3%;">
        <button id="GenerarMysql" onclick="generarPDF()" class="btn btn-secondary mr-3 ocultarPDF">Generar Reporte</button>
    </div>
    <div id="secPDF">
        <div style="text-align: center; display: none;" class="paraPDFMostrar">
            <h2>Universidad de las Fuerzas Armadas ESPE</h2>
            <h3>Reporte de horarios por Aula</h3>
        </div>
        <form class="formularios ocultar-en-pantalla" action="">
            <label class="frmlbl" for="periodo">Periodo</label>
            <label class="frmlbl" for="aula">Aula</label>
            <label class="frmlbl" for="cursos">Curso</label>
            <select class="selector" name="periodo" id="periodo">
            </select>

            <select class="selector" name="aula" id="aula">
            </select>

            <select class="selector ocultarPDF" name="cursos" id="cursos">

            </select>
        </form>

        <div class="container">
            <div class="cursosSection ocultarPDF">
                <div class="tituloDia">INFO CURSO</div>
                <div id="cursosContainer"></div>
                <div id="trash">ARRASTRA AQUÍ PARA ELIMINAR HORARIO</div>
            </div>
            <div class="horarioSection">
                <div class="tituloHora">HORAS</div>
                <div class="horasCont">
                    <div class="hora">7:00 - 9:00 h</div>
                    <div class="hora">9:00 - 11:00 h</div>
                    <div class="hora">11:00 - 13:00 h</div>
                    <div class="hora">13:30 - 15:30 h</div>
                    <div class="hora">15:30 - 17:30 h</div>
                    <div class="hora">17:30 - 19:30 h</div>
                    <div class="hora">19:30 - 21:30 h</div>
                </div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">LUNES</div>
                <div class="dia" id="LUNES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">MARTES</div>
                <div class="dia" id="MARTES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">MIERCOLES</div>
                <div class="dia" id="MIERCOLES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">JUEVES</div>
                <div class="dia" id="JUEVES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">VIERNES</div>
                <div class="dia" id="VIERNES"></div>
            </div>
        </div>
    </div>
</div>

    <script src="../js/crudsDragDrop.js"></script>
    <script src="../js/dragDrop.js"></script>
    <script src="../js/loadHorarios.js"></script>
    <script src="../js/jspdf.debug.js"></script>
</section>

<script>
    function generarPDF() {
        document.getElementById('accordionSidebar').classList.add("ocultarPDF")
        window.print();
    }
</script>

<?php include('footer.php'); ?>