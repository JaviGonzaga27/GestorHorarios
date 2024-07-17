<?php
// Include config file
require_once "config.php";
require_once "helpers.php";

// Define variables and initialize with empty values
$cod_materia = "";
$nombre_materia = "";
$departamento = "";
$horas_semana = "";

// Processing form data when form is submitted
if (isset($_POST["cod_materia"]) && !empty($_POST["cod_materia"])) {
    // Get hidden input value
    $cod_materia = $_POST["cod_materia"];

    $cod_materia = trim($_POST["cod_materia"]);
    $nombre_materia = trim($_POST["nombre_materia"]);
    $departamento = trim($_POST["departamento"]);
    $horas_semana = trim($_POST["horas_semana"]);


    // Prepare an update statement
    $dsn = "mysql:host=$db_server;dbname=$db_name;charset=utf8mb4";
    $options = [
        PDO::ATTR_EMULATE_PREPARES => false, // turn off emulation mode for "real" prepared statements
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
    ];
    try {
        $pdo = new PDO($dsn, $db_user, $db_password, $options);
    } catch (Exception $e) {
        error_log($e->getMessage());
        exit('Something weird happened');
    }

    $vars = parse_columns('materias', $_POST);
    $stmt = $pdo->prepare("UPDATE materias SET cod_materia=?,nombre_materia=?,departamento=?,horas_semana=? WHERE cod_materia=?");

    if (!$stmt->execute([$cod_materia, $nombre_materia, $departamento, $horas_semana, $cod_materia])) {
        echo "Something went wrong. Please try again later.";
        header("location: error.php");
    } else {
        $stmt = null;
        header("location: materias-read.php?cod_materia=$cod_materia");
    }
} else {
    // Check existence of id parameter before processing further
    $_GET["cod_materia"] = trim($_GET["cod_materia"]);
    if (isset($_GET["cod_materia"]) && !empty($_GET["cod_materia"])) {
        // Get URL parameter
        $cod_materia = trim($_GET["cod_materia"]);

        // Prepare a select statement
        $sql = "SELECT * FROM materias WHERE cod_materia = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            // Set parameters
            $param_id = $cod_materia;

            // Bind variables to the prepared statement as parameters
            if (is_int($param_id))
                $__vartype = "i";
            elseif (is_string($param_id))
                $__vartype = "s";
            elseif (is_numeric($param_id))
                $__vartype = "d";
            else
                $__vartype = "b"; // blob
            mysqli_stmt_bind_param($stmt, $__vartype, $param_id);

            // Attempt to execute the prepared statement
            if (mysqli_stmt_execute($stmt)) {
                $result = mysqli_stmt_get_result($stmt);

                if (mysqli_num_rows($result) == 1) {
                    /* Fetch result row as an associative array. Since the result set
                    contains only one row, we don't need to use while loop */
                    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

                    // Retrieve individual field value

                    $cod_materia = htmlspecialchars($row["cod_materia"]);
                    $nombre_materia = htmlspecialchars($row["nombre_materia"]);
                    $departamento = htmlspecialchars($row["departamento"]);
                    $horas_semana = htmlspecialchars($row["horas_semana"]);


                } else {
                    // URL doesn't contain valid id. Redirect to error page
                    header("location: error.php");
                    exit();
                }

            } else {
                echo "Oops! Something went wrong. Please try again later.<br>" . $stmt->error;
            }
        }

        // Close statement
        mysqli_stmt_close($stmt);

    } else {
        // URL doesn't contain id parameter. Redirect to error page
        header("location: error.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Actualizar Registro</title>
</head>

<?php include('header.php'); ?>
<section class="pt-5">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="page-header">
                    <h2>Actualizar Registro</h2>
                </div>
                <p>Porfavor actualiza los campos y envia el formulario para actualizar los cambios.</p>
                <form id="agregar_materias" action="<?php echo htmlspecialchars(basename($_SERVER['REQUEST_URI'])); ?>" method="post">

                    <div class="form-group">
                        <label>Código de Materia</label>
                        <input readonly type="text" id="cod_materia" name="cod_materia" maxlength="20" class="form-control"
                            value="<?php echo $cod_materia; ?>">
                    </div>

                    <div class="form-group">
                        <label>Departamento</label>
                        <input type="text" id="departamento" name="departamento" maxlength="45" class="form-control"
                            value="<?php echo $departamento; ?>" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="nombre_materia">Nombre de la Materia</label>
                        <input type="text" id="nombre_materia" name="nombre_materia" maxlength="100" class="form-control"
                            value="<?php echo $nombre_materia; ?>" required required pattern="[A-Za-z\s]+">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback"></div>  
                    </div>
                    
                    <div class="form-group">
                        <label for="horas_semana">Horas semanales</label>
                        <input type="number" id="horas_semana" name="horas_semana" class="form-control"
                            value="<?php echo $horas_semana; ?>" required maxlength="2" pattern="[0-9]{1,2}" min = "2" max = "10">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback"></div>  
                    </div>

                    <input type="hidden" name="cod_materia" value="<?php echo $cod_materia; ?>" />
                    <input type="submit" class="btn btn-primary" value="Enviar">
                    <a href="materias-index.php" class="btn btn-secondary">Cancelar</a>
                </form>
            </div>
        </div>
    </div>
</section>

<script src="../js/formulario_materias.js"></script>

<?php include('footer.php'); ?>