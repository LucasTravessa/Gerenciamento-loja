export function Description() {
  return (
    <div className="my-8 flex  w-4/6 flex-col items-center justify-center gap-4 md:my-0">
      <h1 className="text-4xl font-bold">Gerencimento Loja</h1>
      <div className="w-full md:w-4/5">
        <p className="text-justify text-lg">
          O projeto simula um dashboard de admin de um e-commerce, onde temos o
          controle de funcionarios, fornecedores, estoque, vendas e reposição do
          estoque e com um grafico onde mostra o lucro da loja ao longo dos
          meses
        </p>
      </div>
      <div className=" mt-4 flex w-full flex-col items-center justify-center gap-4">
        <h2 className="text-4xl font-bold">Desenvolvedores</h2>
        <div className="mt-3 flex w-full flex-col items-center gap-3 md:flex-row md:items-baseline md:gap-0">
          <div className="flex w-full flex-col items-center gap-4 md:w-1/2 md:gap-2">
            <h2 className="text-2xl">Pedro Henrique</h2>
            <p className="text-justify md:w-[90%]">
              Sou desenvolvedor de software e estou em busca da minha primeira
              oportunidade de emprego na area da tecnologia, meus planos para o
              futuro da minha carreira é encontrar uma empresa que me de a
              oportunidade de aprender e refinar meus conhecimentos e com isso
              ir subindo de cargo progressivamente, não tenho foco salarial no
              momento, pois acredito que com esforço e aprendizagem serei
              recompensado futuramente.
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:w-1/2 md:gap-2">
            <h2 className="text-2xl">Lucas Travessa</h2>
            <p className="text-justify md:w-[90%]">
              Sou um desenvolvedor web com experiência em React e React Native.
              Atualmente, sou bolsista em uma startup chamada Recicle Siri, que
              tem como objetivo promover a reciclagem de resíduos de forma
              sustentável e lucrativa. Nesse projeto, trabalho com o
              desenvolvimento sites e de aplicativos mobile usando React e React
              Native, integrando-os com APIs RESTful. Além disso, tenho
              conhecimentos em Next.js Vue.js, Nodejs, Express e Golang. Sou
              apaixonado por aprender novas tecnologias e resolver problemas
              complexos com soluções criativas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
