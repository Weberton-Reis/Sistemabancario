import { useState } from 'react';
import { useContas } from '../hooks/useContas';
import ContaCard from '../components/ContaCard';
import ContaDetalhes from '../components/ContaDetalhes';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { Plus, Search, Filter, Users, DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ListaContas = () => {
  const navigate = useNavigate();
  const { contas, loading, error, excluirConta } = useContas();
  
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [contaSelecionada, setContaSelecionada] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [contaParaExcluir, setContaParaExcluir] = useState(null);

  // Filtrar contas
  const contasFiltradas = contas.filter(conta => {
    const nomeMatch = conta.nomeCliente.toLowerCase().includes(filtroNome.toLowerCase()) ||
                     conta.numeroConta.includes(filtroNome) ||
                     conta.email.toLowerCase().includes(filtroNome.toLowerCase());
    
    const statusMatch = filtroStatus === 'todos' || conta.status === filtroStatus;
    const tipoMatch = filtroTipo === 'todos' || conta.tipoConta === filtroTipo;
    
    return nomeMatch && statusMatch && tipoMatch;
  });

  // Estatísticas
  const totalContas = contas.length;
  const contasAtivas = contas.filter(c => c.status === 'ativa').length;
  const saldoTotal = contas.reduce((total, conta) => total + conta.saldo, 0);
  const saldoMedio = totalContas > 0 ? saldoTotal / totalContas : 0;

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handleVisualizar = (conta) => {
    setContaSelecionada(conta);
    setMostrarDetalhes(true);
  };

  const handleEditar = (conta) => {
    navigate(`/editar/${conta._id}`);
  };

  const handleExcluir = (conta) => {
    setContaParaExcluir(conta);
  };

  const confirmarExclusao = async () => {
    if (contaParaExcluir) {
      try {
        await excluirConta(contaParaExcluir._id);
        setContaParaExcluir(null);
      } catch (error) {
        console.error('Erro ao excluir conta:', error);
      }
    }
  };

  if (loading && contas.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando contas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contas Bancárias</h1>
          <p className="text-muted-foreground">
            Gerencie todas as contas do sistema bancário
          </p>
        </div>
        <Button onClick={() => navigate('/nova')} className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Conta
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContas}</div>
            <p className="text-xs text-muted-foreground">
              {contasAtivas} ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarMoeda(saldoTotal)}</div>
            <p className="text-xs text-muted-foreground">
              Todas as contas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatarMoeda(saldoMedio)}</div>
            <p className="text-xs text-muted-foreground">
              Por conta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contasAtivas}</div>
            <p className="text-xs text-muted-foreground">
              {totalContas > 0 ? Math.round((contasAtivas / totalContas) * 100) : 0}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar contas específicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nome, conta ou email..."
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="inativa">Inativa</SelectItem>
                  <SelectItem value="bloqueada">Bloqueada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Conta</label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="corrente">Conta Corrente</SelectItem>
                  <SelectItem value="poupanca">Poupança</SelectItem>
                  <SelectItem value="salario">Conta Salário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Resultados</h2>
            <Badge variant="secondary">
              {contasFiltradas.length} conta{contasFiltradas.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {contasFiltradas.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma conta encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  {contas.length === 0 
                    ? 'Não há contas cadastradas no sistema.'
                    : 'Tente ajustar os filtros para encontrar as contas desejadas.'
                  }
                </p>
                {contas.length === 0 && (
                  <Button onClick={() => navigate('/nova')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar primeira conta
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {contasFiltradas.map((conta) => (
              <ContaCard
                key={conta._id}
                conta={conta}
                onVisualizar={handleVisualizar}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalhes */}
      <ContaDetalhes
        conta={contaSelecionada}
        isOpen={mostrarDetalhes}
        onClose={() => {
          setMostrarDetalhes(false);
          setContaSelecionada(null);
        }}
      />

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={!!contaParaExcluir} onOpenChange={() => setContaParaExcluir(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a conta de <strong>{contaParaExcluir?.nomeCliente}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarExclusao}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListaContas;

