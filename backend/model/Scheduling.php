<?php

require_once(__DIR__ . "/../configs/Database.php");
// Caso seja necessário acessar alguma função global auxiliar.
require_once(__DIR__ . "/../configs/utils.php");

class Scheduling {

    public static function checkIfExists($ids) {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "SELECT
                    EXISTS(
                    SELECT
                        id
                    FROM CLIENTE_SOLICITA_SERVICO
                    WHERE id IN(:id)
                    ) AS scheduling_exists");

            $values["id"] = $ids;

            $sql->execute($values);
            
            return $sql->fetch();

        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }
    
    /*
    Obtém os dados que serão carregados no site para os visitantes (usuários não logados)
    */
    public static function getSchedulings() {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "SELECT clientes.nome, servicos.tipo,  cliente_solicita_servico.data_realizacao_servico
                    FROM clientes 
                    INNER JOIN cliente_solicita_servico 
                    ON clientes.cpf = cliente_solicita_servico.cpf_cliente 
                    INNER JOIN servicos
                    ON cliente_solicita_servico.id_servico = servicos.id ");

            $sql->execute();

            return $sql->fetchAll();
            
        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    public static function getSchedulingsFromClient($cpf) {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "SELECT clientes.nome, servicos.tipo,  cliente_solicita_servico.data_realizacao_servico
                    FROM clientes 
                    INNER JOIN cliente_solicita_servico 
                    ON clientes.cpf = cliente_solicita_servico.cpf_cliente 
                    INNER JOIN servicos
                    ON cliente_solicita_servico.id_servico = servicos.id
                WHERE cliente_solicita_servico.cpf_cliente = :cpf");

            $values['cpf'] = $cpf; 

            $sql->execute($values);

            return $sql->fetchAll();
            
        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    /*
    Retorna as informações dos dias e dos serviços que serão ofertados pelo prestador de serviços
    */ 
    public static function getServicesSchedule() {
        try {
            $conexao = Conexao::getConexao();

            $sql = $conexao->prepare(
                "SELECT
                    s.id,
                    s.codigo,
                    s.tipo, 
                    s.preco,
                    s.active,
                    pos.data_oferta_servico,
                    pos.quantidade
                    FROM SERVICOS s
                    INNER JOIN PRESTADOR_OFERTA_SERVICO pos
                    ON pos.id_servico = s.id");

            $sql->execute();
            
            return $sql->fetchAll();

        } catch (Exception $e) {
            output(500, ["msg" => $e->getMessage()]);
        }
    }

    
}