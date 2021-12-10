<?php
$pdo=null;
$host="localhost";
$user="root";
$password="";
$bd="crud-reactjs-php";


function conectar(){
    try{
        $GLOBALS['pdo']=new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."", $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        print "Error!: No se pudo conectar a la bd ".$bd."<br/>";
        print "\nError!: ".$e."<br/>";
        die();
    }
}

function desconectar() {
    $GLOBALS['pdo']=null;
}

function metodoGet($query){
    try{
        conectar();
        $PDOStatement=$GLOBALS['pdo']->prepare($query);
        $PDOStatement->setFetchMode(PDO::FETCH_ASSOC);
        $PDOStatement->execute();
        desconectar();
        return $PDOStatement;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function metodoPost($query, $queryAutoIncrement){
    try{
        conectar();
        $PDOStatement=$GLOBALS['pdo']->prepare($query);
        $PDOStatement->execute();
        $PDOStatement=metodoGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);
        $resultado=array_merge($idAutoIncrement, $_POST);
        $PDOStatement->closeCursor();
        desconectar();
        return $resultado;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}


function metodoPut($query){
    try{
        conectar();
        $PDOStatement=$GLOBALS['pdo']->prepare($query);
        $PDOStatement->execute();
        $resultado=array_merge($_GET, $_POST);
        $PDOStatement->closeCursor();
        desconectar();
        return $resultado;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function metodoDelete($query){
    try{
        conectar();
        $PDOStatement=$GLOBALS['pdo']->prepare($query);
        $PDOStatement->execute();
        $PDOStatement->closeCursor();
        desconectar();
        return $_GET['id'];
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

?>