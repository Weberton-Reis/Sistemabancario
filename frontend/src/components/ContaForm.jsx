import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";import { Save, X, Loader2 } from "lucide-react";

const ContaForm = ({ conta = null, onSalvar, onCancelar, loading = false }) => {
  const [formData, setFormData] = useState({
    nomeCliente: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    tipoConta: 'corrente',
    saldo: 0,
    status: 'ativa',
    fotoCliente: '',
    assinaturaDigital: '',
    documentoIdentidade: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (conta) {
      setFormData({
        nomeCliente: conta.nomeCliente || '',
        cpf: conta.cpf || '',
        email: conta.email || '',
        telefone: conta.telefone || '',
        endereco: conta.endereco || '',
        tipoConta: conta.tipoConta || 'corrente',
        saldo: conta.saldo || 0,
        status: conta.status || 'ativa',
        fotoCliente: conta.fotoCliente || '',
        assinaturaDigital: conta.assinaturaDigital || '',
        documentoIdentidade: conta.documentoIdentidade || ''
      });
    }
  }, [conta]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nomeCliente.trim()) newErrors.nomeCliente = "Nome do cliente é obrigatório.";
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório.";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Formato de email inválido.";
    if (formData.saldo < 0) newErrors.saldo = "Saldo não pode ser negativo.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dadosFormatados = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
        saldo: Number(formData.saldo),
      };
      onSalvar(dadosFormatados);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{conta ? 'Editar Conta' : 'Nova Conta'}</CardTitle>
        <CardDescription>{conta ? `Atualize os dados de ${conta.nomeCliente}` : 'Preencha os dados para criar uma nova conta.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label htmlFor="nomeCliente">Nome Completo *</Label><Input id="nomeCliente" value={formData.nomeCliente} onChange={e => handleChange('nomeCliente', e.target.value)} className={errors.nomeCliente && 'border-red-500'} /><p className="text-sm text-red-500">{errors.nomeCliente}</p></div>
            <div className="space-y-2"><Label htmlFor="cpf">CPF *</Label><Input id="cpf" value={formData.cpf} onChange={e => handleChange('cpf', e.target.value)} placeholder="000.000.000-00" className={errors.cpf && 'border-red-500'} /><p className="text-sm text-red-500">{errors.cpf}</p></div>
            <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="email@exemplo.com" className={errors.email && 'border-red-500'} /><p className="text-sm text-red-500">{errors.email}</p></div>
            <div className="space-y-2"><Label htmlFor="telefone">Telefone</Label><Input id="telefone" value={formData.telefone} onChange={e => handleChange('telefone', e.target.value)} placeholder="(00) 00000-0000" /></div>
            <div className="space-y-2 md:col-span-2"><Label htmlFor="endereco">Endereço</Label><Textarea id="endereco" value={formData.endereco} onChange={e => handleChange('endereco', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
            <div className="space-y-2"><Label htmlFor="tipoConta">Tipo de Conta</Label><Select value={formData.tipoConta} onValueChange={value => handleChange('tipoConta', value)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="corrente">Corrente</SelectItem><SelectItem value="poupanca">Poupança</SelectItem><SelectItem value="salario">Salário</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="saldo">Saldo (R$)</Label><Input id="saldo" type="number" step="0.01" value={formData.saldo} onChange={e => handleChange('saldo', e.target.value)} className={errors.saldo && 'border-red-500'} /><p className="text-sm text-red-500">{errors.saldo}</p></div>
            <div className="space-y-2"><Label htmlFor="status">Status</Label><Select value={formData.status} onValueChange={value => handleChange('status', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ativa">Ativa</SelectItem><SelectItem value="inativa">Inativa</SelectItem><SelectItem value="bloqueada">Bloqueada</SelectItem></SelectContent></Select></div>
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancelar} disabled={loading}><X className="h-4 w-4 mr-2" />Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Salvando...</> : <><Save className="h-4 w-4 mr-2" />Salvar Conta</>}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContaForm;