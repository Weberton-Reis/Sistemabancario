import { useState, useEffect, useCallback } from 'react';
import { contasAPI } from '../lib/api';

export const useContas = () => {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregarContas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contasAPI.listar();
      setContas(response.data.data || []);
    } catch (err) {
      setError('Erro ao carregar contas. Verifique se o backend está rodando.');
      console.error(err);
      setContas([]); // Garante que não haja dados antigos em caso de erro
    } finally {
      setLoading(false);
    }
  }, []);

  const criarConta = async (dadosConta) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contasAPI.criar(dadosConta);
      await carregarContas(); // Recarrega a lista
      return response.data;
    } catch (err) {
      setError('Erro ao criar conta');
      console.error(err);
      throw err; // Re-lança o erro para a página tratar
    } finally {
      setLoading(false);
    }
  };

  const atualizarConta = async (id, dadosConta) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contasAPI.atualizar(id, dadosConta);
      await carregarContas(); // Recarrega a lista
      return response.data;
    } catch (err) {
      setError('Erro ao atualizar conta');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const excluirConta = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await contasAPI.excluir(id);
      await carregarContas(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao excluir conta');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarContas();
  }, [carregarContas]);

  return {
    contas,
    loading,
    error,
    carregarContas,
    criarConta,
    atualizarConta,
    excluirConta
  };
};