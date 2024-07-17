<?php
// Include config file
require_once "config.php";
require_once "helpers.php";

// Define variables and initialize with empty values
$id_usuario = "";
$nombre = "";
$apellido = "";
$usuario = "";
$clave = "";
$id_perfil = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica si la contraseña se ha cambiado antes de realizar la encriptación
    $clave = $_POST["clave"];
    // Resto de los campos
    $id_usuario = trim($_POST["id_usuario"]);
    $nombre = trim($_POST["nombre"]);
    $apellido = trim($_POST["apellido"]);
    $usuario = trim($_POST["usuario"]);
    $id_perfil = trim($_POST["id_perfil"]);

    // Prepare an update statement
    $dsn = "mysql:host=$db_server;dbname=$db_name;charset=utf8mb4";
    $options = [
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    try {
        $pdo = new PDO($dsn, $db_user, $db_password, $options);
    } catch (Exception $e) {
        error_log($e->getMessage());
        exit('Something weird happened');
    }

    $stmt_verificar_usuario = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE usuario = ? AND id_usuario <> ?");
    $stmt_verificar_usuario->execute([$usuario, $id_usuario]);
    $existe_usuario = $stmt_verificar_usuario->fetchColumn();

    if ($existe_usuario) {
        echo "<script>alert('El nombre de usuario ya está en uso.');</script>";
    } else {
        // Verificar si el nuevo nombre de usuario ya existe
        if (!empty($clave)) {
            $clave = password_hash($_POST["clave"], PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("UPDATE usuarios SET id_usuario=?, nombre=?, apellido=?, usuario=?, clave=?, id_perfil=? WHERE id_usuario=?");

            if (!$stmt->execute([$id_usuario, $nombre, $apellido, $usuario, $clave, $id_perfil, $id_usuario])) {
                echo "<script>alert('Something went wrong. Please try again later.');</script>";
                header("location: error.php");
            } else {
                $stmt = null;
                header("location: usuarios-read.php?id_usuario=$id_usuario");
            }
        } else {
            $stmt = $pdo->prepare("UPDATE usuarios SET id_usuario=?, nombre=?, apellido=?, usuario=?, id_perfil=? WHERE id_usuario=?");

            if (!$stmt->execute([$id_usuario, $nombre, $apellido, $usuario, $id_perfil, $id_usuario])) {
                echo "<script>alert('Something went wrong. Please try again later.');</script>";
                header("location: error.php");
            } else {
                $stmt = null;
                header("location: usuarios-read.php?id_usuario=$id_usuario");
            }
        }

    }
} else {
    // Check existence of id parameter before processing further
    $_GET["id_usuario"] = trim($_GET["id_usuario"]);
    if (isset($_GET["id_usuario"]) && !empty($_GET["id_usuario"])) {
        // Get URL parameter
        $id_usuario = trim($_GET["id_usuario"]);

        // Prepare a select statement
        $sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
        if ($stmt = mysqli_prepare($link, $sql)) {
            // Set parameters
            $param_id = $id_usuario;

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

                    $id_usuario = htmlspecialchars($row["id_usuario"]);
                    $cod_usuario = htmlspecialchars($row["cod_usuario"]);
                    $nombre = htmlspecialchars($row["nombre"]);
                    $apellido = htmlspecialchars($row["apellido"]);
                    $usuario = htmlspecialchars($row["usuario"]);
                    $clave = htmlspecialchars($row["clave"]);
                    $id_perfil = htmlspecialchars($row["id_perfil"]);

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
                <form id="agregar_usuario" action="<?php echo htmlspecialchars(basename($_SERVER['REQUEST_URI'])); ?>" method="post">

                        <input hidden type="text" class="form-control" id="id_usuario" name="id_usuario"
                            value="<?php echo $id_usuario; ?>">

                    <div class="form-group">
                        <label for="cod_usuario">ID Usuario:</label>
                        <input readonly type="text" class="form-control" id="cod_usuario" name="cod_usuario"
                            value="<?php echo $cod_usuario; ?>" required maxlength="9" required pattern="^[L]{1}[0-9]{8}$">
                        <small class="form-text text-muted">Ejemplo: L12345678</small>
                        <div class="invalid-feedback">Ingrese un ID válido de acuerdo con el ejemplo.</div>
                        <div class="valid-feedback"></div>
                    </div>

                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" value="<?php echo $nombre; ?>"
                            required pattern="[\p{L}ñÑ\s]+">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback"></div>
                    </div>

                    <div class="form-group">
                        <label for="apellido">Apellido:</label>
                        <input type="text" class="form-control" id="apellido" name="apellido"
                            value="<?php echo $apellido; ?>" required pattern="[\p{L}ñÑ\s]+">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback"></div>
                    </div>

                    <div class="form-group">
                        <label for="usuario">Nombre de Usuario:</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" 
                            value="<?php echo $usuario; ?>" required pattern="[a-zA-Z0-9]+">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback"></div>
                    </div>

                    <div class="form-group">
                        
                        <div>
                            <span for="clave">Marque para actualizar contraseña:  </span>
                            <div><input  type="checkbox" id="actualizarClave" name="actualizarClave" onclick="togglePassword()"></div>
                        
                        </div>
                        <input disabled type="password" class="form-control" id="clave" name="clave"
                            value="" autocomplete="off" required pattern="^(?=.*[A-Z])(?=.*[a-z]).{8,}$">
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback"></div>
                    </div>

                    <div class="form-group">
                        <label>Perfil</label>
                        <select class="form-control" id="id_perfil" name="id_perfil">
                            <?php
                            $sql = "SELECT *,id_perfil FROM perfiles";
                            $result = mysqli_query($link, $sql);
                            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                                $duprow = $row;
                                unset($duprow["id_perfil"]);
                                $value = implode(" | ", $duprow);
                                if ($row["id_perfil"] == $id_perfil) {
                                    echo '<option value="' . "$row[id_perfil]" . '"selected="selected">' . "$value" . '</option>';
                                } else {
                                    echo '<option value="' . "$row[id_perfil]" . '">' . "$value" . '</option>';
                                }
                            }
                            ?>
                        </select>
                        <span class="form-text">
                            <?php echo $id_perfil_err; ?>
                        </span>
                    </div>

                    <input type="hidden" name="id_usuario" value="<?php echo $id_usuario; ?>" />
                    <input type="submit" class="btn btn-primary" value="Enviar">
                    <a href="usuarios-index.php" class="btn btn-secondary">Cancelar</a>
                </form>
            </div>
        </div>
    </div>
</section>

<script>
    function togglePassword() {
        var checkBox = document.getElementById("actualizarClave");
        var passwordField = document.getElementById("clave");
        passwordField.value = "";
        if (checkBox.checked) {
            passwordField.disabled = false;
        } else {
            passwordField.disabled = true;
        }
    }
</script>

<script src="../js/formulario_usuarios.js"></script>

<?php include('footer.php'); ?>