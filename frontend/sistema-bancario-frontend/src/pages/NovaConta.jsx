import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContas } from '../hooks/useContas';
import ContaForm from '../components/ContaForm';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

const NovaConta = () => {
  const navigate = useNavigate();
  const { criarConta, loading } = useContas();
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  const handleSalvar = async (dadosConta) => {
    try {
      setErro('');
      await criarConta(dadosConta);
      setSucesso(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      
      if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao criar conta. Tente novamente.');
      }
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  if (sucesso) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h2 className="text-2xl font-bold text-green-700">Conta Criada!</h2>
                <p className="text-muted-foreground">
                  A conta foi criada com sucesso. Redirecionando...
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
          <h1 className="text-3xl font-bold">Nova Conta</h1>
          <p className="text-muted-foreground">
            Preencha os dados para criar uma nova conta bancária
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
      <ContaForm
        onSalvar={handleSalvar}
        onCancelar={handleCancelar}
        loading={loading}
      />
    </div>
  );
};

export default NovaConta;

