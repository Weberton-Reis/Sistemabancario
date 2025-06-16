import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContas } from '../hooks/useContas';
import { contasAPI } from '../lib/api';
import ContaForm from '../components/ContaForm';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

const EditarConta = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { atualizarConta, loading: loadingUpdate } = useContas();
  
  const [conta, setConta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregarConta = async () => {
      try {
        setLoading(true);
        const response = await contasAPI.buscarPorId(id);
        setConta(response.data.data);
      } catch (error) {
        console.error('Erro ao carregar conta:', error);
        setErro('Conta não encontrada');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarConta();
    }
  }, [id]);

  const handleSalvar = async (dadosConta) => {
    try {
      setErro('');
      await atualizarConta(id, dadosConta);
      setSucesso(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
      
      if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao atualizar conta. Tente novamente.');
      }
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando dados da conta...</p>
          </div>
        </div>
      </div>
    );
  }

  if (erro && !conta) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-red-700">Erro</h2>
                <p className="text-muted-foreground">{erro}</p>
              </div>
              <Button onClick={() => navigate('/')}>
                Voltar para lista
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sucesso) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-green-700">Conta Atualizada!</h2>
                <p className="text-muted-foreground">
                  As alterações foram salvas com sucesso. Redirecionando...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Conta</h1>
          <p className="text-muted-foreground">
            Atualize as informações da conta de {conta?.nomeCliente}
          </p>
        </div>
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      {/* Formulário */}
      {conta && (
        <ContaForm
          conta={conta}
          onSalvar={handleSalvar}
          onCancelar={handleCancelar}
          loading={loadingUpdate}
        />
      )}
    </div>
  );
};

export default EditarConta;

