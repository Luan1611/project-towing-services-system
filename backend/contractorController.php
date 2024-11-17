<?php

require_once(__DIR__ . "/configs/utils.php");
require_once(__DIR__ . "/model/Contractor.php");

header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = handleJSONInput();

// Verifica se os CPFs dos clientes são válidos, isto é,
// se contêm 11 caracteres, sem letras
function validateCPFs($cpfsArray) {
    foreach ($cpfsArray as $cpf) {
        if (!preg_match('/^[0-9]{11}$/', $cpf)) {
            throw new Exception("A lista de CPFs contém um ou mais CPFs inválidos", 422);
        }
    }
}

function validateCode($code) {
    if (!preg_match("/^[a-zA-Z0-9]{2}$/", $code)) {
        throw new Exception("Código de serviço inválido", 406);
    }
}

// Lista todos os agendamentos de serviços solicitados pelos clientes, por data
if(method(" ")) {
    if (!$data) {
        $data = $_GET;
    }

    try {
        $list = Contractor::getClientServicesSchedulings();

        if (empty($list)) {
            output(200, ["msg" => "Não há agendamentos de clientes para serem exibidos."]);
        }

        output(200, $list);
    } catch (Exception $e) {
        throw new Exception("Não foi possível recuperar os dados dos agendamentos", 500);
    }
}

if (method("POST")) {
    if (!$data) {
        $data = $_POST;
    }

    try {
        validateParameters($data, ["cnpj","codigo", "data", "quantidade"], 4);
        validateCode($data["codigo"]);
        validateDate($data["data"]);

        Contractor::createServiceDay($data["cnpj"], $data["codigo"], $data["data"], $data["quantidade"]);
        

        output(200, ["msg" => "dia de serviço cadastrado com sucesso"]);
    } catch (Exception $e) {
        output($e->getCode(), ["msg" => $e->getMessage()]);
    }
}

if(method("DELETE")) {
    if ($data) {
        output(500, ["msg" => "Metodo DELETE não aceita dados contidos no corpo da requisição (body)"]);
    }
    $data = $_GET;
    
    try {
        validateParameters($data, ["date"], 1);
        validateDate($data["date"]);

        $result = Contractor::deleteClientsServicesSchedulingsByDate($data["date"]);

        if (!$result) {
            throw new Exception("Não foi possível deletar os agendamentos dos clientes", 500);
        }

        output(200, ["msg" => "Agendamentos de clientes deletados com sucesso!"]);
    } catch (Exception $e) {
        output($e->getCode(), ["msg" => $e->getMessage()]);
    }
}

output(404, ["msg" => "Método não suportado no momento"]);