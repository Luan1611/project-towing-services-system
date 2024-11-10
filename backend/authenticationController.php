<?php

// Arquivos com funções úteis que vão ser usadas nesta rota.
require_once(__DIR__ . "/configs/utils.php");
// Arquivos com as entidades (models) que vão ser usadas nesta rota.
require_once(__DIR__ . "/model/Authentication.php");

// Bloco de código configurando o servidor. Remover os métodos que não forem suportados.
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



// Usado para receber os dados brutos do corpo da requisição.
// Caso não tenha sido enviado nada no formato JSON, retorna FALSE.
$data = handleJSONInput();

function validateEmail($email) {
    $conta = "/^[a-zA-Z0-9\._-]+@";
    $domino = "[a-zA-Z0-9\._-]+.";
    $extensao = "([a-zA-Z]{2,4})$/";
    $pattern = $conta.$domino.$extensao;
    if (!preg_match($pattern, $email, $check)) {
        throw new Exception("E-mail inválido", 400);
    }
}

function validatePassword($password) {
    if (!preg_match('/^.{8,255}$/', $password)) {
        throw new Exception("Senha inválida", 400);
    }
}

if(method("GET")) {
    if (!$data) {
        // Não recebeu, então recebe os dados via corpo normal do GET.
        $data = $_GET;
    }

    try {
        //TODO
    } catch (Exception $e) {
        throw new Exception("Não foi possível recuperar os dados dos agendamentos", 500);
    }
}

if(method("POST")) {
    if (!$data) {
        // Não recebeu, então recebe os dados via corpo normal do GET.
        $data = $_POST;
    }

    try {
        validateParameters($data, ["email", "senha"], 2)
        validateEmail($data["email"])
        validatePassword($data["senha"])

        $result = Authentication.

    } catch (Exception $e) {
        throw new Exception("Não foi possível recuperar os dados dos agendamentos", 500);
    }
}


if(method("DELETE")) {
    // Checa se o servidor receber algum dado JSON de entrada.
    if (!$data) {
        //TODO
    }

    try {
        //TODO
        //TODO: retornar objeto JSON?
    } catch (Exception $e) {
        output($e->getCode(), ["msg" => $e->getMessage()]);
    }
}

// É comum colocar uma resposta de erro caso o método ou operação solicitada não for encontrada.
output(404, ["msg" => "Método não suportado no momento"]);