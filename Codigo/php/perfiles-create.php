<?php
// Include config file
require_once "config.php";
require_once "helpers.php";

// Define variables and initialize with empty values
$tipo_perfil = "";
$privilegios = "";


// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tipo_perfil = trim($_POST["tipo_perfil"]);
    $privilegios = trim($_POST["privilegios"]);

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
        exit('Something weird happened'); //something a user can understand
    }

    $vars = parse_columns('perfiles', $_POST);
    $stmt = $pdo->prepare("INSERT INTO perfiles (tipo_perfil,privilegios) VALUES (?,?)");

    if ($stmt->execute([$tipo_perfil, $privilegios])) {
        $stmt = null;
        header("location: perfiles-index.php");
    } else {
        echo "Something went wrong. Please try again later.";
    }

}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Crear registro</title>
</head>

<?php include('header.php'); ?>
<section class="pt-5">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="page-header">
                    <h2>Crear Registro</h2>
                </div>
                <p>Porfavor completa este formulario para ingresarlo a la base de datos.</p>
                <form id="agregar_perfiles" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

                    <div class="form-group">
                        <label for="tipo_perfil">Tipo de perfil</label>
                        <input type="text" class="form-control" id="tipo_perfil" name="tipo_perfil" 
                            value="<?php echo $tipo_perfil; ?>" required pattern="[A-Za-z\s]+">
                        <div class="invalid-feedback">Ingresa un perfil válido.</div>
                        <div class="valid-feedback"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="privilegios">Privilegios</label>
                        <input type="text" class="form-control" id="privilegios" name="privilegios" 
                            value="<?php echo $privilegios; ?>" required pattern="[A-Za-z\s]+">
                            <div class="invalid-feedback">Ingresa un privilegio válido.</div>
                            <div class="valid-feedback"></div>
                    </div>

                    <input type="submit" class="btn btn-primary" value="Enviar">
                    <a href="perfiles-index.php" class="btn btn-secondary">Cancelar</a>
                </form>
            </div>
        </div>
    </div>
</section>

<script src="../js/formulario_perfiles.js"></script>

<?php include('footer.php'); ?>