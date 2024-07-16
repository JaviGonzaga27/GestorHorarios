<?php
// Process delete operation after confirmation
if (isset($_POST["id_periodo"]) && !empty($_POST["id_periodo"])) {
    // Include config file
    require_once "config.php";
    require_once "helpers.php";

    // Prepare a delete statement
    $id_periodo = $_POST["id_periodo"];

    $sql1 = "DELETE FROM horarios_aulas WHERE id_periodo = $id_periodo";
    $sql2 = "DELETE FROM periodos_horarios WHERE id_periodo = $id_periodo";
    $sql3 = "DELETE FROM periodos_docentes WHERE id_periodo = $id_periodo";
    if (mysqli_query($link, $sql1)) {
        echo "Records horarios_aulas deleted successfully";
    } else {
        echo "Error deleting record: " . mysqli_error($link);
    }

    if (mysqli_query($link, $sql2)) {
        echo "Records periodos_horarios deleted successfully";
    } else {
        echo "Error deleting record: " . mysqli_error($link);
    }

    if (mysqli_query($link, $sql3)) {
        echo "Records horarios_docentes deleted successfully";
    } else {
        echo "Error deleting record: " . mysqli_error($link);
    }

    $sql = "DELETE FROM periodos WHERE id_periodo = ?";

    if ($stmt = mysqli_prepare($link, $sql)) {

        // Set parameters
        $param_id = trim($_POST["id_periodo"]);

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
            // Records deleted successfully. Redirect to landing page
            header("location: periodos-index.php");
            exit();
        } else {
            echo "Oops! Something went wrong. Please try again later.<br>" . $stmt->error;
        }
    }

    // Close statement
    mysqli_stmt_close($stmt);

    // Close connection
    mysqli_close($link);
} else {
    // Check existence of id parameter
    $_GET["id_periodo"] = trim($_GET["id_periodo"]);
    if (empty($_GET["id_periodo"])) {
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
    <title>Eliminar Registro</title>
</head>

<?php include('header.php'); ?>
<section class="pt-5">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="page-header">
                    <h1>Eliminar Registro</h1>
                </div>
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
                    <div class="alert alert-danger fade-in">
                        <input type="hidden" name="id_periodo" value="<?php echo trim($_GET["id_periodo"]); ?>" />
                        <p>¿Está Seguro que quiere eliminar el registro?</p><br>
                        <p>
                            <input type="submit" value="Eliminar" class="btn btn-danger">
                            <a href="periodos-index.php" class="btn btn-secondary">Cancelar</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<?php include('footer.php'); ?>