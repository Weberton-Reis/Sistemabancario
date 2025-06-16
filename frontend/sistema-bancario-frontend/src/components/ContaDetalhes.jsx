import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { CreditCard, Phone, Mail, MapPin, Calendar, DollarSign, User, FileText } from "lucide-react";

const ContaDetalhes = ({ conta, isOpen, onClose }) => {
  if (!conta) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-100 text-green-800';
      case 'inativa':
        return 'bg-gray-100 text-gray-800';
      case 'bloqueada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoContaColor = (tipo) => {
    switch (tipo) {
      case 'corrente':
        return 'bg-blue-100 text-blue-800';
      case 'poupanca':
        return 'bg-purple-100 text-purple-800';
      case 'salario':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatarSaldo = (saldo) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(saldo);
  };

  const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalhes da Conta</DialogTitle>
          <DialogDescription>
            Informações completas da conta bancária
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cabeçalho com foto e informações principais */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={conta.fotoCliente} alt={conta.nomeCliente} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {conta.nomeCliente.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold">{conta.nomeCliente}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      <span>Conta: {conta.numeroConta}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(conta.status)}>
                      {conta.status.charAt(0).toUpperCase() + conta.status.slice(1)}
                    </Badge>
                    <Badge className={getTipoContaColor(conta.tipoConta)}>
                      {conta.tipoConta.charAt(0).toUpperCase() + conta.tipoConta.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Saldo atual</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatarSaldo(conta.saldo)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações pessoais */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{conta.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{conta.telefone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="font-medium">{conta.endereco}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">CPF</p>
                      <p className="font-medium">{formatarCPF(conta.cpf)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Assinatura Digital</p>
                  <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center h-32">
                    <img 
                      src={conta.assinaturaDigital} 
                      alt="Assinatura Digital" 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-muted-foreground">
                      Assinatura não disponível
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Documento de Identidade</p>
                  <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center h-32">
                    <img 
                      src={conta.documentoIdentidade} 
                      alt="Documento de Identidade" 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-muted-foreground">
                      Documento não disponível
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do sistema */}
          <Card>
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Informações do Sistema
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data de Criação</p>
                  <p className="font-medium">{formatarData(conta.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Última Atualização</p>
                  <p className="font-medium">{formatarData(conta.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContaDetalhes;

