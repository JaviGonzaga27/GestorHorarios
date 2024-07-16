<?php
// Include config file
require_once "config.php";
require_once "helpers.php";

// Define variables and initialize with empty values
$id_carrera = "";
$id_curso = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_carrera = trim($_POST["id_carrera"]);
    $id_curso = trim($_POST["id_curso"]);


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

    $vars = parse_columns('carreras_cursos', $_POST);
    $stmt = $pdo->prepare("INSERT INTO carreras_cursos (id_carrera,id_curso) VALUES (?,?)");

    if ($stmt->execute([$id_carrera, $id_curso])) {
        $stmt = null;
        header("location: carreras_cursos-index.php");
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
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

                    <div class="form-group">
                        <label>Carrera</label>
                        <select class="form-control" id="id_carrera" name="id_carrera">
                            <?php
                            $sql = "SELECT *,id_carrera FROM carreras";
                            $result = mysqli_query($link, $sql);
                            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                                $duprow = $row;
                                unset($duprow["id_carrera"]);
                                $value = implode(" | ", $duprow);
                                if ($row["id_carrera"] == $id_carrera) {
                                    echo '<option value="' . "$row[id_carrera]" . '"selected="selected">' . "$value" . '</option>';
                                } else {
                                    echo '<option value="' . "$row[id_carrera]" . '">' . "$value" . '</option>';
                                }
                            }
                            ?>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>NRC Curso</label>
                        <select class="form-control" id="id_curso" name="id_curso">
                            <?php
                            $sql = "SELECT id_curso,
                                    CONCAT(c.nrc,' | ',m.nombre_materia,' | ',m.cod_materia) AS curso_nombre
                                    FROM cursos c
                                    INNER JOIN materias m ON c.id_materia = m.id_materia";

                            $result = mysqli_query($link, $sql);
                            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                                $txt = $row["curso_nombre"];
                                $value = $row["id_curso"];
                                if ($row["id_curso"] == $id_curso) {
                                    echo '<option value="' . "$value" . '"selected="selected">' . "$txt" . '</option>';
                                } else {
                                    echo '<option value="' . "$value" . '">' . "$txt" . '</option>';
                                }
                            }
                            ?>
                        </select>
                    </div>

                    <input type="submit" class="btn btn-primary" value="Enviar">
                    <a href="carreras_cursos-index.php" class="btn btn-secondary">Cancelar</a>
                </form>
            </div>
        </div>
    </div>
</section>
<?php include('footer.php'); ?>