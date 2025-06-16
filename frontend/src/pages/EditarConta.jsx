import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContas } from '../hooks/useContas';
import { contasAPI } from '../lib/api';
import ContaForm from '../components/ContaForm';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Loader2, AlertCircle, ServerCrash } from 'lucide-react';

const EditarConta = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { atualizarConta, loading: isUpdating } = useContas();
  
  const [conta, setConta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarConta = async () => {
      try {
        setErro('');
        setIsLoading(true);
        const response = await contasAPI.buscarPorId(id);
        setConta(response.data.data);
      } catch (error) {
        setErro('Conta não encontrada ou erro ao carregar.');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) carregarConta();
  }, [id]);

  const handleSalvar = async (dadosConta) => {
    try {
      setErro('');
      await atualizarConta(id, dadosConta);
      navigate('/');
    } catch (error) {
      setErro(error.response?.data?.message || 'Ocorreu um erro ao atualizar a conta.');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-10 w-10 animate-spin" /></div>;
  }
  
  if (erro && !conta) {
    return <div className="container mx-auto p-8 text-center"><Alert variant="destructive"><ServerCrash className="h-4 w-4"/><AlertTitle>Erro</AlertTitle><AlertDescription>{erro}</AlertDescription></Alert><Button onClick={() => navigate('/')} className="mt-4">Voltar</Button></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/')}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Conta</h1>
          <p className="text-muted-foreground">Atualize os dados da conta de {conta?.nomeCliente}.</p>
        </div>
      </div>
       {erro && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro na Atualização</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}
      <ContaForm conta={conta} onSalvar={handleSalvar} onCancelar={() => navigate('/')} loading={isUpdating} />
    </div>
  );
};

export default EditarConta;