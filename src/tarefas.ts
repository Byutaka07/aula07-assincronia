import fs from "fs/promises";

interface Tarefa {
    id: number;
    titulo: string;
    concluida: boolean;
}

export async function lerTarefas(caminho: string): Promise<Tarefa[]> {
  try {

    const dados = await fs.readFile(caminho, "utf-8");

    return JSON.parse(dados);

  } catch {

    return [];

  }
}

async function salvarTarefas(
    caminho: string,
    tarefas: Tarefa[]

): Promise<void> {
    await fs.writeFile(
        caminho,
        JSON.stringify(tarefas, null, 2),
        "utf-8"
    );
}

export async function concluir(
    caminho: string,
    id: number
): Promise<void> {

    const tarefas = await lerTarefas(caminho);

    for (const tarefa of tarefas) {

        if (tarefa.id === id) {

            tarefa.concluida = true;

        }
    }

    await salvarTarefas(caminho, tarefas);

}


export async function remover(
    caminho: string,
    id: number
): Promise<void> {

    const tarefas = await lerTarefas(caminho);

    const tarefasAtualizadas = tarefas.filter(
        tarefa => tarefa.id !== id
    );

    await salvarTarefas(
        caminho,
        tarefasAtualizadas
    );

}