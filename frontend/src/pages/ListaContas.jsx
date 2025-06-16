import { useState } from 'react';
import { useContas } from '../hooks/useContas';
import ContaCard from '../components/ContaCard';
import ContaDetalhes from '../components/ContaDetalhes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";import { Plus, Search, Filter, Loader2, ServerCrash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ListaContas = () => {
  const navigate = useNavigate();
  const { contas, loading, error, excluirConta } = useContas();
  
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [contaSelecionada, setContaSelecionada] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [contaParaExcluir, setContaParaExcluir] = useState(null);

  const contasFiltradas = contas.filter(conta => {
    const nomeMatch = conta.nomeCliente.toLowerCase().includes(filtroNome.toLowerCase()) || conta.numeroConta.includes(filtroNome);
    const statusMatch = filtroStatus === 'todos' || conta.status === filtroStatus;
    return nomeMatch && statusMatch;
  });

  const handleVisualizar = (conta) => { setContaSelecionada(conta); setMostrarDetalhes(true); };
  const handleEditar = (conta) => navigate(`/editar/${conta._id}`);
  const handleExcluir = (conta) => setContaParaExcluir(conta);

  const confirmarExclusao = async () => {
    if (contaParaExcluir) {
      await excluirConta(contaParaExcluir._id);
      setContaParaExcluir(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contas Bancárias</h1>
          <p className="text-muted-foreground">Gerencie todas as contas do sistema.</p>
        </div>
        <Button onClick={() => navigate('/nova')} className="w-full md:w-auto"><Plus className="h-4 w-4 mr-2" />Nova Conta</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" />Filtros</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Buscar por nome ou número da conta..." value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} className="pl-10" /></div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger><SelectValue placeholder="Todos os status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="ativa">Ativa</SelectItem>
              <SelectItem value="inativa">Inativa</SelectItem>
              <SelectItem value="bloqueada">Bloqueada</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div>
        {loading && <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin" /><p className="ml-2">Carregando contas...</p></div>}
        {error && <div className="flex flex-col items-center text-red-600 bg-red-50 p-4 rounded-lg"><ServerCrash className="h-8 w-8 mb-2" />{error}</div>}
        {!loading && !error && (
          contasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {contasFiltradas.map((conta) => (<ContaCard key={conta._id} conta={conta} onVisualizar={handleVisualizar} onEditar={handleEditar} onExcluir={handleExcluir} />))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">Nenhuma conta encontrada.</div>
          )
        )}
      </div>

      <ContaDetalhes conta={contaSelecionada} isOpen={mostrarDetalhes} onClose={() => setMostrarDetalhes(false)} />
      
      <AlertDialog open={!!contaParaExcluir} onOpenChange={() => setContaParaExcluir(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a conta de <strong>{contaParaExcluir?.nomeCliente}</strong>? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarExclusao} className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListaContas;