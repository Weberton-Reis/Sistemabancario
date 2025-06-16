import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Edit, Trash2, Eye, CreditCard, Phone, Mail, MapPin } from "lucide-react";

const ContaCard = ({ conta, onEditar, onExcluir, onVisualizar }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inativa':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'bloqueada':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getTipoContaColor = (tipo) => {
    switch (tipo) {
      case 'corrente':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'poupanca':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'salario':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={conta.fotoCliente} alt={conta.nomeCliente} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {conta.nomeCliente.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{conta.nomeCliente}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                Conta: {conta.numeroConta}
              </CardDescription>
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
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{conta.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{conta.telefone}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{conta.endereco}</span>
            </div>
            <div className="text-muted-foreground">
              CPF: {formatarCPF(conta.cpf)}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Saldo atual</p>
              <p className="text-2xl font-bold text-primary">
                {formatarSaldo(conta.saldo)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVisualizar(conta)}
                className="hover:bg-blue-50"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditar(conta)}
                className="hover:bg-yellow-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExcluir(conta)}
                className="hover:bg-red-50 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContaCard;

