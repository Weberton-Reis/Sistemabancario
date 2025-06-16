import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContas } from '../hooks/useContas';
import ContaForm from '../components/ContaForm';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";import { ArrowLeft, AlertCircle } from 'lucide-react';

const NovaConta = () => {
  const navigate = useNavigate();
  const { criarConta, loading } = useContas();
  const [erro, setErro] = useState('');

  const handleSalvar = async (dadosConta) => {
    try {
      setErro('');
      await criarConta(dadosConta);
      // O hook já recarrega a lista, podemos navegar direto ou mostrar sucesso
      navigate('/'); 
    } catch (error) {
      setErro(error.response?.data?.message || 'Ocorreu um erro ao criar a conta.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/')}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-3xl font-bold">Nova Conta</h1>
          <p className="text-muted-foreground">Crie uma nova conta bancária no sistema.</p>
        </div>
      </div>
      {erro && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}
      <ContaForm onSalvar={handleSalvar} onCancelar={() => navigate('/')} loading={loading} />
    </div>
  );
};

export default NovaConta;