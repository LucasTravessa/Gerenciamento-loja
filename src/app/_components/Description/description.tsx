export function Description() {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-4xl font-bold">Gerencimento Loja</h1>
      <div className="w-[80%]">
        <p className="text-lg">
          O projeto simula um dashboard de admin de um e-commerce, onde temos o
          controle de funcionarios, fornecedores, estoque, vendas e reposição do
          estoque e com um grafico onde mostra o lucro da loja ao longo dos
          meses
        </p>
      </div>
      <div className=" flex w-full flex-col items-center justify-center gap-4">
        <h2 className="text-4xl font-bold">Desenvolvedores</h2>
        <div className="flex w-full justify-around">
          <div>
            <h2 className="text-2xl">Pedro Henrique</h2>
            <p>Descrição</p>
          </div>
          <div>
            <h2 className="text-2xl">Lucas Travessa</h2>
            <p>Descrição</p>
          </div>
        </div>
      </div>
    </div>
  );
}
