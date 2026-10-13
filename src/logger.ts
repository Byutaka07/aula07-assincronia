import fs from "fs/promises";

export async function log(
  mensagem: string
): Promise<void> {

    const timestamp = new Date().toISOString();

    const linha = `${timestamp} - ${mensagem}\n`;

    await fs.appendFile("app.log", linha);

}

export async function lerLogs(): Promise<string[]> {

    const conteudo = await fs.readFile(
        "app.log",
        "utf-8"
    );

    const linhas = conteudo.split("\n");

    return linhas;
}