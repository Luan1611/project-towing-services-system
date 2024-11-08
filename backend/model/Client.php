<?php

require_once(__DIR__ . "/../configs/Database.php");
// Caso seja necessário acessar alguma função global auxiliar.
require_once(__DIR__ . "/../configs/utils.php");

class Client {

    public static function checkIfExists($cpfs) {
        try {
            $conexao = Conexao::getConexao();
            $sql = $conexao->prepare(
                "SELECT 
                    EXISTS (SELECT cpf FROM CLIENTES WHERE cpf IN(:cpf)) AS cpf_exists");

            $values["cpf"] = $cpfs;
            $sql->execute($values);

            return $sql->fetch();
        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    public static function getClientData($cpf) {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "SELECT 
                    c.cpf, 
                    c.nome, 
                    c.telefone,
                    ca.email
                FROM CLIENTES c
                INNER JOIN auth ca 
                    ON ca.user_id = c.cpf
                WHERE c.cpf = :cpf");

            $values['cpf'] = $cpf;
            
            $sql->execute($values);

            return $sql->fetchAll();
        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    /*
    Obtém os dados dos agendamentos de determinado cliente.
    Tais dados serão carregados na página "Meus Agendamentos" do cliente.
    */
    public static function getSchedulingsData($cpf) {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "SELECT 
                    css.data_realizacao_servico, 
                    s.id, 
                    s.name,
                    s.valor
                FROM cliente_solicita_servico css
                INNER JOIN servicos 
                    ON s.id = css.id_servicos
                WHERE css.cpf_cliente = :cpf");

            $values['cpf'] = $cpf;
            
            $sql->execute($values);

            return $sql->fetchAll();
        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    /*
    Obtém os dados cadastrais do cliente
    */
    public static function getRegistrationData($cpf) {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "SELECT 
                    cpf, 
                    nome, 
                    telefone
                FROM CLIENTES 
                    WHERE cpf = :cpf");

            $values['cpf'] = $cpf;
                    
            $sql->execute($values);

            return $sql->fetchAll();
        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    /*
    Atualiza os dados cadastrais do cliente
    */
    public static function updateRegistrationData($cpf, $name, $phone) {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "UPDATE CLIENTES SET
                    nome = :nome,
                    telefone = :telefone
                WHERE cpf = :cpf");

            $values['nome'] = $name;
            $values['telefone'] = $phone;
            $values['cpf'] = $cpf;

            $sql->execute($values);

            return $sql->rowCount();
        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    /* 
    Cria uma nova conta de cliente
    */
    public static function createAccount($email, $password, $cpf, $name, $phone) {
        try {
            $conexao = Conexao::getConexao();
            
            $conexao->beginTransaction();

            $sql = $conexao->prepare(
                "INSERT INTO AUTH (
                    email,
                    senha,
                    user_id,
                    classe_de_acesso
                ) VALUES (
                    :email,
                    :senha,
                    :userId,
                    1
                )"
            );
            
            $values['email'] = $email;  
            $values['senha'] = $password;  
            $values['userId'] = $cpf; 
                    
            $sql->execute($values);

            $sqlClient = $conexao->prepare(
                "INSERT INTO CLIENTES (
                    nome,
                    cpf,
                    telefone
                ) VALUES (
                    :nome,
                    :cpf,
                    :telefone
                )"
            );

            $valuesClient['nome'] = $name;  
            $valuesClient['telefone'] = $phone;  
            $valuesClient['cpf'] = $cpf;

            $sqlClient->execute($valuesClient);

            $conexao->commit();

            return TRUE;

        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    /* 
    Cria um novo agendamento para o cliente
    */
    public static function createScheduling($cpf, $services_id, $data_solicitacao_servico, $data_realizacao_servico) {
        try {
            $conexao = Conexao::getConexao();

            $servicesIdLength = count($services_id);
            $stringValues = [];
            $values = [];
            $valoresParaInserir = 4;
            
            for($i = 0; $i < $servicesIdLength; $i++) {

                $value1 = $i * $valoresParaInserir + 1;
                $value2 = $i * $valoresParaInserir + 2;
                $value3 = $i * $valoresParaInserir + 3;
                $value4 = $i * $valoresParaInserir + 4;
                
                $string = "(:cpf$value1, :id$value2, :solicitation$value3, :realization$value4)";

                array_push($stringValues, $string);
                
                $values['cpf' . ($i * $valoresParaInserir + 1)] = $cpf;  
                $values['id' . ($i * $valoresParaInserir + 2)] = $services_id[$i];
                $values['solicitation' . ($i * $valoresParaInserir + 3)] = $data_solicitacao_servico;  
                $values['realization' . ($i * $valoresParaInserir + 4)] = $data_realizacao_servico;
            }

            $finalString = implode(",", $stringValues);

            $stringSql = "INSERT INTO CLIENTE_SOLICITA_SERVICO (
                cpf_cliente,
                id_servico,
                data_solicitacao_servico,
                data_realizacao_servico) VALUES $finalString";
            
            $sql = $conexao->prepare($stringSql);

            $sql->execute($values);

            return $sql->rowCount();

        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    /* 
    Deleta um agendamento do cliente
    */

    public static function deleteScheduling($schedulingId) {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "UPDATE CLIENTE_SOLICITA_SERVICO SET
                    active = FALSE
                WHERE id = :id"
            );

            $sql->bindParam(':id', $schedulingId, PDO::PARAM_INT);

            $sql->execute();

            return $sql->rowCount();

        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

}