import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Save, X, Upload } from "lucide-react";

const ContaForm = ({ conta = null, onSalvar, onCancelar, loading = false }) => {
  const [formData, setFormData] = useState({
    nomeCliente: conta?.nomeCliente || '',
    cpf: conta?.cpf || '',
    email: conta?.email || '',
    telefone: conta?.telefone || '',
    endereco: conta?.endereco || '',
    tipoConta: conta?.tipoConta || 'corrente',
    saldo: conta?.saldo || 0,
    status: conta?.status || 'ativa',
    fotoCliente: conta?.fotoCliente || 'https://via.placeholder.com/150x150?text=Foto+Cliente',
    assinaturaDigital: conta?.assinaturaDigital || 'https://via.placeholder.com/300x100?text=Assinatura+Digital',
    documentoIdentidade: conta?.documentoIdentidade || 'https://via.placeholder.com/400x250?text=Documento+Identidade'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomeCliente.trim()) {
      newErrors.nomeCliente = 'Nome é obrigatório';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF deve ter formato válido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email deve ter formato válido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }

    if (formData.saldo < 0) {
      newErrors.saldo = 'Saldo não pode ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Formatar CPF removendo pontos e traços
      const dadosFormatados = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
        saldo: Number(formData.saldo)
      };
      
      onSalvar(dadosFormatados);
    }
  };

  const formatarCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatarTelefone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {conta ? 'Editar Conta' : 'Nova Conta'}
        </CardTitle>
        <CardDescription>
          {conta ? 'Atualize as informações da conta bancária' : 'Preencha os dados para criar uma nova conta bancária'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Informações Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeCliente">Nome Completo *</Label>
                <Input
                  id="nomeCliente"
                  value={formData.nomeCliente}
                  onChange={(e) => handleChange('nomeCliente', e.target.value)}
                  placeholder="Digite o nome completo"
                  className={errors.nomeCliente ? 'border-red-500' : ''}
                />
                {errors.nomeCliente && (
                  <p className="text-sm text-red-500">{errors.nomeCliente}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleChange('cpf', formatarCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={errors.cpf ? 'border-red-500' : ''}
                />
                {errors.cpf && (
                  <p className="text-sm text-red-500">{errors.cpf}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@exemplo.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleChange('telefone', formatarTelefone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className={errors.telefone ? 'border-red-500' : ''}
                />
                {errors.telefone && (
                  <p className="text-sm text-red-500">{errors.telefone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço Completo *</Label>
              <Textarea
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleChange('endereco', e.target.value)}
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                className={errors.endereco ? 'border-red-500' : ''}
                rows={3}
              />
              {errors.endereco && (
                <p className="text-sm text-red-500">{errors.endereco}</p>
              )}
            </div>
          </div>

          {/* Informações da Conta */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Informações da Conta</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoConta">Tipo de Conta</Label>
                <Select value={formData.tipoConta} onValueChange={(value) => handleChange('tipoConta', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Poupança</SelectItem>
                    <SelectItem value="salario">Conta Salário</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="saldo">Saldo Inicial</Label>
                <Input
                  id="saldo"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.saldo}
                  onChange={(e) => handleChange('saldo', e.target.value)}
                  placeholder="0.00"
                  className={errors.saldo ? 'border-red-500' : ''}
                />
                {errors.saldo && (
                  <p className="text-sm text-red-500">{errors.saldo}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status da Conta</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativa">Ativa</SelectItem>
                    <SelectItem value="inativa">Inativa</SelectItem>
                    <SelectItem value="bloqueada">Bloqueada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Documentos e Imagens */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Documentos e Imagens</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fotoCliente">Foto do Cliente</Label>
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formData.fotoCliente} alt="Foto do cliente" />
                    <AvatarFallback>
                      <Upload className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    id="fotoCliente"
                    value={formData.fotoCliente}
                    onChange={(e) => handleChange('fotoCliente', e.target.value)}
                    placeholder="URL da foto"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assinaturaDigital">Assinatura Digital</Label>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-full h-20 border rounded-md flex items-center justify-center bg-gray-50">
                    <img 
                      src={formData.assinaturaDigital} 
                      alt="Assinatura" 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center text-gray-400">
                      <Upload className="h-8 w-8" />
                    </div>
                  </div>
                  <Input
                    id="assinaturaDigital"
                    value={formData.assinaturaDigital}
                    onChange={(e) => handleChange('assinaturaDigital', e.target.value)}
                    placeholder="URL da assinatura"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentoIdentidade">Documento de Identidade</Label>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-full h-20 border rounded-md flex items-center justify-center bg-gray-50">
                    <img 
                      src={formData.documentoIdentidade} 
                      alt="Documento" 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center text-gray-400">
                      <Upload className="h-8 w-8" />
                    </div>
                  </div>
                  <Input
                    id="documentoIdentidade"
                    value={formData.documentoIdentidade}
                    onChange={(e) => handleChange('documentoIdentidade', e.target.value)}
                    placeholder="URL do documento"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 md:flex-none"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar Conta'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancelar}
              disabled={loading}
              className="flex-1 md:flex-none"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContaForm;

