import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ListaDeTarefas() {
  // estado pra guardar a lista de tarefas
  const [tarefas, setTarefas] = useState([]);

  // hook que roda quando o componente carrega
  useEffect(() => {
    async function buscarTarefas() {
      // pega todas as tarefas do Supabase e ordena pela data de criação
      const { data, error } = await supabase
        .from('tarefas')
        .select('*')
        .order('criada_em', { ascending: true });

      // se não deu erro, atualiza o estado com as tarefas
      if (!error) {
        setTarefas(data);
      }
    }

    // chama a função de buscar tarefas
    buscarTarefas();
  }, []); // [] significa que roda só uma vez quando o componente carrega

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tarefas.map((tarefa) => (
          // mostra cada tarefa na lista
          <li key={tarefa.id}>
            {tarefa.titulo} {tarefa.concluidas ? '(Concluída)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}